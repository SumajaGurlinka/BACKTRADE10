import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";
function AuthenticationProvider({ children }) {
    const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (!authToken) {
     
      navigate("/login");
    
    }
    const handleUnload = () => {
      localStorage.removeItem('token');
    };
    

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [navigate]);

  return <>{children}</>;
}

export default AuthenticationProvider;
