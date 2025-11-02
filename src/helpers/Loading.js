// src/components/Loading.js
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Loading = {
  show(message = "Loading...") {
    Swal.fire({
      html: `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          padding: 15px;
        ">
          <div class="loader-ring"></div>
          <span style="
            font-size: 1rem;
            font-weight: 500;
            color: #374151;
            letter-spacing: .3px;
          ">${message}</span>
        </div>
      `,
      width: 260,
      background: "#ffffff",
      backdrop: `
        rgba(0, 0, 0, 0.4)
      `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      customClass: {
        popup: "loading-popup",
      },
      didOpen: () => {
        const style = document.createElement("style");
        style.id = "loading-style";
        style.innerHTML = `
          .loader-ring {
            width: 55px;
            height: 55px;
            border: 5px solid rgba(0,0,0,0.08);
            border-top-color: #3b82f6;      /* blue accent */
            border-radius: 50%;
            animation: spin 0.9s linear infinite;
            box-shadow: 0 0 6px rgba(59,130,246,.3);
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .swal2-popup.loading-popup {
            border-radius: 14px;
            box-shadow: 0 8px 28px rgba(0,0,0,.15);
          }
        `;
        if (!document.getElementById("loading-style")) {
          document.head.appendChild(style);
        }
      },
    });
  },

  close() {
    Swal.close();
  },
};

export default Loading;
