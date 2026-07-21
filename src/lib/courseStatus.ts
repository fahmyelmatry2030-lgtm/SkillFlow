export function getDynamicCourseStatus(course: { status: string, startDate: Date, registrationEnd: Date }) {
  if (course.status === 'CANCELLED') return '🔴 تم الإلغاء';
  if (course.status === 'ENDED') return '⚪ انتهت الدورة';

  const now = new Date();

  // If manually set to OPEN or DRAFT, we evaluate dates
  if (course.status === 'OPEN' || course.status === 'ACTIVE') {
    if (now > course.registrationEnd && now < course.startDate) {
      return '🟡 التسجيل مغلق';
    }
    
    const daysUntilStart = (course.startDate.getTime() - now.getTime()) / (1000 * 3600 * 24);
    if (daysUntilStart > 0 && daysUntilStart <= 7) {
      return '🔵 ستبدأ قريباً';
    }

    if (now >= course.startDate) {
      return '🟠 الدورة قيد التنفيذ';
    }

    return '🟢 التسجيل مفتوح';
  }

  return course.status;
}
