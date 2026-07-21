import { getUser } from '@/actions/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { PlayCircle, Video, Lock, Download, Eye } from 'lucide-react';

export default async function CoursePlayer({ params }: { params: { id: string } }) {
  const user = await getUser();
  if (!user || user.role !== 'STUDENT') {
    redirect('/login');
  }

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: { studentId_courseId: { studentId: user.id, courseId: params.id } },
    include: {
      course: {
        include: {
          lectures: { orderBy: { createdAt: 'asc' } },
          files: true,
        }
      }
    }
  });

  if (!enrollment) {
    notFound(); // or redirect to payment
  }

  const course = enrollment.course;

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>{course.title}</h1>
      
      {/* Video Player Mockup */}
      <div className="glass-panel" style={{ width: '100%', aspectRatio: '16/9', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
        <Lock color="rgba(255,255,255,0.2)" size={120} style={{ position: 'absolute' }} />
        <p style={{ zIndex: 1, color: 'var(--text-muted)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Video /> مشغل الفيديو المشفر (HLS / DRM)
        </p>
        <p style={{ zIndex: 1, color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
          لا يمكن تحميل الفيديو أو نسخ الرابط المباشر
        </p>
      </div>

      <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
        
        {/* Curriculum Sidebar */}
        <div className="glass-panel" style={{ padding: '1.5rem', gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>المحاضرات</h2>
          {course.lectures.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>لا توجد محاضرات حتى الآن.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.lectures.map((lecture, idx) => (
                <div key={lecture.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <PlayCircle color="var(--primary)" />
                    <span>{idx + 1}. {lecture.title}</span>
                  </div>
                  {lecture.type === 'LIVE' ? (
                    lecture.liveStatus === 'LIVE' ? (
                      <span className="btn btn-primary" style={{ padding: '0.25rem 1rem', fontSize: '0.85rem' }}>انضمام للبث المباشر</span>
                    ) : lecture.liveStatus === 'SCHEDULED' ? (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        مجدول: {lecture.date ? lecture.date.toLocaleDateString('ar-EG') : 'قريباً'}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>انتهى البث</span>
                    )
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>مسجل</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resources */}
        <div className="glass-panel" style={{ padding: '1.5rem', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>الملفات والمرفقات</h2>
          {course.files.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>لا توجد ملفات مرفقة.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {course.files.map(file => (
                <div key={file.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <span style={{ fontSize: '0.9rem' }}>{file.title}</span>
                  {file.accessType === 'DOWNLOAD' ? (
                    <Download size={16} color="var(--primary)" style={{ cursor: 'pointer' }} />
                  ) : (
                    <Eye size={16} color="var(--primary)" style={{ cursor: 'pointer' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
