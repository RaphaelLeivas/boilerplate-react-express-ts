class AuthService {
  // localStorage -> remember me = true
  // sessionStorage -> remember me = false
  storage: Storage = localStorage;

  setStorage(newStorage: Storage) {
    this.storage = newStorage;
  }

  isAuthenticated = (): boolean => !!this.storage.getItem('token');

  logout = (): void => {
    this.storage.removeItem('token');
    this.storage.removeItem('username');
  };

  setToken = (token: string) => {
    this.storage.setItem('token', token);
  };

  setUsername = (username: string) => {
    this.storage.setItem('username', username);
  };

  getToken = (): string => this.storage.getItem('token') ?? '';

  getUsername = (): string => this.storage.getItem('username') ?? '';
}

export default new AuthService();
