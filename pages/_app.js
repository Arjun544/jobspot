import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { createContext, useState } from "react";

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [filteredJobs, setFilteredJobs] = useState([]);

  return (
    <AppContext.Provider value={{ filteredJobs, setFilteredJobs }}>

    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        
        icon={false}
        closeButton={false}
        />
      
      <Component {...pageProps} />
    </Provider>
        </AppContext.Provider>
  );
}

export default MyApp;
