/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const Context = createContext(null);

const useAppContext = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const values = {
    showForm,
    setShowForm,
    showButtons,
    setShowButtons,
    selectedId,
    setSelectedId,
    showDeletePopup,
    setShowDeletePopup,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useAppContext };
