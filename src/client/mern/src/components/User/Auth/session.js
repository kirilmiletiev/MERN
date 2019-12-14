const sessionService = {
  save: (token, username) => {
    sessionStorage.setItem('authtoken', token);
    sessionStorage.setItem('username', username);
  },

  clear: () => {
    sessionStorage.clear();
  },

  isLogged: () => {
    return sessionStorage.getItem('authtoken') !== null;
  },
  getUsername: () => {
    return sessionStorage.getItem('username');
  }
}

export default sessionService;