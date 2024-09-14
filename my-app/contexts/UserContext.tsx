import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

interface UserContextType {
  userId: string | null;
  isLoading: boolean;
  login: (userId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = useQuery(api.users.getUser);
  const createSession = useMutation(api.sessions.create);
  const deleteSession = useMutation(api.sessions.delete);

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      if (user) {
        setUserId(user._id);
      }
      setIsLoading(false);
    }
    loadUser();
  }, [getUser]);

  const login = async (newUserId: string) => {
    await createSession({ userId: newUserId });
    setUserId(newUserId);
  };

  const logout = async () => {
    if (userId) {
      await deleteSession({ userId });
    }
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, isLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
