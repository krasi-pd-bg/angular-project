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
    owner: string;
    __v: number;
  }