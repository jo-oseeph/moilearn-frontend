const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocalhost
  ? "http://localhost:5000"
  : "https://moilearn-backend.onrender.com";

export default API_BASE_URL;
