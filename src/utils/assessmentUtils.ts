import { Lesson, AssessmentConfig, GenericAssessmentItem } from '../types';

/**
 * Builds a generic AssessmentConfig from a lesson, seamlessly supporting:
 * 1. Dedicated lesson.assessment configurations if present.
 * 2. MCQ questions from lesson.quiz converted into generic MCQ assessment items.
 * 3. Typing assessments if the lesson has typing practice or typing prompts.
 */
export function buildAssessmentConfig(
  courseId: string, 
  lesson: Lesson
): AssessmentConfig | null {
  if (lesson.assessment) {
    return lesson.assessment;
  }

  const items: GenericAssessmentItem[] = [];

  // 1. Convert any MCQ Quiz questions into GenericAssessmentItems
  if (lesson.quiz && lesson.quiz.length > 0) {
    lesson.quiz.forEach(q => {
      items.push({
        id: q.id,
        type: 'mcq',
        promptEn: q.questionEn,
        promptBn: q.questionBn,
        optionsEn: q.optionsEn,
        optionsBn: q.optionsBn,
        correctIndex: q.correctIndex,
        explanationEn: q.explanationEn,
        explanationBn: q.explanationBn,
        points: 1
      });
    });
  }

  // 2. If lesson includes typing practice, integrate a hands-on Typing Test assessment
  if (lesson.practice && lesson.practice.type === 'typing_prompt') {
    const defaultPassage = lesson.id === 'bc-6'
      ? 'asdf jkl; asdf jkl; aa ss dd ff jj kk ll ;;'
      : 'Practice typing every day to master modern computing and communication.';

    items.push({
      id: `${lesson.id}-typing-assessment`,
      type: 'typing_test',
      promptEn: `Typing Speed & Accuracy Assessment: ${lesson.practice.titleEn}`,
      promptBn: `টাইপিং গতি ও নির্ভুলতা পরীক্ষা: ${lesson.practice.titleBn}`,
      targetText: defaultPassage,
      targetWpm: 15,
      minAccuracy: 85,
      points: 2,
      explanationEn: 'Touch typing requires muscle memory on the home row without glancing down at the keyboard.',
      explanationBn: 'হোম রোতে আঙুল রেখে কিবোর্ডের দিকে না তাকিয়ে টাইপ করার অভ্যাসই গতি ও নির্ভুলতা বাড়ায়।'
    });
  }

  if (items.length === 0) {
    return null;
  }

  // Calculate a reasonable time limit: e.g. 60 seconds per question (or minimum 120 seconds)
  const timeLimitSeconds = Math.max(120, items.length * 60);

  return {
    id: `assessment-${courseId}-${lesson.id}`,
    titleEn: `${lesson.titleEn}: Knowledge & Skills Assessment`,
    titleBn: `${lesson.titleBn}: মূল্যায়ন পরীক্ষা`,
    descriptionEn: `Core assessment loop for ${lesson.titleEn}. Answer all questions to test comprehension and earn progress.`,
    descriptionBn: `${lesson.titleBn} পাঠের জ্ঞান যাচাই ও মূল্যায়ন পরীক্ষা।`,
    courseId,
    lessonId: lesson.id,
    timeLimitSeconds,
    passingPercentage: 60,
    items
  };
}
