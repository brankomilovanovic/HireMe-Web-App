import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Role } from "../../Constants/Role";
import { logout } from "../../Services/SecurityService";
import strings from "../../localization";
import { useState } from "react";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { getRoute } from "../../route";
import NotificationMenu from "../../Components/NotificationMenu";
import { getNotReadNotifications } from "../../Util/NotificationUtil";
import CustomModal from "../../Components/CustomModal";
import { deleteApplication, getApplicationsByUser } from "../../Services/ApplicationService";
import YesNoDialog, { YesNoDialogResult } from "../../Components/YesNoDialog";

const Header = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications)

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [notificationMenuAnchorEl, setNotificationMenuAnchorEl] = useState(null);

  const [showMyApplicationsModal, setShowMyApplicationsModal] = useState(false);
  const [myApplications, setMyApplications] = useState([]);
  const [selectedMyApplication, setSelectedMyApplication] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isActivePath = (paths) => {
    return paths.some((path) => getRoute(location?.pathname)?.path === path);
  }

  const handleLogout = async () => {
    logout(dispatch).then(() => {
      window.location = '/login'
    });
  };

  const closeAnchorMenuMenu = () => {
    setProfileMenuAnchorEl(null);
    setNotificationMenuAnchorEl(null);
    if(toggleMobileMenu) {
      setToggleMobileMenu(false)
    }
  }

  const handleClickMenuItem = (path) => {
    closeAnchorMenuMenu();
    navigate(path);
  }

  const handleSelectMyApplications = () => {
    fetchMyApplications();
    setShowMyApplicationsModal(true); 
    closeAnchorMenuMenu();
  }

  const fetchMyApplications = () => {
    getApplicationsByUser({id: authUser?.id, perPage: 50}).then((response) => {
      setMyApplications(response?.data?.items || []);
    });
  } 

  const handleDeleteDialogResult = (result) => {
    if (result === YesNoDialogResult.NO || result === YesNoDialogResult.CANCEL) {
      handleCloseDeleteMyApplicationDialog();
      return;
    }
    deleteApplication(selectedMyApplication?.id).then(() => {
      handleCloseDeleteMyApplicationDialog();
      fetchMyApplications();
    });
  }

  const handleCloseDeleteMyApplicationDialog = () => {
    setShowDeleteDialog(false);
    setSelectedMyApplication(null);
  }

  const handleDeleteMyApplication = (e, myApplication) => {
    e.stopPropagation();

    setSelectedMyApplication(myApplication);
    setShowDeleteDialog(true);
  }

  const handleSelectMyApplication = (e, myApplication) => {
    e.stopPropagation(); 
    
    setSelectedMyApplication(myApplication);
  }

  const renderMyApplications = () => {
    let result = [];

    for(let myApplication of myApplications) {
      result.push(<div key={'my-application-' + myApplication?.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="application" onClick={(e) => handleSelectMyApplication(e, myApplication)}>
        <div>
          <div className="title">{myApplication?.ad?.title}</div>
          <div>{myApplication?.ad?.address}</div>
        </div>
        <IconButton className="icon-button-grey" onClick={(e) => handleDeleteMyApplication(e, myApplication)}>
            <img src = '/images/close.svg' />
        </IconButton>
      </div>)
    }

    return <div className="applications-container">{result}</div>;
  }

  return (
    <div className="header">
        <div className="navbar">
            <NavLink to={"/"} className="nav-logo">
              <div className="nav-logo-container">
                <span>{strings.base.namePart1}</span>
                <span>{strings.base.namePart2}</span>
              </div>
            </NavLink>
            <div className={toggleMobileMenu ? 'nav-menu active' : 'nav-menu'} >
              { authUser?.id && <div className="nav-items-container">
                <div className="nav-item" onClick={() => setToggleMobileMenu(false)}>
                  { authUser?.role && 
                    <div>
                      { authUser.role === Role.MODERATOR && <NavLink to={"/board-moderator"} style={{paddingBottom: '10px'}} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{strings.pages.boardModerator.title}</NavLink> }
                      { authUser.role === Role.ADMIN && <NavLink to={"/board-admin"} style={{paddingBottom: '10px'}} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{strings.pages.boardAdmin.title}</NavLink> }
                    </div>
                  }
                </div>

                <div className="nav-item" onClick={() => setToggleMobileMenu(false)}>
                  { authUser?.id && <NavLink to={"/ad"} style={{paddingBottom: '10px'}} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{strings.pages.ad.placement}</NavLink> }
                </div>
              </div> }
              <div className="nav-items-container" style={{marginLeft: toggleMobileMenu ? 0 : 'auto'}}>
                <div className="nav-item">
                  { authUser?.id &&
                      <div className="nav-link">
                       {getNotReadNotifications(notifications)?.length > 0 && <div className="notification-dot" /> }
                        <IconButton onClick={(e) => setNotificationMenuAnchorEl(e.currentTarget)}>
                          <img src='/images/notification.svg'/>
                        </IconButton>

                        <NotificationMenu
                            notificationMenuAnchorEl={notificationMenuAnchorEl}
                            closeNotificationMenu={closeAnchorMenuMenu}
                        />
                      </div>
                    }
                  </div>
                <div className="nav-item">
                  { authUser?.id ? 
                    <div>
                      <div className={isActivePath(["/profile", "/my-ads"]) ? "nav-link active" : "nav-link"}>
                        <IconButton onClick={(e) => setProfileMenuAnchorEl(e.currentTarget)}>
                          <img src='/images/user.svg'/>
                        </IconButton>
                      </div>
                      <Menu anchorEl={profileMenuAnchorEl} open={Boolean(profileMenuAnchorEl)} onClose={closeAnchorMenuMenu}
                          PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                ml: 1,
                                mt: 1,
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    right: 23,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <div style={{padding: '7px 17px'}}>{authUser?.email}</div>
                        <MenuItem style={{backgroundColor: isActivePath(["/profile"]) && "#ebe9e9"}} onClick={() => handleClickMenuItem('/profile')}>{strings.base.profile.myAccount}</MenuItem>
                        <MenuItem style={{backgroundColor: isActivePath(["/my-ads"]) && "#ebe9e9"}} onClick={() => handleClickMenuItem('/my-ads')}>{strings.base.profile.myAds}</MenuItem>
                        <MenuItem onClick={handleSelectMyApplications}>{strings.base.profile.myApplications}</MenuItem>
                        <MenuItem onClick={handleLogout}>{strings.forms.common.logout}</MenuItem>
                      </Menu>
                    </div>
                    : 
                    <NavLink to={"/login"} style={{paddingBottom: '10px'}}  onClick={() => setToggleMobileMenu(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{strings.forms.common.login}</NavLink> 
                  }
                  </div>

                  <div className="nav-item" onClick={() => setToggleMobileMenu(false)}>
                    { !authUser?.id && <NavLink to={"/registration"} style={{paddingBottom: '10px'}}  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{strings.forms.common.register}</NavLink> }
                  </div>
                </div>
              </div>

              <div className='hamburger'>
                <IconButton onClick={() => setToggleMobileMenu(prevState => !prevState)}>
                  { !toggleMobileMenu ? 
                    <img src = '/images/menu.svg'/>
                    :
                    <img src = '/images/close.svg'/>
                  }
                </IconButton>
              </div>
        </div>

        <CustomModal showModal={showMyApplicationsModal} style={{width: '25rem'}} onClose={() => setShowMyApplicationsModal(false)} title={strings.base.profile.myApplications}>
           { myApplications?.length === 0 ? <div className="title">{strings.pages.home.noApplications}</div> : renderMyApplications() }
        </CustomModal>

        { selectedMyApplication && <CustomModal showModal={selectedMyApplication} style={{width: '25rem'}} onClose={() => setSelectedMyApplication(null)} title={selectedMyApplication?.ad?.title}>
           <div>
              <div style={{border: '1px solid #104c88', borderRadius: '20px', padding: '10px', marginBottom: '20px'}}>
                <span>{strings.forms.application.aboutYourself}</span>
                <Divider />
                <div style={{whiteSpace: 'pre-line'}}>{selectedMyApplication?.aboutYourself}</div>

              </div>
              <div style={{border: '1px solid #104c88', borderRadius: '20px', padding: '10px'}}>
                <span>{strings.forms.application.motivationalLetter}</span>
                <Divider />
                <div style={{whiteSpace: 'pre-line'}}>{selectedMyApplication?.motivationalLetter}</div>
              </div>
           </div>
        </CustomModal> }

        <YesNoDialog show={showDeleteDialog} handleResult={handleDeleteDialogResult}/>

    </div>
  );
};

export default Header;
