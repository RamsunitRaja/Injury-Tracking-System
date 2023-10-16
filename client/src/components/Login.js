import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
    const { isAuthenticated, loginWithPopup } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithPopup();
        }
    }, [isAuthenticated, loginWithPopup]);

    return null; 
};

export default Login;
