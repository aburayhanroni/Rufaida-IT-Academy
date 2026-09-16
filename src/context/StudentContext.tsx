import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  StudentUser, 
  CourseEnrollment, 
  EnrollmentStatus, 
  Course, 
  TypingStats, 
  LessonNote, 
  LessonBookmark, 
  QuizResultRecord, 
  Language,
  CourseProgressRecord,
  QuizAttempt,
  CompletedActivity,
  LastVisitedLesson,
  ContinueLearningState,
  StreakInfo,
  ContentSearchResult
} from '../types';
import { COURSES_DATA } from '../data/coursesData';
import { 
  calculateCourseProgress, 
  resolveContinueLearningState, 
  calculateStreak, 
  searchCourseContent 
} from '../services/progressService';

export type ActiveView = 
  | 'landing' 
  | 'catalog' 
  | 'course_details' 
  | 'my_courses' 
  | 'dashboard' 
  | 'lesson' 
  | 'typing' 
  | 'login' 
  | 'register';

interface StudentContextType {
  user: StudentUser;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAuthenticated: boolean;
  loginStudent: (identifier: string, name?: string, district?: string) => boolean;
  registerStudent: (data: { name: string; nameBn?: string; district: string; email?: string; phone?: string; studentClass?: string }) => void;
  logoutStudent: () => void;
  enrollments: Record<string, CourseEnrollment>;
  enrollCourse: (courseId: string, customStatus?: EnrollmentStatus) => CourseEnrollment;
  updateEnrollmentStatus: (courseId: string, status: EnrollmentStatus, reason?: string) => void;
  unenrollCourse: (courseId: string) => void;
  markLessonCompleted: (courseId: string, lessonId: string) => void;
  setLastAccessedLesson: (courseId: string, lessonId: string) => void;
  typingStats: TypingStats;
  recordTypingSession: (
    drillName: string, 
    wpm: number, 
    accuracy: number, 
    errors: number, 
    minutes: number, 
    category?: string, 
    durationSeconds?: number
  ) => { isNewPersonalBest: boolean; personalBest: TypingStats['personalBest'] };
  notes: LessonNote[];
  saveNote: (courseId: string, lessonId: string, text: string) => void;
  deleteNote: (noteId: string) => void;
  bookmarks: LessonBookmark[];
  toggleBookmark: (courseId: string, lessonId: string, lessonTitle: string) => void;
  removeBookmark: (courseId: string, lessonId: string) => void;
  quizResults: QuizResultRecord[];
  recordQuizResult: (result: Omit<QuizResultRecord, 'id' | 'date'>) => void;
  
  // Progress & Activity Tracking
  courseProgressRecords: Record<string, CourseProgressRecord>;
  quizAttempts: QuizAttempt[];
  completedActivities: CompletedActivity[];
  recordActivity: (activity: Omit<CompletedActivity, 'id' | 'timestamp'>) => void;
  lastVisitedLesson: LastVisitedLesson | null;
  setLastVisitedLessonRecord: (courseId: string, lessonId: string) => void;
  continueLearningState: ContinueLearningState;
  streakInfo: StreakInfo;

  // Search
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: ContentSearchResult[];
  navigateToContentMatch: (result: ContentSearchResult) => void;

  switchUser: (updatedUser: Partial<StudentUser>) => void;
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  viewCourseDetails: (courseId: string) => void;
  showOrgModal: boolean;
  setShowOrgModal: (show: boolean) => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  showEnrollmentModal: boolean;
  setShowEnrollmentModal: (show: boolean) => void;
  courseToEnroll: Course | null;
  openEnrollmentModal: (course: Course) => void;
  closeEnrollmentModal: () => void;
}

const DEFAULT_USER: StudentUser = {
  id: 'std_01',
  name: 'Tanvir Ahmed',
  nameBn: 'তানভীর আহমেদ',
  studentId: 'BD-2026-8921',
  email: 'tanvir.learner@bdmail.com',
  phone: '+880 1712-345678',
  district: 'Dhaka',
  joinedDate: 'January 2026',
  accountType: 'independent',
  connectedInstitution: null // Student owns their account; institution is optional
};

