// components/profile/ProfileContent.tsx
import React from "react";
import ScrollView from "@/components/ScrollView";
import ProfileCard from "@/components/profile/ProfileCard";

interface User {
  name: string;
  role: string;
  phone: string;
  email: string;
  rating: number;
}

export default function Profile() {
  const user: User = {
    name: "Franklin Ma",
    role: "Teacher",
    phone: "123-456-7890",
    email: "franklinma@gmail.com",
    rating: 4.9,
  };

  return (
    <ScrollView headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ProfileCard title="Name" value={user.name} />
      <ProfileCard title="Role" value={user.role} />
      <ProfileCard title="Phone" value={user.phone} />
      <ProfileCard title="Email" value={user.email} />
      <ProfileCard title="Rating" value={user.rating} />
    </ScrollView>
  );
}
