const config = {
  SERVER_URL:
    process.env.REACT_APP_ENV === "Development"
      ? "http://localhost:8900/"
      : "https://dreamcareer.onrender.com/",
  SOCKET_URL:
    process.env.REACT_APP_ENV === "Development"
      ? "ws://localhost:8900/"
      : `wss://dreamcareer.onrender.com/`,
};

export const SERVER_URL = config.SERVER_URL;
export const SOCKET_URL = config.SOCKET_URL;
