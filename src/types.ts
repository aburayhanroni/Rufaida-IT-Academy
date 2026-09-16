export type Language = 'en' | 'bn';

export interface StudentUser {
  id: string;
  name: string;
  nameBn?: string;
  studentId: string; // e.g. "BD-2026-8921"
  email: string;
  phone?: string;
  avatarUrl?: string;
  district: string; // e.g. "Dhaka", "Chittagong", etc.
  joinedDate: string;
  accountType: 'independent'; // Independent student model
  connectedInstitution?: {
    id: string;
    name: string;
    type: 'school' | 'college' | 'coaching';
    joinedDate: string;
  } | null;
}

export type ContentBlockType = 'text' | 'callout' | 'diagram' | 'table' | 'key_terms' | 'step_guide' | 'shortcut_table' | 'example';

export interface ContentBlock {
  type: ContentBlockType;
  titleEn?: string;
  titleBn?: string;
  contentEn: string;
  contentBn?: string;
  extra?: Record<string, any>;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionBn: string;
  optionsEn: string[];
  optionsBn: string[];
  correctIndex: number;
  explanationEn: string;
  explanationBn: string;
}

// Generic Reusable Assessment Types
export type AssessmentType = 
  | 'mcq'
  | 'true_false'
  | 'short_answer'
  | 'practical_task'
  | 'typing_test'
  | 'coding_challenge';

export interface GenericAssessmentItem {
  id: string;
  type: AssessmentType;
  promptEn: string;
  promptBn: string;
  explanationEn?: string;
  explanationBn?: string;
  points?: number;
  // MCQ and True/False fields
  optionsEn?: string[];
  optionsBn?: string[];
  correctIndex?: number;
  // Typing Test fields
  targetText?: string;
  targetWpm?: number;
  minAccuracy?: number;
  timeLimitSeconds?: number;
  // Short Answer / Future Coding / Practical
  expectedAnswer?: string;
  sampleSolution?: string;
  starterCode?: string;
  codeLanguage?: string;
}

export interface AssessmentConfig {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn?: string;
  descriptionBn?: string;
  courseId: string;
  lessonId: string;
  timeLimitSeconds?: number | null; // null for untimed, or number in seconds (e.g. 180 for 3 mins)
  passingPercentage?: number; // default 60%
  items: GenericAssessmentItem[];
}

export interface AssessmentItemResult {
  itemId: string;
  type: AssessmentType;
  userAnswer: any; // e.g. optionIndex for MCQ, typed string/result for typing
  correctAnswer?: any;
  isCorrect: boolean;
  score: number;
  maxScore: number;
  feedbackEn?: string;
  feedbackBn?: string;
  metadata?: {
    wpm?: number;
    accuracy?: number;
    errorCount?: number;
  };
}

export interface AssessmentSubmissionResult {
  assessmentId: string;
  courseId: string;
  lessonId: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  isPassed: boolean;
  timeSpentSeconds: number;
  itemResults: AssessmentItemResult[];
  submittedAt: string;
}

export interface InteractivePracticeConfig {
  type: 'inside_pc' | 'keyboard_shortcuts' | 'file_organizer' | 'typing_prompt' | 'word_editor_demo' | 'excel_formula' | 'binary_converter' | 'general';
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  data?: any;
}

export interface Lesson {
  id: string;
  lessonNumber: number;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  objectivesEn?: string[];
  objectivesBn?: string[];
  estimatedMinutes: number;
  contentBlocks: ContentBlock[];
  practice?: InteractivePracticeConfig;
  quiz?: QuizQuestion[];
  assessment?: AssessmentConfig;
}

export interface ModuleChapter {
  id: string;
  moduleNumber: number;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  lessons: Lesson[];
}

export type CourseModule = ModuleChapter;

export interface Course {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'basic_computer' | 'ssc_ict' | 'upcoming';
  level: 'Beginner' | 'Secondary (SSC)' | 'Higher Secondary (HSC)';
  levelBn: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  badge: string;
  badgeColor: string;
  modulesCount: number;
  totalLessons: number;
  estimatedHours: number;
  prerequisitesEn: string;
  prerequisitesBn: string;
  learningOutcomesEn: string[];
  learningOutcomesBn: string[];
  modules: ModuleChapter[];
  hasTypingIntegration?: boolean;
}

export type EnrollmentStatus = 'active' | 'completed' | 'cancelled' | 'suspended';

