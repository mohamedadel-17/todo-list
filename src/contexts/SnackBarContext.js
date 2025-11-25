import { createContext, useContext, useState } from "react";
import MySnackBar from "../components/MySnackBar";
const SnackBarContext = createContext({});

export function SnackBarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

    const showHideToast = (message) => {
      setMessage(message);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 6000);
    };

  return (
    <SnackBarContext.Provider value={{ showHideToast }}>
      <MySnackBar open={open} message={message}/>
      {children}
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => {
  return useContext(SnackBarContext);
}


