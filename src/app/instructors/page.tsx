import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Star, BookOpen, Users, ChevronLeft, MapPin, Award } from 'lucide-react';

export default async function InstructorsPage() {
  let instructors = await prisma.user.findMany({
    where: { role: 'INSTRUCTOR' },
    include: {
      courses: {
        include: { reviews: true, enrollments: true }
      }
    }
  });

  // Add mock data so the page always looks fully populated for the design preview
  const mockInstructors = [
    { id: 'mock-1', name: 'سارة خالد', bio: 'مصممة جرافيك بخبرة 10 سنوات، متخصصة في تصميم الهويات البصرية وتحسين تجربة المستخدم.', courses: [{}, {}], _mock: true },
    { id: 'mock-2', name: 'د. محمود سامي', bio: 'أستاذ جامعي في الذكاء الاصطناعي، أشرف على تطوير عشرات المشاريع البحثية والتجارية.', courses: [{}, {}, {}, {}], _mock: true },
    { id: 'mock-3', name: 'خالد السعيد', bio: 'مستشار أمن سيبراني ومدرب معتمد من عدة جهات عالمية، شارك في تأمين كبرى الشركات.', courses: [{}, {}, {}], _mock: true },
    { id: 'mock-4', name: 'منى علي', bio: 'خبيرة في التسويق الرقمي وإدارة الحملات الإعلانية على منصات التواصل الاجتماعي.', courses: [{}, {}, {}, {}, {}], _mock: true },
    { id: 'mock-5', name: 'علي عمر', bio: 'مطور واجهات خلفية (Backend Developer) ومؤسس لعدة شركات ناشئة ناجحة.', courses: [{}], _mock: true },
    { id: 'mock-6', name: 'ياسمين طارق', bio: 'مدربة معتمدة في مهارات التواصل وإدارة الأعمال للمبتدئين.', courses: [{}, {}], _mock: true },
    { id: 'mock-7', name: 'عمر حسين', bio: 'متخصص في تطوير تطبيقات الهواتف الذكية (iOS & Android).', courses: [{}, {}, {}], _mock: true },
  ];

  instructors = [...instructors, ...mockInstructors] as any;

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-16 relative overflow-hidden">
      <div className="hero-glow opacity-50 hidden md:block"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16 relative">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">نخبة <span className="text-[#8B5CF6]">المحاضرين والخبراء</span></h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            فخورون بضم أفضل الكفاءات والخبراء المعتمدين في مختلف المجالات، لتزويدك بالمعرفة الأكاديمية والعملية بأعلى معايير الجودة.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {instructors.map(inst => {
            // Calculate mock stats if it's mock data, otherwise real stats
            let avgRating = 4.9;
            let totalStudents = 1200;
            let courseCount = 3;

            if (!(inst as any)._mock) {
              const allReviews = inst.courses.flatMap(c => c.reviews.filter(r => r.isApproved));
              avgRating = allReviews.length > 0 
                ? allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length 
                : 0;
              totalStudents = inst.courses.reduce((acc, c) => acc + c.enrollments.length, 0);
              courseCount = inst.courses.length;
            }

            return (
              <div key={inst.id} className="friendly-card flex flex-col border border-slate-100 overflow-hidden group">
                
                {/* Header Banner */}
                <div className="h-32 bg-gradient-to-r from-purple-100 to-teal-50 relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 text-center flex-1 flex flex-col">
                  
                  {/* Avatar */}
                  <div className="w-24 h-24 rounded-full bg-white p-1.5 mx-auto -mt-12 mb-4 relative z-10 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#14B8A6] flex items-center justify-center text-3xl font-black text-white">
                      {(inst.name || 'M').charAt(0)}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{inst.name}</h3>
                  <div className="flex justify-center items-center gap-1 text-[#14B8A6] text-sm font-bold mb-4">
                    <Award size={16} /> مدرب معتمد
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                    {inst.bio || 'يمتلك خبرة واسعة في تقديم دورات احترافية تساعد الطلاب على تحقيق أهدافهم المهنية بكفاءة عالية وفق أفضل الممارسات المعتمدة.'}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mb-6">
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 text-amber-500 font-black text-lg mb-1">
                        <Star size={16} fill="currentColor" /> {avgRating > 0 ? avgRating.toFixed(1) : 'جديد'}
                      </div>
                      <div className="text-xs font-bold text-slate-400">التقييم</div>
                    </div>
                    <div className="w-px h-8 bg-slate-100"></div>
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 text-[#8B5CF6] font-black text-lg mb-1">
                        <BookOpen size={16} /> {courseCount}
                      </div>
                      <div className="text-xs font-bold text-slate-400">دورة</div>
                    </div>
                    <div className="w-px h-8 bg-slate-100"></div>
                    <div className="text-center flex-1">
                      <div className="flex items-center justify-center gap-1 text-[#14B8A6] font-black text-lg mb-1">
                        <Users size={16} /> {totalStudents}
                      </div>
                      <div className="text-xs font-bold text-slate-400">طالب</div>
                    </div>
                  </div>

                  <Link href={`/instructors/${inst.id}`} className="btn btn-outline w-full rounded-full flex items-center justify-center gap-2 group-hover:bg-[#8B5CF6] group-hover:text-white transition-all">
                    عرض الملف الشخصي <ChevronLeft size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
