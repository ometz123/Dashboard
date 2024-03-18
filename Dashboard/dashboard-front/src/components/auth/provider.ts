import { User } from '~/interfaces/user';

const authProvider = {
  isAuthenticated: false,
  login(newUser: User, userFromDb: User, callback: VoidFunction) {

    if (newUser.userName !== userFromDb.userName) {
      authProvider.isAuthenticated = false;
      return
    }
    authProvider.isAuthenticated = true;
    callback()
  },
  logout(callback: VoidFunction) {
    authProvider.isAuthenticated = false;
    callback()
  },
};

export { authProvider };
