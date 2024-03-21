import "./App.css";
import { getMobileOperatingSystem } from "./utils";

export default function App() {
  const ErrorType = {
    fullscreen: "fullscreen",
    popup: "popup",
    toast: "toast",
    inScreen: "inScreen",
    generic: "generic",
  };

  const fullscreenError = {
    error: {
      code: "900000",
      channel: "mobile",
      source: "Mobiliti",
      lang: "EN",
      header: "An error has occurred",
      message:
        "If you were doing a financial transaction, please check your account balance and latest transactions to prevent duplicating transaction.",
      layoutType: "Full-Screen",
      clickActions: [
        { type: "BTN", label: "OK", deeplink: "modernapp://restart" },
      ],
    },
  };

  const popupError = {
    error: {
      code: "RQ38",
      channel: "mobile",
      source: "MFHost",
      lang: "EN",
      header: "Incorrect Information",
      message:
        "The information does not match with what you have provided to the Bank. Please visit any Bangkok Bank branch and bring your citizen ID card to update your identity information (RQ38)",
      layoutType: "Pop-Up",
      clickActions: [
        {
          type: "BTN",
          label: "Cancel",
          deeplink: "modernapp://restart",
        },
        { type: "BTN", label: "Edit", deeplink: "modernapp://dismiss-error" },
      ],
    },
  };

  const toastError = {
    error: {
      code: "900000",
      channel: "mobile",
      source: "Mobiliti",
      lang: "EN",
      header: "An error has occurred",
      message: "Toast error message.",
      layoutType: "Toast",
      clickActions: [
        { type: "BTN", label: "OK", deeplink: "modernapp://restart" },
      ],
    },
  };

  const inScreenError = {
    error: {
      code: "900000",
      channel: "mobile",
      source: "Mobiliti",
      lang: "EN",
      header: "An error has occurred",
      message:
        "If you were doing a financial transaction, please check your account balance and latest transactions to prevent duplicating transaction.",
      layoutType: "In Screen",
      clickActions: [
        { type: "BTN", label: "OK", deeplink: "modernapp://restart" },
      ],
    },
  };

  const genericError = "An error occured";

  function showError(type) {
    // alert(type)
    switch (type) {
      case ErrorType.fullscreen:
        sendErrorCallback(fullscreenError);
        break;
      case ErrorType.popup:
        sendErrorCallback(popupError);
        break;
      case ErrorType.toast:
        sendErrorCallback(toastError);
        break;
      case ErrorType.inScreen:
        sendErrorCallback(inScreenError);
        break;
      case ErrorType.generic:
        sendErrorCallback(genericError);
        break;
      default:
        break;
    }
  }

  function sendErrorCallback(json) {
    const os = getMobileOperatingSystem();
    if (os === "Android" && window.kyc !== undefined) {
      window.kyc.exceptionCallback(JSON.stringify(json).toString());
    } else if (os === "iOS" && window.webkit !== undefined) {
      window.webkit.messageHandlers.exceptionCallback.postMessage(
        JSON.stringify(json.error !== undefined ? json.error : json)
      );
    }
  }

  return (
    <div className="App">
      <h2>Error case</h2>
      <div className="content">
        <button
          onClick={() => {
            showError(ErrorType.fullscreen);
          }}
        >
          Fullscreen
        </button>
        <button
          onClick={() => {
            showError(ErrorType.popup);
          }}
        >
          Pop-up
        </button>
        <button
          onClick={() => {
            showError(ErrorType.toast);
          }}
        >
          Toast
        </button>
        <button
          onClick={() => {
            showError(ErrorType.inScreen);
          }}
        >
          In Screen
        </button>
        <button
          onClick={() => {
            showError(ErrorType.generic);
          }}
        >
          Generic
        </button>
      </div>
    </div>
  );
}
