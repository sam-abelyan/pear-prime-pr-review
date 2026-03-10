import { User } from "../types";

const USERS: Record<string, User> = {
  "123": { id: "123", age: 27, location: "SF", interests: ["hiking", "coffee"], personalityScore: 7 },
  "456": { id: "456", age: 26, location: "SF", interests: ["coffee", "music"], personalityScore: 8 },
};

export async function getUserById(id: string): Promise<User | null> {
  return USERS[id] || null;
}