import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  AppProvider.propTypes = {
    children: PropTypes.any,
  };
  const [lang, setLang] = useState('en');
  const [permissions, setPermissions] = useState(null);
  const [loggedInuser, setLoggedInUser] = useState({});
  const [modulePermission, setModulepermission] = useState();
  
  const getUser = () => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    setLoggedInUser(user);
       
  };
  React.useEffect(() => {
    getUser();
    return () => {
      getUser();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        loggedInuser,
        setLoggedInUser,
        lang,
        setLang,
        permissions,
        setPermissions,
        setModulepermission,
        modulePermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext as default };
