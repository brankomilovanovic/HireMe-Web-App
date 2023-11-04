import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoaderContext from "../../Context/LoaderContext";
import { Avatar, Button, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { getAd, getAdsByUser, getMyAds, getMyAdsCount, updateAdStatus } from "../../Services/AdService";
import { AdStatus, getAdStatusName } from "../../Constants/AdStatus";
import strings from "../../localization";
import { changeApplicationStatus, getApplicationsByAd } from "../../Services/ApplicationService";
import CustomModal from "../../Components/CustomModal";

const MyAds = () => {

  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const authUser = useSelector((state) => state.auth.user);
  const {setLoading} = useContext(LoaderContext)

  const [myAdsStatusCategory, setMyAdsStatusCategory] = useState(AdStatus.ACTIVE)
  const [ads, setAds] = useState([]);

  const [selectedAd, setSelectedAd] = useState(null);
  const [showAdsApplicationsModal, setShowAdsApplicationsModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const [adsCount, setAdsCount] = useState({
    [AdStatus.ACTIVE] : 0,
    [AdStatus.INACTIVE] : 0
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchAds();
  }, [myAdsStatusCategory, authUser]);

  useEffect(() => {
    const adId = params.get('adId');
    const showApplications = params.get('showApplications');

    if(adId) {
      getAd({id: adId}).then((response) => {
        if(response.status === 200) {
          setSelectedAd(response?.data);
          if(showApplications) {
            fetchApplications(response?.data);
            setShowAdsApplicationsModal(true);
          }
        }
      });
    }
   
  }, [params]);

  useEffect(() => {
    fetchAdsCount();
  }, [authUser]);

  const fetchAds = () => {
    if(authUser?.id) {
      setLoading(true)
      getMyAds(myAdsStatusCategory).then((response) => {
        setAds(response?.data || 0);
      }).finally(() => setLoading(false));
    }
  };

  const fetchAdsCount = async () => {
    if(authUser?.id) {
      setLoading(true)
      let newAdsCount = {};
      for(let key of Object.keys(AdStatus)) {
        let adStatus = AdStatus[key];
        let response = await getMyAdsCount(adStatus)
        newAdsCount[adStatus] = response?.data || 0;
      }
      setAdsCount(newAdsCount);
      setLoading(false);
    }
  };

  const renderMyAdsCategoriesButtons = () => {
    let result = [];

    for(let key of Object.keys(AdStatus)) {
      const status = AdStatus[key];
      result.push(<div className="button-container" key={'category-ad-' + status}>
        <span>{adsCount[status]}</span>
        <Button variant="text" onClick={() => setMyAdsStatusCategory(status)} className={myAdsStatusCategory === status ? 'button active' : 'button'}>{getAdStatusName(status)}</Button>
      </div>)
    }

    return result;
  }

  const fetchApplications = (ad) => {
    let {id} = selectedAd || ad;
    setLoading(true);

    getApplicationsByAd({id, perPage: 100}).then((response) => {
      setApplications(response?.data?.items || []);
    }).finally(() => setLoading(false));
  } 
  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedAd(null);
    setApplications(null);
  }

  const handleAdsApplicationsList = () => {    
    fetchApplications();
    setShowAdsApplicationsModal(true);
  }


  const handleEmailClick = (event, email) => {
    event.stopPropagation();
    window.location.href = `mailto:${email}?subject=${encodeURIComponent()}`;
  };

  const handleOpenApplication = (app) => {
    setSelectedApplication(app);
    setShowApplicationModal(true);
  }


  const handleChangeApplicationStatus = (e, app, status) => {
    e.stopPropagation();

    setLoading(true);
    changeApplicationStatus({id: app.id, status}).then(() => {
      fetchApplications();
    }).finally(() => setLoading(false));
  }

  const renderApplications = () => {
    let result = [];

    for(let app of applications) {
      result.push( <div 
          style={{background: (app?.status === undefined || app?.status === null) ? "white" : app?.status ? 'lightgreen' : '#fe2121'}}
          className="application" 
          onClick={() => handleOpenApplication(app)}
          key={'application-' + app?.id} 
        >
        <div className="application-profile">
          <Avatar src={app?.user?.profileImage}/>
          <div>
            <div className="profile-fullname" onClick={(e) => { e.stopPropagation(); navigate(`/profile/${app?.user?.id}`); }}>{app?.user?.name} {app?.user?.surname}</div>
            <div className="link" style={{ color: 'blue', fontWeight: 500}} onClick={(e) => handleEmailClick(e, app?.user?.email)}>{app?.user?.email}</div>
          </div>
          {(app?.status === undefined || app?.status === null) && <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto'}}>
              <IconButton onClick={(e) => handleChangeApplicationStatus(e, app, true)}>
                <img src = '/images/check.svg' />
              </IconButton>

              <IconButton onClick={(e) => handleChangeApplicationStatus(e, app, false)}>
                  <img src = '/images/close.svg' />
              </IconButton>
          </div> }
        </div>
      </div>)
    }

    return <div className="applications-container">{result}</div>;
  }


  const handleChangeAdStatus = (id, status) => {
    setLoading(true);

    updateAdStatus(id, status).then((response) => {
      if(response.status === 200) {
        fetchAdsCount();
        fetchAds();
      }
      setAnchorEl(null);
    }).finally(() => setLoading(false));
  }

  const renderAds = () => {
    let result = [];

    for(let ad of ads) {
      result.push(<div key={'ad-' + ad?.id} className="my-ad-container">
        <div style={{display: 'flex', justifyContent: 'space-between', gap: '5px'}}>
          <div>
            <div className="title">{ad?.title}</div>
            <div>{ad?.city}, {ad?.address}</div>

          </div>
          <div style={{display: 'flex', alignItems: 'center', height: '25px'}}>
            <div className="ad-status-chip" style={{backgroundColor: myAdsStatusCategory === AdStatus.ACTIVE ? '#a08a4d' : '#e60000'}}>{getAdStatusName(ad?.adStatus)}</div>
            <IconButton onClick={(e) => { setAnchorEl(e.currentTarget); setSelectedAd(ad); }}>
              <img src = '/images/menu.svg'/>
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={() => navigate(`/ad/${selectedAd?.id}`)}>{strings.pages.myAds.editAd}</MenuItem>
                <MenuItem onClick={handleAdsApplicationsList}>{strings.pages.myAds.applicationList}</MenuItem>
                { ad?.adStatus === AdStatus.ACTIVE ? 
                  <MenuItem onClick={() => handleChangeAdStatus(selectedAd?.id, AdStatus.INACTIVE)}>{strings.pages.myAds.deactivate}</MenuItem>
                  :
                  <MenuItem onClick={() => handleChangeAdStatus(selectedAd?.id, AdStatus.ACTIVE)}>{strings.pages.myAds.activate}</MenuItem>
                }
              </Menu>
          </div>
        </div>
        { ad?.adStatus === AdStatus.ACTIVE && <>
          <Divider />
          <div>
            <span>Broj prijava: 50</span>
          </div>
        </> }
      </div>)
    }

    return <div className="my-ads-container">{result}</div>;
  }

  return (
    <div className="my-ads">
      <div className="my-ads-header">
        <div className="title" style={{fontSize: '40px'}}>Moji oglasi</div>
        <div className="my-ads-header-buttons-container">
          {renderMyAdsCategoriesButtons()}
        </div>
      </div>
      <Divider />
      { ads?.length > 0 && renderAds() }
      { errorMessage && <p className="error" style={{textAlign: 'center'}}>{errorMessage}</p> }

      <CustomModal showModal={showAdsApplicationsModal} onClose={() => setShowAdsApplicationsModal(false)} title={strings.components.adDetails.applicationForJob}>
          <div className="title" style={{marginBottom: '10px'}}>{selectedAd?.title}</div>
          {applications?.length > 0 && renderApplications()}
      </CustomModal>

      <CustomModal showModal={showApplicationModal} onClose={() => { setSelectedApplication(null); setShowApplicationModal(false); }} title={strings.components.adDetails.application}>
        <div>{selectedApplication?.user?.name}</div>
      </CustomModal>
    </div>
  );
};

export default MyAds;
