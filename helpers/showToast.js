import Toastify from "toastify-js";

export const showToast = (message, color) => {
  return Toastify({
    text: message,
    duration: 3000,
    newWindow: false,
    close: false,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: color,
      borderRadius: "10px",
    },
  }).showToast();
};
