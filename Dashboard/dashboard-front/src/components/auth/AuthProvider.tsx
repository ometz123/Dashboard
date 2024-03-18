/* global VoidFunction, JSX */
import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { apiServices } from '~/api/APIservices';
//import { apiServices } from '~/api/APIservices';
import { authProvider } from '~/components/auth/provider';
import NavItem from '~/components/shared/Nav/NavItem';
import { User } from '~/interfaces/user';

interface AuthContextType {
  user: User | null;
  login: (user: User, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  const login = async (newUser: User, callback: VoidFunction) => {


    const { userName, password } = newUser

    const user = await apiServices.users.login({ userName, password })

    return authProvider.login(newUser, user, () => {

      setUser(newUser);
      callback();
    });

  };

  const logout = (callback: VoidFunction) => {
    return authProvider.logout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {

  return useContext(AuthContext);
}

function AuthStatus() {

  const auth = useAuth();
  const navigate = useNavigate();

  if (!auth.user?.userName) {
    return <NavItem href="/login">Login</NavItem>;
  }

  return (
    <p>
      Welcome {auth?.user?.userName}!{' '}
      <button
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={() => {
          auth.logout(() => navigate('/'));
        }}
      >
        Log out
      </button>
    </p>
  );
}

type RequireAuthProps = {
  children: JSX.Element;
};

function RequireAuth({ children }: RequireAuthProps) {

  const auth = useAuth();
  const location = useLocation();

  if (!auth.user?.userName) {
    // Redirect to the /login page, but save the current location.
    // This allows us to send user along to that page after they login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export { AuthProvider, AuthStatus, RequireAuth, useAuth };
