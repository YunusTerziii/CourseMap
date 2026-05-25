export type ClassMemberRole = "owner" | "student";

export interface Classroom {
  id: string;
  name: string;
  code: string;
  description: string;
  term: string;
  inviteCode: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  color: "violet" | "emerald" | "rose" | "sky";
  createdAt: string;
  updatedAt: string;
}

export interface ClassMember {
  classId: string;
  userId: string;
  role: ClassMemberRole;
  displayName: string;
  email: string;
  joinedAt: string;
  inviteCode?: string;
}

export interface CreateClassInput {
  name: string;
  code: string;
  description: string;
  term: string;
  color: Classroom["color"];
}

export interface ClassInvite {
  classId: string;
  inviteCode: string;
  className: string;
  classCode: string;
  term: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}
