const TOKEN_KEY = "moilearn_token";
const USER_KEY = "moilearn_user";
const EXPIRY_KEY = "moilearn_expiry";

const AuthService = {
  saveAuth(token, user, expiry) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (expiry) localStorage.setItem(EXPIRY_KEY, expiry);
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  getExpiry() {
    return localStorage.getItem(EXPIRY_KEY);
  },

  isAuthenticated() {
    const token = this.getToken();
    const expiry = this.getExpiry();
    if (!token) return false;
    if (expiry && Date.now() > Number(expiry)) {
      this.clearAuth();
      return false;
    }
    return true;
  },

  getRole() {
    const user = this.getUser();
    return user?.role || "user";
  }
};

export default AuthService;