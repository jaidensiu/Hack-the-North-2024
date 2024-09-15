 export interface User {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    age: number;
    gender: string;
    userType: "student" | "tutor";
    distance: number;
    overallRating: number;
    avatar: any;
    bio: string;
  }