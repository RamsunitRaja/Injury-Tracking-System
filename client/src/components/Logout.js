import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { isAuthenticated, logout } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            logout({ returnTo: window.location.origin });
        }
    }, [isAuthenticated, logout]);

    return null;
};

export default LogoutButton;