const INITIAL_ENROLLMENTS: Record<string, CourseEnrollment> = {
  'basic-computer': {
    id: 'ENR-BD-2026-8921-basic-computer',
    studentId: 'BD-2026-8921',
    studentName: 'Tanvir Ahmed',
    courseId: 'basic-computer',
    status: 'active',
    statusReason: 'Independent self-enrollment',
    enrolledAt: '2026-02-10',
    completedLessonIds: ['bc-1', 'bc-2'],
    lastAccessedLessonId: 'bc-3',
    lastAccessedAt: 'Today',
    progressPercent: 12,
    quizScores: {
      'bc-1': 100,
      'bc-2': 100
    }
  }
};

const INITIAL_TYPING_STATS: TypingStats = {
  wpm: 24,
  accuracy: 94,
  errorCount: 3,
  drillsCompleted: 5,
  totalPracticeMinutes: 45,
  personalBest: {
    wpm: 28,
    accuracy: 96,
    drillTitle: 'Home Row Anchor Keys (F and J)',
    category: 'home_row',
    achievedAt: 'Yesterday'
  },
  history: [
    { id: 'th-1', date: 'Yesterday', drillName: '1. Home Row Anchor Keys', category: 'home_row', wpm: 28, accuracy: 96, errors: 1, durationSeconds: 65 },
    { id: 'th-2', date: 'Today', drillName: '2. Left Hand Home Row', category: 'home_row', wpm: 24, accuracy: 94, errors: 3, durationSeconds: 72 }
  ]
};

const INITIAL_STREAK: StreakInfo = {
  currentStreakDays: 4,
  longestStreakDays: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalDaysActive: 12
};

const INITIAL_ACTIVITIES: CompletedActivity[] = [
  {
    id: 'act-1',
    type: 'quiz_passed',
    title: 'Passed Assessment: What is a Computer?',
    titleBn: 'পরীক্ষায় উত্তীর্ণ: কম্পিউটার কী ও কীভাবে কাজ করে?',
    courseId: 'basic-computer',
    courseTitle: 'Basic Computer & Operating Essentials',
    lessonId: 'bc-1',
    lessonTitle: '1. What is a Computer and How Does It Work?',
    details: 'Scored 100% (2/2 questions)',
    timestamp: 'Today'
  },
  {
    id: 'act-2',
    type: 'lesson_completed',
    title: 'Completed Lesson: Hardware vs Software Anatomy',
    titleBn: 'পাঠ সম্পন্ন: হার্ডওয়্যার বনাম সফটওয়্যার',
    courseId: 'basic-computer',
    courseTitle: 'Basic Computer & Operating Essentials',
    lessonId: 'bc-2',
    lessonTitle: '2. Hardware vs Software: Understanding the Anatomy of a PC',
    details: 'Finished Learn & Interactive Lab',
    timestamp: 'Today'
  },
  {
    id: 'act-3',
    type: 'typing_drill',
    title: 'Mastered Drill: Home Row Anchor Keys',
    titleBn: 'টাইপিং ড্রিল সম্পন্ন: হোম রো কী',
    details: '28 WPM • 96% Accuracy',
    timestamp: 'Yesterday'
  }
];

const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'qa-1',
    quizId: 'quiz-bc-1',
    quizTitle: 'What is a Computer? Quiz',
    courseId: 'basic-computer',
    lessonId: 'bc-1',
    attemptNumber: 1,
    score: 2,
    totalQuestions: 2,
    percentage: 100,
    isPassed: true,
    timeSpentSeconds: 45,
    timestamp: '2026-02-12'
  },
  {
    id: 'qa-2',
    quizId: 'quiz-bc-2',
    quizTitle: 'Hardware vs Software Assessment',
    courseId: 'basic-computer',
    lessonId: 'bc-2',
    attemptNumber: 1,
    score: 2,
    totalQuestions: 2,
    percentage: 100,
    isPassed: true,
    timeSpentSeconds: 52,
    timestamp: '2026-02-13'
  }
];

