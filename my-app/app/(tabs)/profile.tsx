import { StyleSheet } from 'react-native';

import ScrollView from '@/components/ScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ProfileCard from '@/components/ProfileCard';


// TODO: interface props are for defining models
interface ProfileScreenProps {
  name: string;
  phone: string;
  email: string;
  rating: number;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ name, phone, email, rating }) => {
  const user = {
    name: 'Franklin Ma',
    role: 'Teacher',
    phone: '123-456-7890',
    email: 'franklinma@gmail.com',
    rating: 4.9,
  };

  return (
    <>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Your Profile</ThemedText>
      </ThemedView>
      <ScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
        <ProfileCard title="Name" value={user.name} />
        <ProfileCard title="Role" value={user.role} />
        <ProfileCard title="Phone" value={user.phone} />
        <ProfileCard title="Email" value={user.email} />
        <ProfileCard title="Rating" value={user.rating} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
    paddingLeft: 32,
    paddingBottom: 8
  },
});

export default ProfileScreen;