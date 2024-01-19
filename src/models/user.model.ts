import { IPlantModel } from "./plant.model";

export interface IUser {
    _id: string; 
    name: string;
    email: string;
    favorites: IPlantModel[] ;
  }