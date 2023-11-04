import React, { useEffect, useState } from "react";
import { calculateDaysAgo } from "../Util/DateUtil";
import { getAdTypeName } from "../Constants/AdType";
import { Link } from "react-router-dom";
import InfiniteScroll from "./InifiniteScroll";
import { getAds } from "../Services/AdService";
import { JobList } from "../Pages/Home";
import { getUserSavedAds } from "../Services/UserSavedAdService";
import { useSelector } from "react-redux";
import { FilterDefaults } from "../Util/FilterUtil";

const AdsList = ({
          ads, 
          selectedAd, 
          onClickAd = () => {}, 
          selectedJobList = JobList.FOR_YOU,
          filterValues = {},
        }) => {

  const [adsList, setAdsList] = useState([]);
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    setAdsList(ads);
  }, [ads]);
  
  const renderAds = () => {
    let result = [];
  
      for(let ad of adsList) {
        result.push(<div key={'ad' + ad?.id} onClick={() => onClickAd(ad)} className={ad?.id === selectedAd?.id ? "ad-container active" : "ad-container"}>
          <div className="ad-header">
            <div className="title">{ad?.title}</div>
            <div className="ad-type">{getAdTypeName(ad?.adType)}</div>
          </div>
          <div className="ad-user-name">
            { (ad?.user?.userCompany && ad?.user?.userCompany?.name) ?
                <Link to={(`/profile/${ad?.user?.id}`)} className="link">{ad?.user?.name} {ad?.user?.userCompany?.name}</Link> : 
                <Link to={(`/profile/${ad?.user?.id}`)} className="link">{ad?.user?.name} {ad?.user?.surname}</Link>
            }
          </div>
          <div className="ad-address">{ad?.city}, {ad?.address}</div>
          <div className="ad-description" dangerouslySetInnerHTML={{ __html: ad?.shortDescription }} />
          <div className="ad-date-created">{calculateDaysAgo(ad?.date_created)}</div>
        </div>) 
      }
  
    return result;
  }

  const setDataAfterFetch = (response) => {
    return response?.data?.items || [];
  }

  const requestData = selectedJobList === JobList.SAVED_ADS ? {id: authUser?.id, perPage: 5} : {...FilterDefaults, ...filterValues};

  return <InfiniteScroll 
      fetchFunction={selectedJobList === JobList.SAVED_ADS ? getUserSavedAds : getAds}
      data={adsList}
      setData={setAdsList}
      setDataAfterFetch={setDataAfterFetch}
      resetData={selectedJobList}
      requestData={requestData}>
        <div className="ads-job-list">{renderAds()}</div>
  </InfiniteScroll> 

}

export default AdsList;
