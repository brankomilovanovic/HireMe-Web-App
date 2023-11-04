import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkPagePermission } from "../route";

const AuthWrapper = (props) => {

    const location = useLocation();
    const authUser = useSelector((state) => state.auth.user);
    const isUserLoading = useSelector((state) => state.auth.isUserLoading);
      
    const checkPermission = () => {

        if(!checkPagePermission(location.pathname, authUser) && !isUserLoading) {
            window.location = '/'
        }

        return props.children;
    }

    return checkPermission();
};

export default AuthWrapper;
