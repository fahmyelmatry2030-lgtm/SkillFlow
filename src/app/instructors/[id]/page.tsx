import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Star, BookOpen, Users, PlayCircle, Award, MapPin } from 'lucide-react';
import Link from 'next/link';

export default async function InstructorProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let instructor: any = null;

  // Handle mock instructors for the UI preview
  if (id.startsWith('mock-')) {
    instructor = {
      id,
      name: id === 'mock-1' ? 'سارة خالد' : 
            id === 'mock-2' ? 'د. محمود سامي' : 
            id === 'mock-3' ? 'خالد السعيد' : 
            id === 'mock-4' ? 'منى علي' : 
            id === 'mock-5' ? 'علي عمر' : 
            id === 'mock-6' ? 'ياسمين طارق' : 'عمر حسين',
      bio: 'خبير ومحاضر معتمد يتمتع بمهارات عالية وقدرة مميزة على إيصال المعلومات ببساطة وفعالية للمتدربين من مختلف المستويات. يمتلك خبرة واسعة في تقديم دورات احترافية تساعد الطلاب على تحقيق أهدافهم المهنية بكفاءة عالية وفق أفضل الممارسات المعتمدة.',
      role: 'INSTRUCTOR',
      courses: [
        { id: 'c1', title: 'دورة احترافية متقدمة', shortDescription: 'دورة شاملة تغطي كافة الجوانب العملية والنظرية.', price: 99 },
        { id: 'c2', title: 'أساسيات ومفاهيم حديثة', shortDescription: 'تعلم الأساسيات بطريقة مبسطة وتفاعلية.', price: 49 },
        { id: 'c3', title: 'تطبيقات عملية ومشاريع', shortDescription: 'تطبيق عملي خطوة بخطوة لبناء مشاريع حقيقية.', price: 149 },
      ],
      _mock: true
    };
  } else {
    instructor = await prisma.user.findUnique({
      where: { id },
      include: {
        courses: {
          where: { status: 'OPEN' }, // only show public courses
          include: { reviews: true, enrollments: true, lectures: true }
        }
      }
    });
  }

  if (!instructor || instructor.role !== 'INSTRUCTOR') {
    notFound();
  }

  let avgRating = 4.9;
  let totalStudents = 1200;
  
  if (!instructor._mock) {
    const allReviews = instructor.courses.flatMap((c: any) => c.reviews.filter((r: any) => r.isApproved));
    avgRating = allReviews.length > 0 
      ? allReviews.reduce((acc: number, r: any) => acc + r.rating, 0) / allReviews.length 
      : 0;
    totalStudents = instructor.courses.reduce((acc: number, c: any) => acc + c.enrollments.length, 0);
  }

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-16 relative overflow-hidden">
      <div className="hero-glow opacity-50 hidden md:block"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Profile Header */}
        <div className="friendly-card p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mb-16 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
          
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-white p-2 relative z-10 shadow-xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#14B8A6] flex items-center justify-center text-5xl font-black text-white">
              {(instructor.name || 'M').charAt(0)}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-right relative z-10">
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">{instructor.name}</h1>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <span className="flex items-center gap-1.5 text-[#14B8A6] font-bold text-sm bg-teal-50 px-3 py-1 rounded-full">
                <Award size={16} /> مدرب معتمد
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 font-bold text-sm bg-slate-100 px-3 py-1 rounded-full">
                <MapPin size={16} /> متواجد أونلاين
              </span>
            </div>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-3xl">
              {instructor.bio || 'خبير ومحاضر معتمد يتمتع بمهارات عالية وقدرة مميزة على إيصال المعلومات ببساطة وفعالية للمتدربين من مختلف المستويات.'}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 pt-8 border-t border-slate-100">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 text-2xl font-black text-amber-500 mb-1">
                  <Star size={24} fill="currentColor" /> {avgRating > 0 ? avgRating.toFixed(1) : 'جديد'}
                </div>
                <span className="text-sm font-bold text-slate-400">تقييم المحاضر</span>
              </div>
              <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 text-2xl font-black text-[#8B5CF6] mb-1">
                  <Users size={24} /> {totalStudents}
                </div>
                <span className="text-sm font-bold text-slate-400">طالب مسجل</span>
              </div>
              <div className="w-px h-12 bg-slate-100 hidden md:block"></div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center gap-2 text-2xl font-black text-[#14B8A6] mb-1">
                  <BookOpen size={24} /> {instructor.courses.length}
                </div>
                <span className="text-sm font-bold text-slate-400">دورة تعليمية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Courses */}
        <div className="mb-12 flex items-center gap-4">
          <h2 className="text-2xl font-black text-slate-800">الدورات التي يقدمها المحاضر</h2>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {instructor.courses.length === 0 ? (
          <div className="friendly-card p-12 text-center text-slate-500 font-bold text-lg border border-slate-100">
            لا توجد دورات متاحة حالياً.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructor.courses.map((course: any) => (
              <div key={course.id} className="friendly-card flex flex-col border border-slate-100 group">
                
                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                  <PlayCircle size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#8B5CF6] shadow-md">
                    متاح للتسجيل
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 leading-relaxed">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">
                    {course.shortDescription || course.description || 'دورة احترافية مصممة لنقلك من مستوى المبتدئين إلى الاحتراف خطوة بخطوة مع تطبيق عملي مباشر.'}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="text-2xl font-black text-slate-800">
                      ${course.price?.toFixed(2) || '99.00'}
                    </div>
                    <Link href={`/courses/${course.id}`} className="btn btn-outline px-6 py-2 text-sm rounded-full">
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
