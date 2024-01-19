import { createContext, useState } from 'react';
import { IUser } from '../models/user.model';
import { IPlantModel } from '../models/plant.model';

export interface IUserContext {
  currentUser: IUser | null;
  isLoggedIn: boolean;
  handleCurrentUserInfo(userInfo: IUser): void;
  addToFavorites(plant: IPlantModel): void;
  removeFromFavorites(plantId: string): void;
  logout(): void;
}

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<IUserContext | null>(null);

function UserContextProvider({ children }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const handleCurrentUserInfo = (userInfo: IUser): void => {
    if (!userInfo) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }
    setCurrentUser(userInfo);
    setIsLoggedIn(true);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('plant');
  };

  const addToFavorites = (createdPlant: IPlantModel): void => {
    const updatedUser = { ...currentUser, favorites: [...currentUser!.favorites, createdPlant] };
    setCurrentUser(updatedUser as IUser);
    clearLocalStorage();
  };

  const removeFromFavorites = (plantId: string): void => {
    const updatedFavorites = currentUser?.favorites.filter((plant) => plant._id !== plantId);
    const updatedUser = { ...currentUser, favorites: updatedFavorites };
    setCurrentUser(updatedUser as IUser);
  };

  const logout = (): void => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    clearLocalStorage();
  };

  return <UserContext.Provider value={{ currentUser, isLoggedIn, handleCurrentUserInfo, logout, addToFavorites, removeFromFavorites }}>{children}</UserContext.Provider>;
}

export { UserContextProvider, UserContext };
