const TOKEN_KEY = "moilearn_token";
const USER_KEY = "moilearn_user";
const EXPIRY_KEY = "moilearn_expiry";

const AuthService = {
  // Save token, user, and expiry 
  saveAuth(token, user, expiry) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (expiry) localStorage.setItem(EXPIRY_KEY, expiry.toString());
  },

  // Clear all auth data
  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  },

  // Get stored JWT token
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get stored user object
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Get expiry timestamp as number
  getExpiry() {
    const expiry = localStorage.getItem(EXPIRY_KEY);
    return expiry ? Number(expiry) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    const expiry = this.getExpiry();

    if (!token) return false;

    if (expiry && Date.now() > expiry) {
      this.clearAuth(); 
      return false;
    }

    return true;
  },

  // Get role from stored user
  getRole() {
    const user = this.getUser();
    return user?.role || "user";
  },
};

export default AuthService;
