import MainContent from "./Base/MainContent";
import { getRoutes } from "./route";
import { BrowserRouter as Router } from "react-router-dom";
import AuthWrapper from "./Base/AuthWrapper";
import LoaderWrapper from "./Base/Layout/LoaderWrapper";
import { setNotifications } from "./Slices/NotificationSlice";
import { getNotifications } from "./Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndStoreCurrentUser } from "./Services/UserService";
import { useEffect } from "react";
import { setCities } from "./Slices/LocationSlice";
import { City } from "country-state-city";

const App = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchAndStoreCurrentUser(dispatch);
    fetchAndStoreLocationData();
  }, []);

  const fetchAndStoreLocationData = () => {
    const uniqueCities = City.getCitiesOfCountry('RS').filter((obj, index, self) => index === self.findIndex((o) => o?.name === obj?.name));
    dispatch(setCities(uniqueCities || []));
  }

  const fetchNotifications = () => {
    if(user?.id) {
      getNotifications({extend: true}).then(response => {
          dispatch(setNotifications(response?.data?.items || []));
      });
    }
  };

  fetchNotifications();

  setInterval(() => fetchNotifications(), 10000);

  return (
    <Router>
      <LoaderWrapper>
        <AuthWrapper>
          <MainContent>
            {getRoutes()}
          </MainContent>
        </AuthWrapper>
      </LoaderWrapper>
    </Router>
  );
};

export default App;
