"use client";

import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import type { AppUser } from "@/types/user";
import { trackAuthEvent } from "@/services/adminTrackingService";
import { withTimeout } from "@/lib/async";

export async function loginUser(email: string, password: string): Promise<AppUser> {
  assertFirebaseAuth();
  if (!password) throw new Error("Password is required.");
  const credential = await signInWithEmailAndPassword(auth!, email, password);
  const firebaseUser = credential.user;
  await firebaseUser.reload();
  const user = appUserFromFirebaseUser(auth!.currentUser || firebaseUser);
  void trackAuthEvent(user, "login");
  return user;
}

export async function registerUser(email: string, password: string, name: string): Promise<AppUser> {
  assertFirebaseAuth();
  if (!password || password.length < 6) throw new Error("Password must be at least 6 characters.");
  const credential = await createUserWithEmailAndPassword(auth!, email, password);
  if (name) await updateProfile(credential.user, { displayName: name });
  await sendVerificationEmail();
  const user = toAppUser(credential.user.uid, credential.user.email || email, name);
  void trackAuthEvent(user, "register");
  return user;
}

export async function logoutUser() {
  assertFirebaseAuth();
  await signOut(auth!);
}

export async function sendVerificationEmail() {
  assertFirebaseAuth();
  const user = auth!.currentUser;
  if (!user) throw new Error("You must be logged in to send a verification email.");
  await withTimeout(
    sendEmailVerification(user, {
      url: `${window.location.origin}/verify-email`,
      handleCodeInApp: false
    }),
    10000,
    undefined
  );
}

export async function sendPasswordReset(email: string) {
  assertFirebaseAuth();
  const normalizedEmail = email.trim();
  if (!normalizedEmail) throw new Error("Password reset icin once email adresini yaz.");
  await withTimeout(
    sendPasswordResetEmail(auth!, normalizedEmail, {
      url: `${window.location.origin}/login`
    }),
    10000,
    undefined
  );
}

export async function reloadCurrentUser() {
  assertFirebaseAuth();
  const user = auth!.currentUser;
  if (!user) return null;
  await user.reload();
  await auth!.currentUser?.getIdToken(true);
  return auth!.currentUser ? appUserFromFirebaseUser(auth!.currentUser) : null;
}

export function firebaseAuthReady() {
  return Boolean(auth && isFirebaseConfigured);
}

export function appUserFromFirebaseUser(user: { uid: string; email: string | null; displayName: string | null; emailVerified?: boolean; metadata?: { creationTime?: string } }): AppUser {
  return {
    id: user.uid,
    name: user.displayName || user.email?.split("@")[0] || "Student",
    email: user.email || "",
    emailVerified: Boolean(user.emailVerified),
    role: "Computer Engineering Student",
    createdAt: user.metadata?.creationTime || new Date().toISOString()
  };
}

function assertFirebaseAuth() {
  if (!auth || !isFirebaseConfigured) {
    throw new Error("Firebase Auth is not configured. Add NEXT_PUBLIC_FIREBASE_* environment variables.");
  }
}

function toAppUser(id: string, email: string, name?: string): AppUser {
  return {
    id,
    name: name || email.split("@")[0],
    email,
    emailVerified: false,
    role: "Computer Engineering Student",
    createdAt: new Date().toISOString()
  };
}
