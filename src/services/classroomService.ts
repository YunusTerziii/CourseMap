"use client";

import { collection, collectionGroup, doc, getDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { readStore, writeStore } from "@/services/localStore";
import type { AppUser } from "@/types/user";
import type { ClassInvite, Classroom, ClassMember, CreateClassInput } from "@/types/classroom";

const localClassesKey = "coursemap-classes";
const localMembersKey = "coursemap-class-members";
const localInvitesKey = "coursemap-class-invites";

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
    const invite: ClassInvite = {
      classId: ref.id,
      inviteCode: classroomData.inviteCode,
      className: classroomData.name,
      classCode: classroomData.code,
      term: classroomData.term,
      ownerId: user.id,
      ownerName: user.name,
      createdAt: now
    };
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
    batch.set(doc(db, "classInvites", classroomData.inviteCode), invite);
    await batch.commit();
    return classroom;
  }

  const localClasses = readStore<Classroom[]>(localClassesKey, []);
  const classroom: Classroom = { id: `local-${Date.now()}`, ...classroomData };
  writeStore(localClassesKey, [classroom, ...localClasses]);
  const localInvites = readStore<ClassInvite[]>(localInvitesKey, []);
  writeStore(localInvitesKey, [
    {
      classId: classroom.id,
      inviteCode: classroom.inviteCode,
      className: classroom.name,
      classCode: classroom.code,
      term: classroom.term,
      ownerId: user.id,
      ownerName: user.name,
      createdAt: now
    },
    ...localInvites
  ]);
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

export async function joinClassroom(inviteCode: string, user: AppUser): Promise<Classroom> {
  const normalizedInviteCode = normalizeInviteCode(inviteCode);
  if (!normalizedInviteCode) throw new Error("Invite code is required.");

  if (db && isFirebaseConfigured) {
    const inviteSnapshot = await getDoc(doc(db, "classInvites", normalizedInviteCode));
    if (!inviteSnapshot.exists()) throw new Error("No class found for this invite code.");
    const invite = inviteSnapshot.data() as ClassInvite;
    const classRef = doc(db, "classes", invite.classId);
    const memberRef = doc(db, "classes", invite.classId, "members", user.id);
    const existingMember = await getDoc(memberRef);
    if (!existingMember.exists()) {
      await writeBatch(db)
        .set(memberRef, {
          classId: invite.classId,
          userId: user.id,
          role: "student",
          displayName: user.name,
          email: user.email,
          joinedAt: new Date().toISOString(),
          inviteCode: normalizedInviteCode
        } satisfies ClassMember)
        .commit();
    }
    const classSnapshot = await getDoc(classRef);
    if (!classSnapshot.exists()) throw new Error("Class is no longer available.");
    return { id: classSnapshot.id, ...classSnapshot.data() } as Classroom;
  }

  const localInvites = readStore<ClassInvite[]>(localInvitesKey, []);
  const invite = localInvites.find((item) => item.inviteCode === normalizedInviteCode);
  if (!invite) throw new Error("No class found for this invite code.");
  const localClasses = readStore<Classroom[]>(localClassesKey, []);
  const classroom = localClasses.find((item) => item.id === invite.classId);
  if (!classroom) throw new Error("Class is no longer available.");
  const localMembers = readStore<ClassMember[]>(localMembersKey, []);
  const alreadyMember = localMembers.some((member) => member.classId === classroom.id && member.userId === user.id);
  if (!alreadyMember) {
    writeStore(localMembersKey, [
      {
        classId: classroom.id,
        userId: user.id,
        role: "student",
        displayName: user.name,
        email: user.email,
        joinedAt: new Date().toISOString(),
        inviteCode: normalizedInviteCode
      },
      ...localMembers
    ]);
  }
  return classroom;
}

export async function fetchMyClassrooms(user: AppUser): Promise<Classroom[]> {
  if (db && isFirebaseConfigured) {
    const firestore = db;
    const ownedQuery = query(collection(firestore, "classes"), where("ownerId", "==", user.id));
    const membershipsQuery = query(collectionGroup(firestore, "members"), where("userId", "==", user.id));
    const [ownedSnapshot, membershipsSnapshot] = await Promise.all([getDocs(ownedQuery), getDocs(membershipsQuery)]);
    const classes = new Map<string, Classroom>();
    ownedSnapshot.docs.forEach((classDoc) => {
      classes.set(classDoc.id, { id: classDoc.id, ...classDoc.data() } as Classroom);
    });
    const joinedClassIds = membershipsSnapshot.docs
      .map((memberDoc) => (memberDoc.data() as ClassMember).classId)
      .filter((classId) => !classes.has(classId));
    const joinedSnapshots = await Promise.all(joinedClassIds.map((classId) => getDoc(doc(firestore, "classes", classId))));
    joinedSnapshots.forEach((classSnapshot) => {
      if (classSnapshot.exists()) classes.set(classSnapshot.id, { id: classSnapshot.id, ...classSnapshot.data() } as Classroom);
    });
    return Array.from(classes.values())
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const localClasses = readStore<Classroom[]>(localClassesKey, []);
  const localMembers = readStore<ClassMember[]>(localMembersKey, []);
  const memberClassIds = new Set(localMembers.filter((member) => member.userId === user.id).map((member) => member.classId));
  return localClasses.filter((classroom) => classroom.ownerId === user.id || memberClassIds.has(classroom.id));
}

function generateInviteCode(code: string) {
  const prefix = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6) || "CLASS";
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `${prefix}-${suffix}`;
}

function normalizeInviteCode(inviteCode: string) {
  return inviteCode.trim().toUpperCase();
}
