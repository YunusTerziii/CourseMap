# CourseMap

CourseMap turns instructor-provided CE103 PDFs into a guided learning tracker. Students do not upload PDFs. Course material PDFs live under `public/materials`, while week content is modeled as TypeScript data in `src/data/weeks`.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Firebase

Copy `.env.example` to `.env.local` and fill Firebase web app values. The app is structured for Firebase Auth and Firestore, with local demo persistence enabled while credentials are absent.

User-owned data belongs in Firestore collections such as `userProgress`, `weekProgress`, `userNotes`, `quizAttempts`, and `achievements`. Static lesson content stays in the codebase so students cannot modify course material.

Deploy the included `firestore.rules` so users can only access their own progress and notes.
