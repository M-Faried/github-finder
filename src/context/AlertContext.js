import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertContextProvider = (props) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000);
  };

  const providerValue = {
    alert,
    showAlert,
  };

  return (
    <AlertContext.Provider value={providerValue}>
      {props.children}
    </AlertContext.Provider>
  );
};

export const AlertContextConsumer = (props) => {
  return <AlertContext.Consumer>{props.children}</AlertContext.Consumer>;
};
