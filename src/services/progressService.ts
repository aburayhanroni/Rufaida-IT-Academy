import { 
  Course, 
  CourseEnrollment, 
  ModuleProgress, 
  CourseProgressRecord, 
  LastVisitedLesson, 
  ContinueLearningState, 
  QuizAttempt, 
  TypingStats, 
  RecommendedActivity, 
  ContentSearchResult, 
  StreakInfo 
} from '../types';

/**
 * Calculates granular module / chapter progress for a given course.
 * Kept strictly decoupled from UI rendering and enrollment data.
 */
export function calculateModuleProgress(
  course: Course, 
  completedLessonIds: string[] = []
): Record<string, ModuleProgress> {
  const result: Record<string, ModuleProgress> = {};

  if (!course?.modules) return result;

  course.modules.forEach(mod => {
    const total = mod.lessons.length;
    const completed = mod.lessons.filter(les => completedLessonIds.includes(les.id)).length;
    const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    result[mod.id] = {
      moduleId: mod.id,
      moduleNumber: mod.moduleNumber,
      titleEn: mod.titleEn,
      titleBn: mod.titleBn,
      totalLessons: total,
      completedLessons: completed,
      progressPercent: percent,
      isCompleted: total > 0 && completed === total
    };
  });

  return result;
}

/**
 * Calculates a complete Course Progress Record with module-level breakdown.
 */
export function calculateCourseProgress(
  course: Course,
  completedLessonIds: string[] = [],
  lastAccessedLessonId?: string,
  lastAccessedAt: string = 'Today'
): CourseProgressRecord {
  const totalLessons = course.totalLessons || (course.modules ? course.modules.reduce((acc, m) => acc + m.lessons.length, 0) : 1);
  const completedLessonsCount = completedLessonIds.length;
  const progressPercent = Math.min(100, Math.round((completedLessonsCount / totalLessons) * 100));
  const moduleProgress = calculateModuleProgress(course, completedLessonIds);

  // Find title of last accessed lesson
  let lastAccessedLessonTitle: string | undefined;
  if (lastAccessedLessonId && course.modules) {
    for (const mod of course.modules) {
      const les = mod.lessons.find(l => l.id === lastAccessedLessonId);
      if (les) {
        lastAccessedLessonTitle = les.titleEn;
        break;
      }
    }
  }

  return {
    courseId: course.id,
    totalLessons,
    completedLessonsCount,
    progressPercent,
    completedLessonIds,
    moduleProgress,
    lastAccessedLessonId,
    lastAccessedLessonTitle,
    lastAccessedAt,
    completedAt: progressPercent === 100 ? new Date().toISOString().split('T')[0] : undefined
  };
}

/**
 * Calculates platform-wide aggregated learning progress.
 */
export function calculateOverallProgress(
  courses: Course[],
  enrollments: Record<string, CourseEnrollment>
): {
  totalLessons: number;
  completedLessons: number;
  overallPercent: number;
  completedCoursesCount: number;
} {
  const enrolledCourseIds = Object.keys(enrollments);
  let totalLessons = 0;
  let completedLessons = 0;
  let completedCoursesCount = 0;

  enrolledCourseIds.forEach(cId => {
    const course = courses.find(c => c.id === cId);
    const enrollment = enrollments[cId];
    if (course && enrollment) {
      const courseTotal = course.totalLessons || course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
      totalLessons += courseTotal;
      completedLessons += enrollment.completedLessonIds.length;
      if (enrollment.progressPercent === 100 || enrollment.status === 'completed') {
        completedCoursesCount += 1;
      }
    }
  });

  const overallPercent = totalLessons > 0 ? Math.min(100, Math.round((completedLessons / totalLessons) * 100)) : 0;

  return {
    totalLessons,
    completedLessons,
    overallPercent,
    completedCoursesCount
  };
}

/**
 * Resolves the Continue Learning state so the student can resume immediately.
 */
