import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { BookOpen, Users, DollarSign, Star, MoreVertical, Plus } from 'lucide-react';

export default async function InstructorDashboard() {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;

  const myCourses = await prisma.course.findMany({
    where: { instructorId: userId },
    include: { enrollments: true, reviews: true }
  });

  const totalStudents = myCourses.reduce((acc, course) => acc + course.enrollments.length, 0);
  const totalRevenue = myCourses.reduce((acc, course) => acc + (course.enrollments.length * course.price), 0);
  
  let averageRating = 0;
  let totalReviews = 0;
  myCourses.forEach(c => {
    c.reviews.forEach(r => {
      averageRating += r.rating;
      totalReviews++;
    });
  });
  if (totalReviews > 0) averageRating = averageRating / totalReviews;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      
      {/* Metrics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={28} />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>إجمالي الطلاب</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>{totalStudents}</div>
          </div>
        </div>

        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={28} />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>الأرباح (USD)</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>${totalRevenue.toLocaleString()}</div>
          </div>
        </div>

        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={28} />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>الدورات المنشورة</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>{myCourses.length}</div>
          </div>
        </div>

        <div className="saas-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.1)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={28} fill="currentColor" />
          </div>
          <div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.25rem' }}>متوسط التقييم</div>
            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--foreground)' }}>{averageRating > 0 ? averageRating.toFixed(1) : 'جديد'}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', lg: { gridTemplateColumns: '2fr 1fr' } }}>
        
        {/* Main Content Area (Recent Courses Table) */}
        <div className="saas-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem' }}>دوراتي الحالية</h2>
            <Link href="/instructor/courses" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>إدارة الكل</Link>
          </div>
          
          {myCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <BookOpen size={24} color="var(--muted-foreground)" />
              </div>
              <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>ليس لديك أي دورات بعد.</p>
              <Link href="/instructor/courses/new" className="btn btn-primary"><Plus size={16} /> أنشئ دورتك الأولى</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>الدورة</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>الحالة</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>الطلاب</th>
                    <th style={{ padding: '1rem', fontWeight: '600' }}>السعر</th>
                    <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'center' }}>إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {myCourses.slice(0, 5).map(course => (
                    <tr key={course.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s', cursor: 'pointer' }} className="hover:bg-muted/50">
                      <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--foreground)' }}>{course.title}</td>
                      <td style={{ padding: '1rem' }}><span className="badge badge-accent">مفعل</span></td>
                      <td style={{ padding: '1rem' }}>{course.enrollments.length}</td>
                      <td style={{ padding: '1rem' }}>${course.price.toFixed(2)}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)' }}><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
