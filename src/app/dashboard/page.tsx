import { BookOpen, Users, PlusCircle, Video, FileQuestion, Award } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getUser } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const user = await getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Fetch data based on role
  let studentEnrollments = [];
  let instructorCourses = [];
  
  if (user.role === 'STUDENT' || user.role === 'ADMIN') {
    studentEnrollments = await prisma.enrollment.findMany({
      where: { studentId: user.id },
      include: { course: true },
    });
  }
  
  if (user.role === 'INSTRUCTOR' || user.role === 'ADMIN') {
    instructorCourses = await prisma.course.findMany({
      where: { instructorId: user.id },
      include: { enrollments: true },
    });
  }

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>أهلاً بك، {user.name || user.phone}</h1>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '12px' }}>
          الدور: {user.role === 'INSTRUCTOR' ? 'محاضر' : user.role === 'ADMIN' ? 'مدير' : 'طالب'}
        </div>
      </div>

      {(user.role === 'STUDENT' || user.role === 'ADMIN') && (
        <div className="grid grid-cols-1" style={{ gap: '2rem', marginBottom: '3rem' }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BookOpen color="var(--primary)" /> دوراتي (الطالب)
            </h2>
            
            {studentEnrollments.length === 0 ? (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                لم تشترك في أي دورة بعد.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {studentEnrollments.map(enrollment => (
                  <div key={enrollment.id} className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{enrollment.course.title}</h3>
                      <p style={{ color: 'var(--text-muted)' }}>تم الاشتراك في: {enrollment.createdAt.toLocaleDateString('ar-EG')}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                        <Video size={18} /> مشاهدة المحاضرات
                      </button>
                      <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
                        <FileQuestion size={18} /> الاختبارات
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award color="var(--primary)" /> شهاداتي
            </h2>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              لم تحصل على شهادات بعد. أكمل دوراتك لتحصل على شهادات معتمدة.
            </div>
          </section>
        </div>
      )}

      {(user.role === 'INSTRUCTOR' || user.role === 'ADMIN') && (
        <div className="grid grid-cols-1" style={{ gap: '2rem' }}>
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BookOpen color="var(--primary)" /> الدورات التي أقوم بتدريسها
              </h2>
              <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                <PlusCircle size={18} /> إضافة دورة جديدة
              </button>
            </div>
            
            {instructorCourses.length === 0 ? (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                لا توجد دورات مسجلة باسمك حتى الآن.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {instructorCourses.map(course => (
                  <div key={course.id} className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>عدد الطلاب: {course.enrollments.length} | السعر: ${course.price}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                          <Users size={18} /> إدارة الطلاب
                        </button>
                        <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                          <Video size={18} /> المحاضرات
                        </button>
                        <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
                          <FileQuestion size={18} /> الاختبارات
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