export function resolveContinueLearningState(
  courses: Course[],
  enrollments: Record<string, CourseEnrollment>,
  lastVisited?: LastVisitedLesson | null
): ContinueLearningState {
  const defaultState: ContinueLearningState = {
    hasTarget: false,
    courseId: '',
    courseTitle: '',
    lessonId: '',
    lessonTitle: '',
    estimatedMinutes: 15,
    progressPercent: 0,
    isCompleted: false,
    lastVisitedAt: 'Never'
  };

  const enrolledCourseIds = Object.keys(enrollments);
  if (enrolledCourseIds.length === 0) return defaultState;

  // 1. If student recently visited a lesson in an enrolled course, resume that
  if (lastVisited && enrollments[lastVisited.courseId]) {
    const course = courses.find(c => c.id === lastVisited.courseId);
    if (course) {
      const enrollment = enrollments[lastVisited.courseId];
      const isCompleted = enrollment.completedLessonIds.includes(lastVisited.lessonId);
      
      let estMinutes = 15;
      course.modules?.forEach(m => {
        const found = m.lessons.find(l => l.id === lastVisited.lessonId);
        if (found) estMinutes = found.estimatedMinutes;
      });

      return {
        hasTarget: true,
        courseId: course.id,
        courseTitle: course.titleEn,
        courseTitleBn: course.titleBn,
        lessonId: lastVisited.lessonId,
        lessonTitle: lastVisited.lessonTitle,
        lessonTitleBn: lastVisited.lessonTitleBn,
        moduleTitle: lastVisited.moduleTitle,
        moduleTitleBn: lastVisited.moduleTitleBn,
        estimatedMinutes: estMinutes,
        progressPercent: enrollment.progressPercent,
        isCompleted,
        lastVisitedAt: lastVisited.visitedAt
      };
    }
  }

  // 2. Otherwise pick active enrollment's last accessed or first incomplete lesson
  for (const cId of enrolledCourseIds) {
    const course = courses.find(c => c.id === cId);
    const enrollment = enrollments[cId];
    if (!course || !enrollment) continue;

    // Look for last accessed lesson
    const targetLessonId = enrollment.lastAccessedLessonId;
    if (targetLessonId) {
      for (const m of course.modules) {
        const les = m.lessons.find(l => l.id === targetLessonId);
        if (les) {
          return {
            hasTarget: true,
            courseId: course.id,
            courseTitle: course.titleEn,
            courseTitleBn: course.titleBn,
            lessonId: les.id,
            lessonTitle: les.titleEn,
            lessonTitleBn: les.titleBn,
            moduleTitle: m.titleEn,
            moduleTitleBn: m.titleBn,
            estimatedMinutes: les.estimatedMinutes,
            progressPercent: enrollment.progressPercent,
            isCompleted: enrollment.completedLessonIds.includes(les.id),
            lastVisitedAt: enrollment.lastAccessedAt || 'Recently'
          };
        }
      }
    }

    // Otherwise find first incomplete lesson
    for (const m of course.modules) {
      for (const les of m.lessons) {
        if (!enrollment.completedLessonIds.includes(les.id)) {
          return {
            hasTarget: true,
            courseId: course.id,
            courseTitle: course.titleEn,
            courseTitleBn: course.titleBn,
            lessonId: les.id,
            lessonTitle: les.titleEn,
            lessonTitleBn: les.titleBn,
            moduleTitle: m.titleEn,
            moduleTitleBn: m.titleBn,
            estimatedMinutes: les.estimatedMinutes,
            progressPercent: enrollment.progressPercent,
            isCompleted: false,
            lastVisitedAt: enrollment.lastAccessedAt || 'Recently'
          };
        }
      }
    }
  }

  // Fallback to first lesson of first course
  const firstCourse = courses.find(c => c.id === enrolledCourseIds[0]);
  const firstModule = firstCourse?.modules[0];
  const firstLesson = firstModule?.lessons[0];

  if (firstCourse && firstLesson) {
    return {
      hasTarget: true,
      courseId: firstCourse.id,
      courseTitle: firstCourse.titleEn,
      courseTitleBn: firstCourse.titleBn,
      lessonId: firstLesson.id,
      lessonTitle: firstLesson.titleEn,
      lessonTitleBn: firstLesson.titleBn,
      moduleTitle: firstModule.titleEn,
      moduleTitleBn: firstModule.titleBn,
      estimatedMinutes: firstLesson.estimatedMinutes,
      progressPercent: enrollments[firstCourse.id]?.progressPercent || 0,
      isCompleted: false,
      lastVisitedAt: 'Ready to begin'
    };
  }

  return defaultState;
}

