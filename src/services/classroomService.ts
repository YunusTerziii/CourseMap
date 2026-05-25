"use client";

import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { readStore, writeStore } from "@/services/localStore";
import type { AppUser } from "@/types/user";
import type { Classroom, ClassMember, CreateClassInput } from "@/types/classroom";

const localClassesKey = "coursemap-classes";
const localMembersKey = "coursemap-class-members";

export async function createClassroom(input: CreateClassInput, user: AppUser): Promise<Classroom> {
  const now = new Date().toISOString();
  const classroomData = {
    name: input.name.trim(),
    code: input.code.trim().toUpperCase(),
    description: input.description.trim(),
    term: input.term.trim(),
    color: input.color,
    inviteCode: generateInviteCode(input.code),
    ownerId: user.id,
    ownerName: user.name,
    ownerEmail: user.email,
    createdAt: now,
    updatedAt: now
  };

  if (db && isFirebaseConfigured) {
    const ref = doc(collection(db, "classes"));
    const classroom: Classroom = { id: ref.id, ...classroomData };
    const batch = writeBatch(db);
    batch.set(ref, classroomData);
    batch.set(doc(db, "classes", ref.id, "members", user.id), {
      classId: ref.id,
      userId: user.id,
      role: "owner",
      displayName: user.name,
      email: user.email,
      joinedAt: now
    } satisfies ClassMember);
    await batch.commit();
    return classroom;
  }

  const localClasses = readStore<Classroom[]>(localClassesKey, []);
  const classroom: Classroom = { id: `local-${Date.now()}`, ...classroomData };
  writeStore(localClassesKey, [classroom, ...localClasses]);
  const localMembers = readStore<ClassMember[]>(localMembersKey, []);
  writeStore(localMembersKey, [
    {
      classId: classroom.id,
      userId: user.id,
      role: "owner",
      displayName: user.name,
      email: user.email,
      joinedAt: now
    },
    ...localMembers
  ]);
  return classroom;
}

export async function fetchMyClassrooms(user: AppUser): Promise<Classroom[]> {
  if (db && isFirebaseConfigured) {
    const ownedQuery = query(collection(db, "classes"), where("ownerId", "==", user.id));
    const ownedSnapshot = await getDocs(ownedQuery);
    return ownedSnapshot.docs
      .map((classDoc) => ({ id: classDoc.id, ...classDoc.data() }) as Classroom)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  return readStore<Classroom[]>(localClassesKey, []).filter((classroom) => classroom.ownerId === user.id);
}

function generateInviteCode(code: string) {
  const prefix = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6) || "CLASS";
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${suffix}`;
}
