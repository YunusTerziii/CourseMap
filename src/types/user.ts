export interface AppUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  avatarUrl?: string;
  role: "Computer Engineering Student";
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  unlockedAt?: string;
}
