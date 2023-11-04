import React, { useContext, useEffect, useState } from "react";
import { Avatar, Button, Divider, IconButton } from "@mui/material";
import strings from "../localization";
import { Link } from "react-router-dom";
import { getShiftName } from "../Constants/Shift";
import { useSelector } from "react-redux";
import { deleteSavedAd, getUserSavedAdsIds, savedAd } from "../Services/UserSavedAdService";
import LoaderContext from "../Context/LoaderContext";
import CustomModal from "../Components/CustomModal";
import { saveApplication, getApplicationByAd, deleteApplication } from "../Services/ApplicationService";
import { useForm } from "react-hook-form";
import ApplicationForm from "./Forms/ApplicationForm";
import { JobType, getJobTypeName } from "../Constants/JobType";

const formRules = {
    'aboutYourself': { required: false },
    'motivationalLetter': { required: false }
}

const AdDetails = ({selectedAd}) => {

    const authUser = useSelector((state) => state.auth.user);
    const {setLoading} = useContext(LoaderContext)

    const [savedAdsIds, setSavedAdsIds] = useState([]);
    const [application, setApplication] = useState(null);
    const [showApplicationModal, setShowApplicationModal] = useState(false);

    const form = useForm(); 
    const { data, handleSubmit, getValues, setValue, setError, formState: { errors } } = form;

    useEffect(() => {
        fetchApplication();
    }, [selectedAd]);

    useEffect(() => {
        fetchSavedAdsIds();
    }, [authUser, selectedAd]);

    const fetchSavedAdsIds = () => {
        if(authUser?.id) {
            setLoading(true);
            getUserSavedAdsIds(authUser?.id).then((response) => {
                setSavedAdsIds(response?.data || []);
            }).finally(() => setLoading(false));
        }
    }

    const fetchApplication = () => {
        if(selectedAd?.id) {
            getApplicationByAd({id: selectedAd.id}).then((response) => {
                setApplication(response?.data || null);
            });
        }
    };

    const isAdSelected = () => {
        return savedAdsIds.find(id => id === selectedAd?.id)
    }

    const handleSavedAd = () => {
        setLoading(true);

        if(isAdSelected()) {
            deleteSavedAd(selectedAd?.id).then((response) => {
                fetchSavedAdsIds();
            }).finally(() => setLoading(false));
            return;
        }

        savedAd({adId: selectedAd?.id}).then((response) => {
            fetchSavedAdsIds();
        }).finally(() => setLoading(false));
    }

    const renderShifts = () => {
        let result = [];

        for(let shift of selectedAd?.shifts) {
            result.push(<div key={"shift-" + shift?.id} className="job-description-chip">
                { getShiftName(shift?.shiftType) }
            </div>)
        }

        return <div>
            <span style={{fontSize: '14px', fontWeight: '600'}}>{strings.components.adDetails.shifts}</span>
            <div className="job-description-chips">{result}</div>
        </div>;
    }

    const handleSubmitApplication = (data) => {
        if(authUser?.id && selectedAd?.id) {
            form.reset();
            setLoading(true);
            if(!application) {
                saveApplication({adId: selectedAd?.id, ...data}).then((response) => {
                    if(response?.status === 200) {
                        setApplication(response?.data || null);
                    }
                }).finally(() => setLoading(false));
            } else {
                deleteApplication(application?.id).then(() => {
                    setApplication(null);
                }).finally(() => setLoading(false));
            }
            setShowApplicationModal(false);
        }
    }

    return (<div className="ad-details">
        <div className="ad-details-header">
            { selectedAd?.user?.profileImage && <Avatar sx={{ width: 60, height: 60, borderRadius: '10px'}} src={selectedAd?.user?.profileImage} className="profile-image"/> }
            <div className="title">{selectedAd?.title}</div>
            { (selectedAd?.user?.userCompany && selectedAd?.user?.userCompany?.name) ?
                <Link to={(`/profile/${selectedAd?.user?.id}`)}  className="link">{selectedAd?.user?.name} {selectedAd?.user?.userCompany?.name}</Link> : 
                <Link to={(`/profile/${selectedAd?.user?.id}`)}  className="link">{selectedAd?.user?.name} {selectedAd?.user?.surname}</Link>
            }
            <div className="address">{selectedAd?.city}, {selectedAd?.address}</div>
            { authUser?.id && (authUser?.id !== selectedAd?.user?.id) && <div className="buttons-container">
                { !application ?
                    <Button variant="contained" className="button-primary" onClick={() => setShowApplicationModal(true)}>
                        {strings.components.adDetails.application}
                    </Button>
                    :
                    <Button variant="contained" className="cancel-button" onClick={() => setShowApplicationModal(true)}>
                        {strings.components.adDetails.cancel}
                    </Button>
                }
                <IconButton className="icon-button-grey" style={{height: 'inherit', width: '45px', backgroundColor: isAdSelected() ? '#104c88' : '#ebe9e9'}} onClick={handleSavedAd}>
                    <img src = '/images/bookmark.svg' style={{filter: isAdSelected() ? `invert(1)` : 'none'}}/>
                </IconButton>
            </div> }
        </div>
        <Divider />
        <div className="ad-details-description-container">
            <div className="title">{strings.components.adDetails.jobDescription}</div>
            <div className="job-description-chips-container">
                { selectedAd?.shifts?.length > 0 && renderShifts() }
                <div style={{display: 'flex', gap: '10px'}}>
                    { selectedAd?.salary && 
                        <div>           
                            <span style={{fontSize: '14px', fontWeight: '600'}}>{selectedAd?.jobType === JobType.FULL_TIME ? strings.components.adDetails.salary.fullTime : strings.components.adDetails.salary.partTime}</span>
                            <div className="job-description-chips">
                                <div className="job-description-chip">{selectedAd?.salary} RSD</div>
                            </div>
                        </div>
                    }
                    { selectedAd?.jobType && 
                        <div>           
                            <span style={{fontSize: '14px', fontWeight: '600'}}>{strings.components.adDetails.jobType}</span>
                            <div className="job-description-chips">
                                <div className="job-description-chip">{getJobTypeName(selectedAd?.jobType)}</div>
                            </div>
                        </div>
                    }
                </div>
                { selectedAd?.workingHours && 
                    <div>           
                        <span style={{fontSize: '14px', fontWeight: '600'}}>{selectedAd?.jobType === JobType.FULL_TIME ? strings.components.adDetails.workingHours.fullTime : strings.components.adDetails.workingHours.partTime}</span>
                        <div className="job-description-chips">
                            <div className="job-description-chip">{selectedAd?.workingHours}</div>
                        </div>
                    </div>
                }
            </div>
            <Divider />
            <div dangerouslySetInnerHTML={{ __html: selectedAd?.description }} />
        </div>

        <CustomModal showModal={showApplicationModal} onClose={() => setShowApplicationModal(false)} title={strings.components.adDetails.applicationForJob + ' - ' + selectedAd?.title}>
            { !application ? 
                <ApplicationForm
                    formRules={formRules}
                    values={getValues()}
                    setValue={setValue}
                    errors={errors} data={data} form={form}
                    onSubmit={handleSubmit(handleSubmitApplication)} 
                />
                :
                <div className='application-container'>
                    <div>{strings.components.adDetails.cancelApplication} {selectedAd?.title}</div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button variant="outlined" onClick={() => setShowApplicationModal(null)}>
                            {strings.components.adDetails.cancel} 
                        </Button>
                        <Button variant="contained" color="primary" className="button-primary" onClick={handleSubmitApplication}>
                            {strings.components.adDetails.approved} 
                        </Button>
                    </div>
                </div>
            }
            
        </CustomModal>
    </div>  
    );

}
export default AdDetails
