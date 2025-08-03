import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextApiProvider = ({ children }) => {
  const getToken = localStorage.getItem("JWT_token") 
    ? JSON.parse(localStorage.getItem("JWT_token")) 
    : null;

  const [token, setToken] = useState(getToken);

  const sendData = {
    token,
    setToken,
  };

  return (
    <ContextApi.Provider value={sendData}>
      {children}
    </ContextApi.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(ContextApi);
};
