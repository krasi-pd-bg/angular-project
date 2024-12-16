import { User } from "./user";

  export interface Wine {
    _id: string;
    name: string;
    type: string;
    grapeVariety: string;
    vintage: number;
    wineCellar: string;
    regionCountry: string;
    price: number;
    description: string;
    image: string;
    likedList: string[];
    owner: User;
    __v: number;
  }