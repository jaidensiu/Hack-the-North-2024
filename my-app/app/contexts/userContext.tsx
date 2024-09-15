import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Id } from "../../convex/_generated/dataModel";
import { PersonType } from "@/types/User";

interface UserContextType {
  userID: Id<"users"> | null;
  setUserID: Dispatch<SetStateAction<Id<"users"> | null>>;
  personType: PersonType | null;
  setPersonType: Dispatch<SetStateAction<PersonType | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userID, setUserID] = useState<Id<"users"> | null>(null);
  const [personType, setPersonType] = useState<PersonType | null>(null);

  return (
    <UserContext.Provider
      value={{ userID, setUserID, personType, setPersonType }}
    >
      {children}
    </UserContext.Provider>
  );
};