/**
 * Recommends contextual next learning activities.
 */
export function determineRecommendedActivities(
  courses: Course[],
  enrollments: Record<string, CourseEnrollment>,
  quizAttempts: QuizAttempt[] = [],
  typingStats?: TypingStats
): RecommendedActivity[] {
  const recommendations: RecommendedActivity[] = [];

  // 1. Next Incomplete Lesson
  for (const [cId, enrollment] of Object.entries(enrollments)) {
    const course = courses.find(c => c.id === cId);
    if (!course) continue;

    for (const m of course.modules) {
      for (const les of m.lessons) {
        if (!enrollment.completedLessonIds.includes(les.id)) {
          recommendations.push({
            id: `rec-next-${les.id}`,
            type: 'next_lesson',
            badge: 'Next In Curriculum',
            courseId: course.id,
            lessonId: les.id,
            titleEn: les.titleEn,
            titleBn: les.titleBn,
            descriptionEn: `Continue your journey in ${course.titleEn.split(':')[0]} (${m.titleEn.split(':')[0]})`,
            descriptionBn: `${course.titleBn} কোর্সে আপনার পরবর্তী নির্ধারিত পাঠ শুরু করুন`,
            actionTextEn: 'Start Lesson',
            actionTextBn: 'পাঠ শুরু করুন'
          });
          break;
        }
      }
      if (recommendations.some(r => r.type === 'next_lesson')) break;
    }
  }

  // 2. Quiz Review or Retake if score < 80%
  const lowScoringQuiz = quizAttempts.find(q => q.percentage < 80);
  if (lowScoringQuiz) {
    recommendations.push({
      id: `rec-quiz-${lowScoringQuiz.id}`,
      type: 'quiz_review',
      badge: 'Mastery Review',
      courseId: lowScoringQuiz.courseId,
      lessonId: lowScoringQuiz.lessonId,
      titleEn: `Retake ${lowScoringQuiz.quizTitle}`,
      titleBn: `${lowScoringQuiz.quizTitle} পুনরায় অনুশীলন করুন`,
      descriptionEn: `Your last score was ${lowScoringQuiz.percentage}%. Retake to achieve 100% mastery.`,
      descriptionBn: `সর্বশেষ স্কোর ছিল ${lowScoringQuiz.percentage}%। পূর্ণ নম্বরের জন্য পুনরায় চেষ্টা করুন।`,
      actionTextEn: 'Retake Quiz',
      actionTextBn: 'কুইজ দিন'
    });
  }

  // 3. Typing Drill if speed < 30 WPM or to maintain streak
  if (typingStats) {
    recommendations.push({
      id: 'rec-typing',
      type: 'typing_practice',
      badge: 'Skill Drill',
      titleEn: 'Daily Typing Speed Builder',
      titleBn: 'দৈনিক টাইপিং অনুশীলন',
      descriptionEn: `Current speed: ${typingStats.wpm} WPM (${typingStats.accuracy}% accuracy). Target: 35+ WPM.`,
      descriptionBn: `বর্তমান গতি: ${typingStats.wpm} WPM। পরবর্তী টার্গেট ৩৫+ WPM অর্জন করা।`,
      actionTextEn: 'Practice Typing',
      actionTextBn: 'টাইপিং অনুশীলন'
    });
  }

  return recommendations;
}

/**
 * Searches across all course contents (titles, descriptions, summaries, objectives, and content blocks).
 */
