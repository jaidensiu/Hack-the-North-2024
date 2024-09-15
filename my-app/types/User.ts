 export interface User {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    age: number;
    gender: string;
    userType: "student" | "tutor";
    distance: number;
    rating: number;
    avatar: any;
    aboutMe: string;
  }