const INITIAL_LAST_VISITED: LastVisitedLesson = {
  courseId: 'basic-computer',
  courseTitle: 'Basic Computer & Operating Essentials',
  courseTitleBn: 'মৌলিক কম্পিউটার ও অপারেটিং সিস্টেমের ব্যবহার',
  moduleId: 'bc-mod-1',
  moduleTitle: 'Module 1: Computer Hardware & Essentials',
  moduleTitleBn: 'মডিউল ১: কম্পিউটার হার্ডওয়্যার ও প্রাথমিক ধারণা',
  lessonId: 'bc-3',
  lessonTitle: '3. Input, Output, and Storage Devices',
  lessonTitleBn: '৩. ইনপুট, আউটপুট ও স্টোরেজ ডিভাইসের পরিচয়',
  visitedAt: 'Today'
};

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or fall back to defaults
  const [user, setUser] = useState<StudentUser>(() => {
    const saved = localStorage.getItem('shikkha_student_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('shikkha_lang');
    return (saved as Language) || 'en';
  });

  const [enrollments, setEnrollments] = useState<Record<string, CourseEnrollment>>(() => {
    const saved = localStorage.getItem('shikkha_enrollments');
    if (!saved) return INITIAL_ENROLLMENTS;
    try {
      const parsed = JSON.parse(saved) as Record<string, CourseEnrollment>;
      // Normalize any older records that lack new schema properties
      const normalized: Record<string, CourseEnrollment> = {};
      Object.entries(parsed).forEach(([cId, item]) => {
        normalized[cId] = {
          ...item,
          id: item.id || `ENR-${DEFAULT_USER.studentId}-${cId}`,
          studentId: item.studentId || DEFAULT_USER.studentId,
          studentName: item.studentName || DEFAULT_USER.name,
          status: item.status || (item.progressPercent === 100 ? 'completed' : 'active'),
          statusReason: item.statusReason || 'Independent self-enrollment'
        };
      });
      return normalized;
    } catch (e) {
      return INITIAL_ENROLLMENTS;
    }
  });

  const [typingStats, setTypingStats] = useState<TypingStats>(() => {
    const saved = localStorage.getItem('shikkha_typing_stats');
    if (!saved) return INITIAL_TYPING_STATS;
    try {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_TYPING_STATS,
        ...parsed,
        personalBest: parsed.personalBest || INITIAL_TYPING_STATS.personalBest,
        history: Array.isArray(parsed.history) ? parsed.history : INITIAL_TYPING_STATS.history
      };
    } catch {
      return INITIAL_TYPING_STATS;
    }
  });

  const [notes, setNotes] = useState<LessonNote[]>(() => {
    const saved = localStorage.getItem('shikkha_notes');
    return saved ? JSON.parse(saved) : [
      {
        id: 'note-1',
        courseId: 'basic-computer',
        lessonId: 'bc-1',
        text: 'Remember: IPOS stands for Input -> Processing -> Output -> Storage. Central to everything!',
        updatedAt: '2026-02-12'
      }
    ];
  });

  const [bookmarks, setBookmarks] = useState<LessonBookmark[]>(() => {
    const saved = localStorage.getItem('shikkha_bookmarks');
    return saved ? JSON.parse(saved) : [
      {
        courseId: 'basic-computer',
        lessonId: 'bc-5',
        lessonTitle: '5. Keyboard Keys and Shortcuts',
        bookmarkedAt: '2026-02-14'
      }
    ];
  });

  const [quizResults, setQuizResults] = useState<QuizResultRecord[]>(() => {
    const saved = localStorage.getItem('shikkha_quiz_results');
    return saved ? JSON.parse(saved) : [
      {
        id: 'qr-1',
        quizTitle: 'What is a Computer? Quiz',
        courseId: 'basic-computer',
        lessonId: 'bc-1',
        score: 2,
        total: 2,
        percentage: 100,
        date: '2026-02-12',
        answers: []
      }
    ];
  });

  // Conceptual Student Personal Learning Progress Tracking State
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('shikkha_quiz_attempts');
    return saved ? JSON.parse(saved) : INITIAL_QUIZ_ATTEMPTS;
  });

  const [completedActivities, setCompletedActivities] = useState<CompletedActivity[]>(() => {
    const saved = localStorage.getItem('shikkha_completed_activities');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
  });

  const [lastVisitedLesson, setLastVisitedLesson] = useState<LastVisitedLesson | null>(() => {
    const saved = localStorage.getItem('shikkha_last_visited');
    return saved ? JSON.parse(saved) : INITIAL_LAST_VISITED;
  });

  const [streakInfo, setStreakInfo] = useState<StreakInfo>(() => {
    const saved = localStorage.getItem('shikkha_streak_info');
    return saved ? JSON.parse(saved) : INITIAL_STREAK;
  });

  // Content Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('shikkha_is_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('landing');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('basic-computer');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<Course | null>(null);

  const openEnrollmentModal = (course: Course) => {
    setCourseToEnroll(course);
    setShowEnrollmentModal(true);
  };

  const closeEnrollmentModal = () => {
    setShowEnrollmentModal(false);
    setCourseToEnroll(null);
  };

  useEffect(() => {
    localStorage.setItem('shikkha_is_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const viewCourseDetails = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveView('course_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginStudent = (identifier: string, name?: string, district?: string) => {
    setIsAuthenticated(true);
    if (name) {
      setUser(prev => ({
        ...prev,
        name,
        email: identifier.includes('@') ? identifier : prev.email,
        studentId: identifier.startsWith('BD-') ? identifier : prev.studentId,
        district: district || prev.district
      }));
    }
    return true;
  };

  const registerStudent = (data: { name: string; nameBn?: string; district: string; email?: string; phone?: string; studentClass?: string }) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newStudentId = `BD-2026-${randomNum}`;
    const newUser: StudentUser = {
      id: `std_${Date.now()}`,
      name: data.name,
      nameBn: data.nameBn,
      studentId: newStudentId,
      email: data.email || `${data.name.toLowerCase().replace(/\s+/g, '')}@rufaidah.academy`,
      phone: data.phone || '+880 1700-000000',
      district: data.district,
      joinedDate: 'September 2026',
      accountType: 'independent',
      connectedInstitution: null
    };

    setUser(newUser);
    setIsAuthenticated(true);

    // Auto-enroll in basic-computer if not already
    if (!enrollments['basic-computer']) {
      enrollCourse('basic-computer');
    }
  };

  const logoutStudent = () => {
    setIsAuthenticated(false);
    setActiveView('landing');
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shikkha_student_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('shikkha_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('shikkha_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  useEffect(() => {
    localStorage.setItem('shikkha_typing_stats', JSON.stringify(typingStats));
  }, [typingStats]);

  useEffect(() => {
    localStorage.setItem('shikkha_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('shikkha_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('shikkha_quiz_results', JSON.stringify(quizResults));
  }, [quizResults]);

  useEffect(() => {
    localStorage.setItem('shikkha_quiz_attempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('shikkha_completed_activities', JSON.stringify(completedActivities));
  }, [completedActivities]);

  useEffect(() => {
    if (lastVisitedLesson) {
      localStorage.setItem('shikkha_last_visited', JSON.stringify(lastVisitedLesson));
    }
  }, [lastVisitedLesson]);

  useEffect(() => {
    localStorage.setItem('shikkha_streak_info', JSON.stringify(streakInfo));
  }, [streakInfo]);

  // Activity logger helper
  const recordActivity = useCallback((act: Omit<CompletedActivity, 'id' | 'timestamp'>) => {
    const newAct: CompletedActivity = {
      ...act,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Just now'
    };

    setCompletedActivities(prev => [newAct, ...prev.slice(0, 49)]);
    setStreakInfo(prev => calculateStreak(prev));
  }, []);

  // Update last visited lesson for breadcrumb and Continue Learning resume
  const setLastVisitedLessonRecord = useCallback((courseId: string, lessonId: string) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course) return;

    let targetMod = null;
    let targetLes = null;

    for (const m of course.modules) {
      const found = m.lessons.find(l => l.id === lessonId);
      if (found) {
        targetMod = m;
        targetLes = found;
        break;
      }
    }

    if (!targetLes || !targetMod) return;

    const record: LastVisitedLesson = {
      courseId: course.id,
      courseTitle: course.titleEn,
      courseTitleBn: course.titleBn,
      moduleId: targetMod.id,
      moduleTitle: targetMod.titleEn,
      moduleTitleBn: targetMod.titleBn,
      lessonId: targetLes.id,
      lessonTitle: targetLes.titleEn,
      lessonTitleBn: targetLes.titleBn,
      visitedAt: 'Just now'
    };

    setLastVisitedLesson(record);
    setStreakInfo(prev => calculateStreak(prev));
  }, []);

  // Compute course progress records with module breakdown dynamically
  const courseProgressRecords = useMemo(() => {
    const records: Record<string, CourseProgressRecord> = {};
    Object.keys(enrollments).forEach(courseId => {
      const course = COURSES_DATA.find(c => c.id === courseId);
      const enr = enrollments[courseId];
      if (course && enr) {
        records[courseId] = calculateCourseProgress(
          course,
          enr.completedLessonIds,
          enr.lastAccessedLessonId,
          enr.lastAccessedAt
        );
      }
    });
    return records;
  }, [enrollments]);

  // Compute continue learning state
  const continueLearningState = useMemo(() => {
    return resolveContinueLearningState(COURSES_DATA, enrollments, lastVisitedLesson);
  }, [enrollments, lastVisitedLesson]);

  // Compute search results
  const searchResults = useMemo(() => {
    return searchCourseContent(searchQuery, COURSES_DATA);
  }, [searchQuery]);

  const navigateToContentMatch = useCallback((result: ContentSearchResult) => {
    // If not enrolled in this course, enroll them first so progress can be tracked
    if (!enrollments[result.courseId]) {
      enrollCourse(result.courseId);
    }
    setSelectedCourseId(result.courseId);
    setSelectedLessonId(result.lessonId);
    setLastVisitedLessonRecord(result.courseId, result.lessonId);
    setActiveView('lesson');
    setIsSearchOpen(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [enrollments, setLastVisitedLessonRecord]);

  const enrollCourse = (courseId: string, customStatus?: EnrollmentStatus): CourseEnrollment => {
    if (enrollments[courseId]) {
      if (customStatus && enrollments[courseId].status !== customStatus) {
        const updated: CourseEnrollment = {
          ...enrollments[courseId],
          status: customStatus,
          statusReason: 'Status updated by student'
        };
        setEnrollments(prev => ({ ...prev, [courseId]: updated }));
        return updated;
      }
      return enrollments[courseId];
    }
    const course = COURSES_DATA.find(c => c.id === courseId);
    const firstLessonId = course?.modules[0]?.lessons[0]?.id;

    const newEnrollment: CourseEnrollment = {
      id: `ENR-${user.studentId}-${courseId}`,
      studentId: user.studentId,
      studentName: user.name,
      courseId,
      status: customStatus || 'active',
      statusReason: 'Independent self-enrollment',
      enrolledAt: new Date().toISOString().split('T')[0],
      completedLessonIds: [],
      lastAccessedLessonId: firstLessonId,
      lastAccessedAt: 'Just now',
      progressPercent: 0,
      quizScores: {}
    };

    setEnrollments(prev => ({ ...prev, [courseId]: newEnrollment }));

    // Record activity
    recordActivity({
      type: 'lesson_completed',
      title: `Enrolled in ${course?.titleEn || courseId}`,
      titleBn: `${course?.titleBn || courseId} কোর্সে ভর্তি হয়েছেন`,
      courseId,
      courseTitle: course?.titleEn,
      details: 'Self-enrolled in curriculum'
    });

    return newEnrollment;
  };

  const updateEnrollmentStatus = (courseId: string, status: EnrollmentStatus, reason?: string) => {
    setEnrollments(prev => {
      const existing = prev[courseId];
      if (!existing) return prev;
      return {
        ...prev,
        [courseId]: {
          ...existing,
          status,
          statusReason: reason || (status === 'completed' ? 'All lessons completed' : `Status changed to ${status}`),
          completedAt: status === 'completed' ? (existing.completedAt || new Date().toISOString().split('T')[0]) : existing.completedAt
        }
      };
    });
  };

  const unenrollCourse = (courseId: string) => {
    setEnrollments(prev => {
      const copy = { ...prev };
      delete copy[courseId];
      return copy;
    });
  };

  const markLessonCompleted = (courseId: string, lessonId: string) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    let lessonTitleEn = lessonId;
    let lessonTitleBn = lessonId;

    if (course) {
      for (const m of course.modules) {
        const found = m.lessons.find(l => l.id === lessonId);
        if (found) {
          lessonTitleEn = found.titleEn;
          lessonTitleBn = found.titleBn;
          break;
        }
      }
    }

    setEnrollments(prev => {
      const existing: CourseEnrollment = prev[courseId] || {
        id: `ENR-${user.studentId}-${courseId}`,
        studentId: user.studentId,
        studentName: user.name,
        courseId,
        status: 'active',
        statusReason: 'Independent self-enrollment',
        enrolledAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        lastAccessedLessonId: lessonId,
        lastAccessedAt: 'Just now',
        progressPercent: 0,
        quizScores: {}
      };

      const completed = existing.completedLessonIds.includes(lessonId)
        ? existing.completedLessonIds
        : [...existing.completedLessonIds, lessonId];

      const totalLessons = course?.totalLessons || 1;
      const progressPercent = Math.min(100, Math.round((completed.length / totalLessons) * 100));
      const isNowCompleted = progressPercent === 100;

      return {
        ...prev,
        [courseId]: {
          ...existing,
          completedLessonIds: completed,
          progressPercent,
          status: isNowCompleted ? 'completed' : existing.status,
          completedAt: isNowCompleted ? (existing.completedAt || new Date().toISOString().split('T')[0]) : existing.completedAt,
          lastAccessedAt: 'Just now',
          lastAccessedLessonId: lessonId
        }
      };
    });

    // Record completed activity
    recordActivity({
      type: 'lesson_completed',
      title: `Completed Lesson: ${lessonTitleEn}`,
      titleBn: `পাঠ সম্পন্ন: ${lessonTitleBn}`,
      courseId,
      courseTitle: course?.titleEn,
      lessonId,
      lessonTitle: lessonTitleEn,
      details: 'All stages finished'
    });

    setLastVisitedLessonRecord(courseId, lessonId);
  };

  const setLastAccessedLesson = (courseId: string, lessonId: string) => {
    setEnrollments(prev => {
      const existing: CourseEnrollment = prev[courseId] || {
        id: `ENR-${user.studentId}-${courseId}`,
        studentId: user.studentId,
        studentName: user.name,
        courseId,
        status: 'active',
        statusReason: 'Independent self-enrollment',
        enrolledAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        lastAccessedLessonId: lessonId,
        lastAccessedAt: 'Just now',
        progressPercent: 0,
        quizScores: {}
      };

      return {
        ...prev,
        [courseId]: {
          ...existing,
          lastAccessedLessonId: lessonId,
          lastAccessedAt: 'Just now'
        }
      };
    });

    setLastVisitedLessonRecord(courseId, lessonId);
  };

  const recordTypingSession = (
    drillName: string, 
    wpm: number, 
    accuracy: number, 
    errors: number, 
    minutes: number, 
    category?: string, 
    durationSeconds?: number
  ): { isNewPersonalBest: boolean; personalBest: TypingStats['personalBest'] } => {
    let isNewPersonalBest = false;
    let newPb: TypingStats['personalBest'] = typingStats.personalBest;

    setTypingStats(prev => {
      const currentPb = prev.personalBest || { wpm: 0, accuracy: 0, achievedAt: 'Never' };
      if (wpm > currentPb.wpm || (wpm === currentPb.wpm && accuracy > currentPb.accuracy)) {
        isNewPersonalBest = true;
        newPb = {
          wpm,
          accuracy,
          drillTitle: drillName,
          category: category || 'practice',
          achievedAt: 'Just now'
        };
      } else {
        newPb = currentPb;
      }

      const newHistoryItem = {
        id: `th-${Date.now()}`,
        date: 'Just now',
        drillName,
        category: category || 'practice',
        wpm,
        accuracy,
        errors,
        durationSeconds: durationSeconds || Math.round(minutes * 60)
      };

      const newHistory = [
        newHistoryItem,
        ...prev.history.slice(0, 19)
      ];

      const avgWpm = Math.round((prev.wpm * prev.drillsCompleted + wpm) / (prev.drillsCompleted + 1));
      const avgAcc = Math.round((prev.accuracy * prev.drillsCompleted + accuracy) / (prev.drillsCompleted + 1));

      return {
        wpm: avgWpm,
        accuracy: avgAcc,
        errorCount: errors,
        drillsCompleted: prev.drillsCompleted + 1,
        totalPracticeMinutes: prev.totalPracticeMinutes + Math.max(1, Math.round(minutes)),
        personalBest: newPb,
        history: newHistory
      };
    });

    recordActivity({
      type: 'typing_drill',
      title: `Typing Practice: ${drillName}`,
      titleBn: `টাইপিং অনুশীলন: ${drillName}`,
      details: `${wpm} WPM • ${accuracy}% accuracy • ${errors} errors`
    });

    return { isNewPersonalBest, personalBest: newPb };
  };

  const saveNote = (courseId: string, lessonId: string, text: string) => {
    const course = COURSES_DATA.find(c => c.id === courseId);
    let lessonTitle = lessonId;
    if (course) {
      for (const m of course.modules) {
        const found = m.lessons.find(l => l.id === lessonId);
        if (found) {
          lessonTitle = found.titleEn;
          break;
        }
      }
    }

    setNotes(prev => {
      const filtered = prev.filter(n => !(n.courseId === courseId && n.lessonId === lessonId));
      if (!text.trim()) return filtered;
      return [
        {
          id: `note-${Date.now()}`,
          courseId,
          lessonId,
          text,
          updatedAt: new Date().toISOString().split('T')[0]
        },
        ...filtered
      ];
    });

    if (text.trim()) {
      recordActivity({
        type: 'note_saved',
        title: `Saved Note on ${lessonTitle}`,
        titleBn: `${lessonTitle} পাঠে নোট সংরক্ষণ করেছেন`,
        courseId,
        lessonId,
        details: text.length > 50 ? `${text.substring(0, 50)}...` : text
      });
    }
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(n => n.id !== noteId));
  };

  const toggleBookmark = (courseId: string, lessonId: string, lessonTitle: string) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.courseId === courseId && b.lessonId === lessonId);
      if (exists) {
        return prev.filter(b => !(b.courseId === courseId && b.lessonId === lessonId));
      } else {
        recordActivity({
          type: 'lesson_bookmarked',
          title: `Bookmarked: ${lessonTitle}`,
          titleBn: `বুকমার্ক করা হয়েছে: ${lessonTitle}`,
          courseId,
          lessonId,
          details: 'Added to your study revision shelf'
        });

        return [
          {
            courseId,
            lessonId,
            lessonTitle,
            bookmarkedAt: new Date().toISOString().split('T')[0]
          },
          ...prev
        ];
      }
    });
  };

  const removeBookmark = (courseId: string, lessonId: string) => {
    setBookmarks(prev => prev.filter(b => !(b.courseId === courseId && b.lessonId === lessonId)));
  };

  const recordQuizResult = (result: Omit<QuizResultRecord, 'id' | 'date'>) => {
    const record: QuizResultRecord = {
      ...result,
      id: `quiz-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    setQuizResults(prev => [record, ...prev]);

    // Conceptual Quiz Attempt tracking
    setQuizAttempts(prev => {
      const priorAttempts = prev.filter(q => q.courseId === result.courseId && q.lessonId === result.lessonId);
      const attemptNum = priorAttempts.length + 1;
      const isPassed = result.percentage >= 60;

      const newAttempt: QuizAttempt = {
        id: `qa-${Date.now()}`,
        quizId: `quiz-${result.lessonId}`,
        quizTitle: result.quizTitle,
        courseId: result.courseId,
        lessonId: result.lessonId,
        attemptNumber: attemptNum,
        score: result.score,
        totalQuestions: result.total,
        percentage: result.percentage,
        isPassed,
        timestamp: new Date().toISOString().split('T')[0]
      };

      return [newAttempt, ...prev];
    });

    // Record activity
    recordActivity({
      type: result.percentage >= 60 ? 'quiz_passed' : 'quiz_attempted',
      title: `${result.percentage >= 60 ? 'Passed' : 'Attempted'}: ${result.quizTitle}`,
      titleBn: `${result.percentage >= 60 ? 'উত্তীর্ণ' : 'অংশগ্রহণ'}: ${result.quizTitle}`,
      courseId: result.courseId,
      lessonId: result.lessonId,
      details: `Score: ${result.score}/${result.total} (${result.percentage}%)`
    });

    // Also record score in enrollment
    setEnrollments(prev => {
      const existing: CourseEnrollment = prev[result.courseId] || {
        id: `ENR-${user.studentId}-${result.courseId}`,
        studentId: user.studentId,
        studentName: user.name,
        courseId: result.courseId,
        status: 'active',
        statusReason: 'Independent self-enrollment',
        enrolledAt: new Date().toISOString().split('T')[0],
        completedLessonIds: [],
        lastAccessedLessonId: result.lessonId,
        lastAccessedAt: 'Just now',
        progressPercent: 0,
        quizScores: {}
      };

      return {
        ...prev,
        [result.courseId]: {
          ...existing,
          quizScores: {
            ...existing.quizScores,
            [result.lessonId]: result.percentage
          }
        }
      };
    });
  };

  const switchUser = (updatedUser: Partial<StudentUser>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };

  return (
    <StudentContext.Provider
      value={{
        user,
        language,
        setLanguage,
        isAuthenticated,
        loginStudent,
        registerStudent,
        logoutStudent,
        enrollments,
        enrollCourse,
        updateEnrollmentStatus,
        unenrollCourse,
        markLessonCompleted,
        setLastAccessedLesson,
        typingStats,
        recordTypingSession,
        notes,
        saveNote,
        deleteNote,
        bookmarks,
        toggleBookmark,
        removeBookmark,
        quizResults,
        recordQuizResult,
        courseProgressRecords,
        quizAttempts,
        completedActivities,
        recordActivity,
        lastVisitedLesson,
        setLastVisitedLessonRecord,
        continueLearningState,
        streakInfo,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        navigateToContentMatch,
        switchUser,
        isOfflineMode,
        toggleOfflineMode,
        activeView,
        setActiveView,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        viewCourseDetails,
        showOrgModal,
        setShowOrgModal,
        showAuthModal,
        setShowAuthModal,
        showEnrollmentModal,
        setShowEnrollmentModal,
        courseToEnroll,
        openEnrollmentModal,
        closeEnrollmentModal
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
};