export function searchCourseContent(
  query: string, 
  courses: Course[]
): ContentSearchResult[] {
  const clean = query.trim().toLowerCase();
  if (!clean || clean.length < 2) return [];

  const results: ContentSearchResult[] = [];

  for (const course of courses) {
    for (const mod of course.modules) {
      for (const les of mod.lessons) {
        // Match in lesson title
        if (les.titleEn.toLowerCase().includes(clean) || les.titleBn.toLowerCase().includes(clean)) {
          results.push({
            courseId: course.id,
            courseTitle: course.titleEn,
            courseTitleBn: course.titleBn,
            moduleId: mod.id,
            moduleTitle: mod.titleEn,
            moduleTitleBn: mod.titleBn,
            lessonId: les.id,
            lessonTitle: les.titleEn,
            lessonTitleBn: les.titleBn,
            matchType: 'lesson_title',
            matchSnippet: les.titleEn,
            matchSnippetBn: les.titleBn
          });
          continue;
        }

        // Match in summary
        if (les.summaryEn?.toLowerCase().includes(clean) || les.summaryBn?.toLowerCase().includes(clean)) {
          results.push({
            courseId: course.id,
            courseTitle: course.titleEn,
            courseTitleBn: course.titleBn,
            moduleId: mod.id,
            moduleTitle: mod.titleEn,
            moduleTitleBn: mod.titleBn,
            lessonId: les.id,
            lessonTitle: les.titleEn,
            lessonTitleBn: les.titleBn,
            matchType: 'summary',
            matchSnippet: les.summaryEn,
            matchSnippetBn: les.summaryBn
          });
          continue;
        }

        // Match in content blocks
        let matchedBlock = false;
        for (const block of les.contentBlocks) {
          const contentEnLower = block.contentEn?.toLowerCase() || '';
          const contentBnLower = block.contentBn?.toLowerCase() || '';
          const titleEnLower = block.titleEn?.toLowerCase() || '';

          if (titleEnLower.includes(clean) || contentEnLower.includes(clean) || contentBnLower.includes(clean)) {
            let snippet = block.contentEn || '';
            const idx = snippet.toLowerCase().indexOf(clean);
            if (idx !== -1) {
              const start = Math.max(0, idx - 40);
              const end = Math.min(snippet.length, idx + 80);
              snippet = (start > 0 ? '...' : '') + snippet.substring(start, end) + (end < snippet.length ? '...' : '');
            } else {
              snippet = snippet.substring(0, 100) + '...';
            }

            results.push({
              courseId: course.id,
              courseTitle: course.titleEn,
              courseTitleBn: course.titleBn,
              moduleId: mod.id,
              moduleTitle: mod.titleEn,
              moduleTitleBn: mod.titleBn,
              lessonId: les.id,
              lessonTitle: les.titleEn,
              lessonTitleBn: les.titleBn,
              matchType: block.type === 'shortcut_table' ? 'shortcut' : 'concept_block',
              matchSnippet: `${block.titleEn ? block.titleEn + ': ' : ''}${snippet}`,
              matchSnippetBn: block.titleBn
            });
            matchedBlock = true;
            break;
          }
        }

        if (matchedBlock) continue;

        // Match in objectives
        if (les.objectivesEn?.some(o => o.toLowerCase().includes(clean))) {
          const matchedObj = les.objectivesEn.find(o => o.toLowerCase().includes(clean)) || '';
          results.push({
            courseId: course.id,
            courseTitle: course.titleEn,
            courseTitleBn: course.titleBn,
            moduleId: mod.id,
            moduleTitle: mod.titleEn,
            moduleTitleBn: mod.titleBn,
            lessonId: les.id,
            lessonTitle: les.titleEn,
            lessonTitleBn: les.titleBn,
            matchType: 'objective',
            matchSnippet: `Objective: ${matchedObj}`
          });
        }
      }
    }
  }

  return results.slice(0, 20);
}

/**
 * Updates streak information when activity occurs.
 */
export function calculateStreak(currentStreakInfo: StreakInfo): StreakInfo {
  const today = new Date().toISOString().split('T')[0];
  const lastActive = currentStreakInfo.lastActiveDate;

  if (lastActive === today) {
    // Already active today; retain streak
    return currentStreakInfo;
  }

  const todayDate = new Date(today);
  const lastDate = new Date(lastActive);
  const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

  let newStreak = currentStreakInfo.currentStreakDays;
  if (diffDays === 1) {
    // Consecutive day!
    newStreak += 1;
  } else if (diffDays > 1) {
    // Streak broken, reset to 1
    newStreak = 1;
  } else {
    // First time or same day
    newStreak = Math.max(1, newStreak);
  }

  return {
    currentStreakDays: newStreak,
    longestStreakDays: Math.max(currentStreakInfo.longestStreakDays, newStreak),
    lastActiveDate: today,
    totalDaysActive: currentStreakInfo.totalDaysActive + 1
  };
}
