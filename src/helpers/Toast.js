// src/components/Toast.js
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000, 
  timerProgressBar: false,
  showClass: {
    popup: "swal2-noanimation",
    backdrop: "swal2-noanimation",
  },
  hideClass: {
    popup: "",
  },
});

export default Toast;
