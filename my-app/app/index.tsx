import { Redirect } from "expo-router";

export default function App() {
  // For now, let's always redirect to the auth flow
  // You can add authentication logic here later
  return <Redirect href="/(auth)/login" />;
}