export interface CourseEnrollment {
  id: string; // Unique enrollment record, e.g. "ENR-BD-2026-8921-basic-computer"
  studentId: string; // Conceptual link: Student -> Enrollment
  studentName?: string;
  courseId: string; // Conceptual link: Enrollment -> Course
  status: EnrollmentStatus; // 'active' | 'completed' | 'cancelled' | 'suspended'
  statusReason?: string;
  enrolledAt: string;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  progressPercent: number;
  quizScores: Record<string, number>; // lessonId or quizId -> score percent
  completedAt?: string;
}

export interface TypingPersonalBest {
  wpm: number;
  accuracy: number;
  drillTitle?: string;
  category?: string;
  achievedAt: string;
}

export interface TypingSessionResult {
  drillId: string;
  drillTitle: string;
  category: string;
  wpm: number;
  netWpm: number;
  accuracy: number;
  errorCount: number;
  totalKeystrokes: number;
  durationSeconds: number;
  isNewPersonalBest?: boolean;
  completedAt: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errorCount: number;
  drillsCompleted: number;
  totalPracticeMinutes: number;
  personalBest: TypingPersonalBest;
  history: {
    id?: string;
    date: string;
    drillName: string;
    category?: string;
    wpm: number;
    accuracy: number;
    errors?: number;
    durationSeconds?: number;
  }[];
}

export interface LessonNote {
  id: string;
  lessonId: string;
  courseId: string;
  text: string;
  updatedAt: string;
}

export interface LessonBookmark {
  lessonId: string;
  courseId: string;
  lessonTitle: string;
  bookmarkedAt: string;
}

export interface QuizResultRecord {
  id: string;
  quizTitle: string;
  courseId: string;
  lessonId: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
  answers: {
    questionId: string;
    userSelected: number;
    correctIndex: number;
  }[];
}

// --------------------------------------------------------------------------
// Conceptual Student Learning Progress Architecture (Decoupled from Content & Enrollment)
// --------------------------------------------------------------------------

export interface ModuleProgress {
  moduleId: string;
  moduleNumber: number;
  titleEn: string;
  titleBn: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  isCompleted: boolean;
}

export interface CourseProgressRecord {
  courseId: string;
  totalLessons: number;
  completedLessonsCount: number;
  progressPercent: number;
  completedLessonIds: string[];
  moduleProgress: Record<string, ModuleProgress>;
  lastAccessedLessonId?: string;
  lastAccessedLessonTitle?: string;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  courseId: string;
  lessonId: string;
  attemptNumber: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  isPassed: boolean;
  timeSpentSeconds?: number;
  timestamp: string;
}

export type ActivityType = 
  | 'lesson_completed' 
  | 'practice_done' 
  | 'quiz_passed' 
  | 'quiz_attempted' 
  | 'typing_drill' 
  | 'note_saved' 
  | 'lesson_bookmarked';

export interface CompletedActivity {
  id: string;
  type: ActivityType;
  title: string;
  titleBn?: string;
  courseId?: string;
  courseTitle?: string;
  lessonId?: string;
  lessonTitle?: string;
  details?: string;
  timestamp: string; // ISO or relative human string
}

export interface LastVisitedLesson {
  courseId: string;
  courseTitle: string;
  courseTitleBn?: string;
  moduleId: string;
  moduleTitle: string;
  moduleTitleBn?: string;
  lessonId: string;
  lessonTitle: string;
  lessonTitleBn?: string;
  visitedAt: string;
}

export interface ContinueLearningState {
  hasTarget: boolean;
  courseId: string;
  courseTitle: string;
  courseTitleBn?: string;
  lessonId: string;
  lessonTitle: string;
  lessonTitleBn?: string;
  moduleTitle?: string;
  moduleTitleBn?: string;
  estimatedMinutes: number;
  progressPercent: number;
  isCompleted: boolean;
  lastVisitedAt: string;
}

export interface StreakInfo {
  currentStreakDays: number;
  longestStreakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalDaysActive: number;
}

export interface RecommendedActivity {
  id: string;
  type: 'next_lesson' | 'quiz_review' | 'typing_practice' | 'practice_lab';
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  courseId?: string;
  lessonId?: string;
  badge: string;
  actionTextEn: string;
  actionTextBn: string;
}

export interface ContentSearchResult {
  courseId: string;
  courseTitle: string;
  courseTitleBn: string;
  moduleId: string;
  moduleTitle: string;
  moduleTitleBn: string;
  lessonId: string;
  lessonTitle: string;
  lessonTitleBn: string;
  matchType: 'lesson_title' | 'summary' | 'objective' | 'concept_block' | 'key_terms' | 'shortcut';
  matchSnippet: string;
  matchSnippetBn?: string;
}

