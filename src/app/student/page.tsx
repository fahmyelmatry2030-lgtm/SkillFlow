import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { BookOpen, ShieldCheck, PlayCircle, Star, ArrowLeft, Clock, TrendingUp, Award } from 'lucide-react';

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: userId },
    include: { course: true }
  });

  const certificates = await prisma.certificate.findMany({
    where: { studentId: userId },
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* SaaS Statistics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={28} />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>الدورات المسجلة</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>{enrollments.length}</div>
          </div>
        </div>

        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={28} />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>نسبة الإنجاز</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>0%</div>
          </div>
        </div>

        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={28} />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>الشهادات</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>{certificates.length}</div>
          </div>
        </div>

        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'white', border: 'none' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={28} fill="currentColor" />
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>النقاط والمكافآت</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800' }}>120</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        
        {/* Main Content Area */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem' }}>متابعة التعلم</h2>
            <Link href="/student/courses" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>عرض الكل</Link>
          </div>
          
          {enrollments.length === 0 ? (
            <div className="saas-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <BookOpen size={32} color="var(--muted-foreground)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>لم تسجل في أي دورة بعد</h3>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>ابدأ رحلتك التعليمية الآن واستكشف أفضل الدورات.</p>
              <Link href="/courses" className="btn btn-primary">تصفح الدورات</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {enrollments.map(enroll => (
                <div key={enroll.id} className="saas-card" style={{ display: 'flex', padding: '1.5rem', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ width: '140px', height: '100px', borderRadius: 'var(--radius-sm)', background: 'var(--muted)', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                    {enroll.course.thumbnail ? (
                      <img src={enroll.course.thumbnail} alt={enroll.course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayCircle color="var(--muted-foreground)" /></div>
                    )}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>{enroll.course.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--muted-foreground)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> آخر نشاط: اليوم</span>
                    </div>
                    {/* Progress Bar Mockup */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ flex: 1, height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '35%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>35%</span>
                    </div>
                  </div>
                  
                  <div>
                    <Link href={`/student/courses/${enroll.courseId}`} className="btn btn-secondary">متابعة <ArrowLeft size={16} /></Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
