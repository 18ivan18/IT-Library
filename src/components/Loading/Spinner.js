import { html } from "lit-html";
import { ifThen } from "../../utils/";
export const spinner = (loading) => {
  return ifThen(
    loading,
    html` <style>
        .loader-wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(36, 47, 64, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loader {
          display: inline-block;
          width: 30px;
          height: 30px;
          position: relative;
          border: 4px solid #fff;
          animation: loader 2s infinite ease;
        }
        .loader-inner {
          vertical-align: top;
          display: inline-block;
          width: 100%;
          background-color: #fff;
          animation: loader-inner 2s infinite ease-in;
        }
        @keyframes loader {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(180deg);
          }
          50% {
            transform: rotate(180deg);
          }
          75% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes loader-inner {
          0% {
            height: 0%;
          }
          25% {
            height: 0%;
          }
          50% {
            height: 100%;
          }
          75% {
            height: 100%;
          }
          100% {
            height: 0%;
          }
        }
      </style>
      <div class="loader-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
      </div>`
  );
};
