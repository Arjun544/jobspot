import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "filepond/dist/filepond.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        
        icon={false}
        closeButton={false}
      />
      
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
