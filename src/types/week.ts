export type Difficulty = "easy" | "medium" | "hard";

export interface ChecklistTask {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
}

export interface KeyConcept {
  id: string;
  term: string;
  definition: string;
}

export interface PracticeTask {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
}

export interface TeachingCard {
  title: string;
  explanation: string;
  example: string;
}

export interface MasteryBlock {
  title: string;
  paragraphs: string[];
  code?: string;
  codeLanguage?: string;
  bullets?: string[];
}

export interface ScenarioCard {
  problem: string;
  answer: string;
  reason: string;
}

export interface WeekSection {
  id: string;
  title: string;
  simpleExplanation: string;
  detailedExplanation: string;
  analogy: string;
  whyItMatters: string;
  summary: string;
  sourceDetails?: string[];
  teachingCards?: TeachingCard[];
  scenarios?: ScenarioCard[];
  checklist: ChecklistTask[];
}

export interface WeekContent {
  id: string;
  courseId?: string;
  weekNumber: number;
  title: string;
  zone: string;
  summary: string;
  lessonOverview: string;
  estimatedMinutes: number;
  originalMaterialUrl: string;
  sections: WeekSection[];
  keyConcepts: KeyConcept[];
  practiceTasks: PracticeTask[];
}

export interface CourseContent {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  description: string;
  status: "active" | "coming-soon";
  weeks: WeekContent[];
}
