import Link from 'next/link';
import { 
  ArrowLeft, Users, MonitorPlay, BookOpen, Award, 
  CheckCircle, PlayCircle, Star, Calendar, 
  ChevronDown, CreditCard, FileText, CheckCircle2, UserPlus
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#FFFDF8]">
      
      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-orange-50/50">
        <div className="hero-glow"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Content */}
            <div className="lg:w-1/2 text-center lg:text-right">
              <div className="friendly-badge mb-6">
                <Star size={16} fill="currentColor" /> المنصة الأولى للتعليم المباشر
              </div>
              
              <h1 className="text-[3rem] md:text-[4rem] font-black text-slate-800 leading-[1.2] mb-6">
                ابدأ رحلتك التعليمية مع نخبة من <span className="text-[#8B5CF6]">المحاضرين المحترفين</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                انضم إلى الدورات المباشرة في مختلف المجالات، تعلم من خبراء، احصل على شهادة موثقة، وطوّر مهاراتك بخطوات عملية.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/courses" className="btn btn-primary min-w-[200px]">
                  استعرض الدورات <ArrowLeft size={18} />
                </Link>
                <Link href="/instructors/join" className="btn btn-outline min-w-[200px]">
                  كن محاضرًا <Users size={18} className="text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="lg:w-1/2 relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-emerald-50 rounded-full blur-3xl opacity-50"></div>
                {/* Placeholder for modern illustration */}
                <div className="relative friendly-card h-full w-full flex items-center justify-center bg-white border border-slate-100 p-8">
                  <div className="text-center">
                    <MonitorPlay size={80} className="text-[#8B5CF6] mx-auto mb-4 opacity-50" />
                    <p className="text-slate-400 font-bold">صورة أو Illustration حديثة تمثل التعليم والتقنية</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. الإحصائيات (Statistics) */}
      <section className="py-12 relative -mt-16 z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            
            <div className="friendly-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <Users size={24} className="text-blue-500" />
              </div>
              <div className="text-3xl font-black text-slate-800 mb-1">+15,000</div>
              <div className="text-sm font-bold text-slate-500">طالب</div>
            </div>

            <div className="friendly-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <Users size={24} className="text-[#8B5CF6]" />
              </div>
              <div className="text-3xl font-black text-slate-800 mb-1">+120</div>
              <div className="text-sm font-bold text-slate-500">محاضر</div>
            </div>

            <div className="friendly-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-[#10B981]" />
              </div>
              <div className="text-3xl font-black text-slate-800 mb-1">+350</div>
              <div className="text-sm font-bold text-slate-500">دورة</div>
            </div>

            <div className="friendly-card p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-4">
                <Award size={24} className="text-amber-500" />
              </div>
              <div className="text-3xl font-black text-slate-800 mb-1">+8,000</div>
              <div className="text-sm font-bold text-slate-500">شهادة</div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. التصنيفات (Categories) */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 text-center md:text-right">
            <div>
              <h2 className="text-3xl font-black text-slate-800 mb-3">أشهر التصنيفات</h2>
              <p className="text-slate-500 font-medium text-lg">اختر المجال الذي تود تطوير مهاراتك فيه.</p>
            </div>
            <Link href="/categories" className="btn btn-outline mt-4 md:mt-0">
              عرض جميع التصنيفات
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '🎨', title: 'التصميم والجرافيك' },
              { icon: '💻', title: 'البرمجة' },
              { icon: '🔐', title: 'الأمن السيبراني' },
              { icon: '📈', title: 'التسويق الرقمي' },
              { icon: '🤖', title: 'الذكاء الاصطناعي' },
              { icon: '📊', title: 'تحليل البيانات' }
            ].map((cat, i) => (
              <Link key={i} href="#" className="friendly-card p-6 text-center hover:border-[#8B5CF6]/30 border border-transparent flex flex-col items-center justify-center aspect-square">
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="font-bold text-slate-700">{cat.title}</h3>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 5. الدورات المميزة (Featured Courses) */}
      <section className="py-20 bg-white/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-3">الدورات المميزة</h2>
            <p className="text-slate-500 font-medium text-lg">أفضل الدورات تقييماً من قبل الطلاب.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="friendly-card flex flex-col border border-slate-100">
                <div className="h-56 bg-slate-100 flex items-center justify-center relative">
                  <PlayCircle size={48} className="text-slate-300" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                    مباشر
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">دورة احتراف تطوير واجهات المستخدم الشاملة</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                    <span className="text-sm font-bold text-slate-600">أحمد محمود</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-400" fill="currentColor" /> 4.9
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} /> 12 أكتوبر
                    </div>
                    <div className="flex items-center gap-1 text-[#10B981]">
                      <Users size={16} /> 5 مقاعد متبقية
                    </div>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="text-2xl font-black text-slate-800">$99</div>
                    <Link href={`/courses/${i}`} className="btn btn-primary px-6 py-2 text-sm">
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn btn-outline">
              استكشف كل الدورات
            </Link>
          </div>

        </div>
      </section>

      {/* 6. لماذا تختار منصتنا؟ (Why Choose Us) */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-3">لماذا تختار منصتنا؟</h2>
            <p className="text-slate-500 font-medium text-lg">مميزات تجعلنا خيارك الأول للتعلم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <MonitorPlay />, title: 'دورات مباشرة', desc: 'تفاعل حقيقي مع المحاضر والطلاب في نفس الوقت.' },
              { icon: <Award />, title: 'شهادة موثقة', desc: 'شهادات يمكن التحقق منها إلكترونياً لتقديمها لجهات العمل.' },
              { icon: <CreditCard />, title: 'وسائل دفع متعددة', desc: 'خيارات دفع مرنة وآمنة تناسب الجميع.' },
              { icon: <Users />, title: 'محاضرون محترفون', desc: 'نخبة من الخبراء العاملين في كبرى الشركات.' },
              { icon: <PlayCircle />, title: 'تسجيلات للمشتركين', desc: 'الوصول لتسجيلات المحاضرات للمراجعة في أي وقت.' },
              { icon: <FileText />, title: 'اختبارات وشهادات', desc: 'تقييم مستمر لضمان فهمك واستيعابك للمادة العلمية.' }
            ].map((feature, i) => (
              <div key={i} className="friendly-card p-8 flex gap-6">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-50 text-[#8B5CF6] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. كيف تعمل المنصة؟ (How It Works) */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-3">كيف تعمل المنصة؟</h2>
            <p className="text-slate-500 font-medium text-lg">خطوات بسيطة للبدء في رحلتك التعليمية.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
            
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

            {[
              { step: '1', title: 'أنشئ حسابًا', icon: <UserPlus /> },
              { step: '2', title: 'اختر الدورة المناسبة', icon: <BookOpen /> },
              { step: '3', title: 'ادفع بأمان', icon: <CreditCard /> },
              { step: '4', title: 'ابدأ التعلم واحصل على شهادتك', icon: <Award /> }
            ].map((step, i) => (
              <div key={i} className="relative z-10 friendly-card w-full md:w-64 p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-2xl font-black mb-4 shadow-lg shadow-purple-500/20">
                  {step.step}
                </div>
                <div className="text-slate-400 mb-4">{step.icon}</div>
                <h3 className="font-bold text-slate-800 text-lg">{step.title}</h3>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. المحاضرون المميزون (Featured Instructors) */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-3">المحاضرون المميزون</h2>
            <p className="text-slate-500 font-medium text-lg">تعلم من أفضل الخبراء في مجالاتهم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="friendly-card p-6 text-center border border-slate-100 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-200 mb-4 overflow-hidden">
                  {/* Placeholder for Image */}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">د. مهندس خالد السعيد</h3>
                <p className="text-[#8B5CF6] font-bold text-sm mb-4">خبير الأمن السيبراني</p>
                
                <div className="flex gap-4 text-sm font-medium text-slate-500 mb-6">
                  <div className="flex flex-col items-center">
                    <span className="font-black text-slate-800">12</span>
                    <span>دورة</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200"></div>
                  <div className="flex flex-col items-center">
                    <span className="font-black text-slate-800 flex items-center gap-1"><Star size={14} className="text-amber-400" fill="currentColor"/> 4.9</span>
                    <span>التقييم</span>
                  </div>
                </div>

                <Link href={`/instructors/${i}`} className="btn btn-outline w-full px-4 py-2 text-sm">
                  عرض الملف الشخصي
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. آراء الطلاب (Student Reviews) */}
      <section className="py-24 bg-purple-50/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-800 mb-3">آراء الطلاب</h2>
            <p className="text-slate-500 font-medium text-lg">قصص نجاح حقيقية من طلاب المنصة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "المنصة ممتازة جداً والمحاضرين على مستوى عالي من الاحترافية. استفدت كثيراً من الدورات المباشرة.",
              "أفضل تجربة تعليمية مررت بها، سهولة في الوصول للمحتوى واختبارات دقيقة لتقييم المستوى.",
              "الشهادة المعتمدة ساعدتني كثيراً في الحصول على وظيفتي الحالية. شكراً لإدارة المنصة."
            ].map((review, i) => (
              <div key={i} className="friendly-card p-8 border border-slate-100">
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="text-slate-600 font-medium leading-relaxed mb-6">"{review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="font-bold text-slate-800">محمد علي</div>
                    <div className="text-sm text-slate-500 font-medium">طالب في دورة البرمجة</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. الأسئلة الشائعة (FAQ) */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-800 mb-3">الأسئلة الشائعة</h2>
          </div>

          <div className="space-y-4">
            {[
              "كيف أسجل في المنصة؟",
              "كيف يتم الدفع لشراء دورة؟",
              "هل الدورات التي تقدمونها مباشرة؟",
              "هل يوجد تسجيل للمحاضرات المباشرة للرجوع إليها لاحقاً؟",
              "كيف أحصل على الشهادة المعتمدة بعد انتهاء الدورة؟"
            ].map((q, i) => (
              <details key={i} className="friendly-card p-6 border border-slate-100 cursor-pointer group">
                <summary className="flex justify-between items-center font-bold text-slate-800 list-none">
                  {q}
                  <ChevronDown className="text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-slate-500 font-medium mt-4 leading-relaxed pr-2">
                  إجابة توضيحية للسؤال المذكور. هذا النص هو نص تجريبي لبيان شكل المحتوى داخل الأسئلة الشائعة، ويمكن تغييره لاحقاً بما يتناسب مع سياسات المنصة الفعلية.
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* 11. Call To Action */}
      <section className="py-24 bg-[#8B5CF6] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">جاهز لتطوير مهاراتك؟</h2>
          <p className="text-xl text-purple-100 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            انضم الآن وابدأ أول دورة مع أفضل المحاضرين المتخصصين. استثمر في نفسك اليوم لغدٍ أفضل.
          </p>
          <Link href="/courses" className="btn bg-white text-[#8B5CF6] hover:bg-slate-50 hover:shadow-xl hover:shadow-black/10 px-10 py-4 text-lg">
            استعرض الدورات
          </Link>
        </div>
      </section>

    </div>
  );
}
