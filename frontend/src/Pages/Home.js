import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import strings from "../localization";
import { Button, Divider, IconButton } from "@mui/material";
import { FilterDefaults } from "../Util/FilterUtil";
import { getAd, getAds } from "../Services/AdService";
import LoaderContext from "../Context/LoaderContext"
import AdDetails from "../Components/AdDetails";
import AdsList from "../Components/AdsList";
import { getUserSavedAds } from "../Services/UserSavedAdService";
import LatestSearches from "../Components/LatestSearches";
import TextSearchControl from "../Components/Inputs/TextSearchControl";
import { FormProvider, useForm } from "react-hook-form";
import { savedSearch } from "../Services/UserSavedSearchService";

export const JobList = {
  FOR_YOU: 1,
  LATEST_SEARCH: 2,
  SAVED_ADS: 3
}

const Home = () => {

  const authUser = useSelector((state) => state.auth.user);
  const {setLoading} = useContext(LoaderContext)

  const [filter, setFilter] = useState(FilterDefaults);

  const [selectedJobList, setSelectedJobList] = useState(JobList.FOR_YOU);
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const form = useForm();
  const { data, getValues, setValue, formState: { errors } } = form;

  const [filterErrorMessage, setFilterErrorMessage] = useState("");

  useEffect(() => {
    if(selectedJobList === JobList.FOR_YOU || selectedJobList === JobList.SAVED_ADS) {
      fetchAds();
    }
  }, [selectedJobList]);

  const fetchAd = (ad) => {  
    if(!ad) {
      setSelectedAd(null);
      return;
    }

    setLoading(true)
    getAd({id: ad?.id, extend: true}).then((response) => {
      setSelectedAd(response?.data)
    }).finally(() => setLoading(false));
  }

  const fetchAds = () => {
    setLoading(true)
    if(selectedJobList === JobList.FOR_YOU) {
      getAds({...filter, ...getValues(), perPage: 5}).then((response) => {
        if(response?.status === 200) {
          setAds(response?.data?.items || []);
          fetchAd(response?.data?.items[0])
        }
      }).finally(() => setLoading(false));
    } else {
      getUserSavedAds({id: authUser?.id, perPage: 5}).then((response) => {
        setAds(response?.data?.items || []);
        fetchAd(response?.data?.items?.length > 0 ? response?.data?.items[0] : null)
      }).finally(() => setLoading(false));
    }
  }

  const allFilterValuesEmpty = () => { return Object.values(getValues()).every(value => !value) }

  const onSubmitAdsFind = () => {
    setFilterErrorMessage('');

    if(allFilterValuesEmpty()) {
      setFilterErrorMessage(strings.pages.home.search.errorMessage)
      return;
    }

    setLoading(true);

    savedSearch(getValues()).then((response) => {
      if(response?.status === 200 || response?.status === 204) {
        fetchAds();
        return;
      }
      setLoading(false);
    });
  }

  const handleSelectedLatestSearch = (search) => {
    setValue('what', search?.whatSearch ?? '');
    setValue('where', search?.whereSearch ?? '');
    setSelectedJobList(JobList.FOR_YOU);
  }

  return (
    <div className="home-page">
      <div className="job-search-container">
        <div className="job-search-filter-buttons">
          <FormProvider {...form}>                          
              <TextSearchControl
                reverse={true}
                name='what'
                control={data}
                margin="normal"
                placeholder={strings.pages.home.search.whatPlaceholder}
                label={strings.components.search.what}
              />
              <TextSearchControl
                reverse={true}
                name='where'
                control={data}
                margin="normal"
                placeholder={strings.pages.home.search.wherePlaceholder}
                label={strings.components.search.where}
              />
          </FormProvider>
          <Button variant="contained" className="button-primary" onClick={() => onSubmitAdsFind()}>
              {strings.components.search.title}
          </Button>
        </div>
        { filterErrorMessage && <p className="error" style={{textAlign: 'center', fontWeight: 600}}>{filterErrorMessage}</p> }
        <div className="job-search-categories-buttons">
          <Button variant="text" className={selectedJobList === JobList.FOR_YOU ? 'button active' : 'button'} onClick={() => setSelectedJobList(JobList.FOR_YOU)}>
            {strings.pages.home.forYou}
          </Button>
          <Button variant="text" className={selectedJobList === JobList.LATEST_SEARCH ? 'button active' : 'button'} onClick={() => setSelectedJobList(JobList.LATEST_SEARCH)}>
            {strings.pages.home.latestSearch}
          </Button>
          { authUser?.id && <Button variant="text" className={selectedJobList === JobList.SAVED_ADS ? 'button active' : 'button'} onClick={() => setSelectedJobList(JobList.SAVED_ADS)}>
            {strings.pages.home.saveAds}
          </Button> }
        </div>
        <Divider />
        { (selectedJobList === JobList.FOR_YOU || selectedJobList === JobList.SAVED_ADS) && 
          <div className="ads-jobs-container">
            { ads?.length === 0 &&
              <div className="title" style={{fontSize: '25px'}}>
                { selectedJobList === JobList.SAVED_ADS ? strings.base.noSavedAdsResults : strings.base.noAdsResults}
              </div> 
            }
            { ads?.length > 0 && <AdsList ads={ads} filterValues={getValues()} selectedAd={selectedAd} onClickAd={fetchAd} selectedJobList={selectedJobList}/> }
            { selectedAd && <AdDetails selectedAd={selectedAd} />}
          </div>
        }
        { selectedJobList === JobList.LATEST_SEARCH && <LatestSearches selectedSearch={handleSelectedLatestSearch}/> }
      </div>
    </div>
  );
};

export default Home;
