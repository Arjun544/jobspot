import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { createContext, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

export const AppContext = createContext(null);

function MyApp({ Component, pageProps }) {
  const [filteredJobs, setFilteredJobs] = useState([]);

  return (
    <AppContext.Provider value={{ filteredJobs, setFilteredJobs }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            icon={false}
            closeButton={false}
          />

          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </AppContext.Provider>
  );
}

export default MyApp;
