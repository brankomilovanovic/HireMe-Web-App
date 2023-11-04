import React, { useContext, useEffect, useState } from "react";
import LoaderContext from "../Context/LoaderContext";
import { deleteSavedSearch, getUserLatestSearches } from "../Services/UserSavedSearchService";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import strings from "../localization";
import { Link } from "react-router-dom";

const LatestSearches = ({selectedSearch = () => {}}) => {

    const authUser = useSelector((state) => state.auth.user);
    const {setLoading} = useContext(LoaderContext)

    const [latestSearches, setLatestSearches] = useState([]);

    useEffect(() => {
        fetchLatestSearches();
    }, []);

    const fetchLatestSearches = () => {
        setLoading(true);
        getUserLatestSearches({perPage: 20}).then((response) => {
            setLatestSearches(response?.data || []);
        }).finally(() => setLoading(false));
    }

    const handleRemoveLatestSearch = (e, id) => {
        e.stopPropagation();
        setLoading(true);
        deleteSavedSearch(id).then((response) => {
            if(response.status === 200) {
                fetchLatestSearches();
            }
        })
    }

    const handleSelectSearch = (e, search) => {
        e.stopPropagation()
        selectedSearch(search)
    }

    const renderLatestSearches = () => {
        let result = [];
        
        for(let latestSearch of latestSearches) {
            result.push(<div className="latest-search" key={'search-' + latestSearch?.item?.id} onClick={(e) => handleSelectSearch(e, latestSearch?.item)}>
                <div className="description">
                    <div>{latestSearch?.item?.whatSearch || latestSearch?.item?.whereSearch}</div>
                    <div style={{color: '#888383'}}>{(latestSearch?.item?.whereSearch && latestSearch?.item?.whatSearch) ? `${latestSearch?.count} poslova u ${latestSearch?.item?.whereSearch}` :  `${latestSearch?.count} poslova`}</div>
                </div>
                <IconButton onClick={(e) => handleRemoveLatestSearch(e, latestSearch?.item?.id)}>
                    <img src='/images/close.svg'/>
                </IconButton>
            </div>)
        }

        return <div className="latest-serches">{result}</div>;
    }

    return (<div className="latest-serches-container">
        { !authUser?.id && <div className="no-account-container">
                <div className="title">{strings.components.latestSearch.noAccount}</div>
                <div style={{display: 'flex', gap: '5px'}}>
                    <Link to={"/registration"} className="link">{strings.forms.common.register}</Link>
                    <div>{strings.components.latestSearch.noAccountDescription}</div>
                </div>
            </div>
        }
        { (latestSearches?.length > 0 && authUser?.id) && renderLatestSearches( )}
        </div>
    );

}
export default LatestSearches
