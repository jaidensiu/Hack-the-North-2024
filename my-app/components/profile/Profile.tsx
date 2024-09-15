// components/profile/ProfileContent.tsx
import React from "react";
import ScrollView from "@/components/ScrollView";
import ProfileCard from "@/components/profile/ProfileCard";
import { User } from "@/types/User";

import avatar1 from "@/assets/images/kim.jpeg";

export default function Profile() {
  const user: User = {
    id: "1",
    name: "John Doe",
    phoneNumber: "123-456-7890",
    email: "franklinming@whatever.com",
    age: 25,
    gender: "Male",
    userType: "tutor",
    distance: 5,
    rating: 4,
    avatar: avatar1,
    aboutMe: "I'm a passionate biology tutor with 5 years of experience.",
  };

  return (
    <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ProfileCard title="Name" value={user.name} />
      <ProfileCard title="Role" value={user.userType} />
      <ProfileCard title="Phone" value={user.phoneNumber} />
      <ProfileCard title="Email" value={user.email} />
      <ProfileCard title="Rating" value={user.rating} />
    </ScrollView>
  );
}
