import { createContext, useState } from 'react';

export interface IUserContext {
  // _id: string;
  // name: string;
  // email: string;
  // favorites: [];
  isLoggedIn: boolean;
}

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<IUserContext | null>({ isLoggedIn: false });

function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return <UserContext.Provider value={{ isLoggedIn }}>{children}</UserContext.Provider>;
}

export { UserContextProvider, UserContext };
