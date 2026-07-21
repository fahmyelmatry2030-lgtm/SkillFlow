'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowRight, BookOpen, Star } from 'lucide-react';
import { registerAction } from '@/actions/auth';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await registerAction(formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/student');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FFFDF8]">
      
      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[50%] xl:w-[40%] lg:px-20 relative z-10 py-12">
        
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#8B5CF6] transition-colors mb-8 font-medium text-sm">
              <ArrowRight size={16} /> العودة للرئيسية
            </Link>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">أنشئ حسابك الآن 🚀</h2>
            <p className="text-slate-500 font-medium">خطوة واحدة تفصلك عن عالم من المعرفة والتطوير</p>
          </div>

          <div className="friendly-card p-8 border border-slate-100">
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="مثال: أحمد محمود"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="05xxxxxxxxx"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                    required 
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني <span className="text-slate-400 font-normal">(اختياري)</span></label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="ahmed@example.com"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                  required 
                  dir="ltr"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary w-full rounded-2xl py-4 flex items-center justify-center gap-2 text-base shadow-lg shadow-purple-500/20 mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري إنشاء الحساب...
                  </span>
                ) : (
                  <>
                    <UserPlus size={20} /> إنشاء حساب جديد
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-slate-500 font-medium">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="font-bold text-[#8B5CF6] hover:underline">
              قم بتسجيل الدخول
            </Link>
          </p>
        </div>
      </div>

      {/* Left Side - Graphic */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-[#14B8A6] to-[#0F766E] overflow-hidden rounded-r-[3rem] shadow-2xl my-4 mr-4">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:32px_32px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-xl relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center animate-bounce">
              <Star size={16} className="text-white fill-white" />
            </div>
            <BookOpen size={48} className="text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">رحلة تعلم <br/><span className="text-amber-200">تبدأ هنا</span></h2>
          <p className="text-lg lg:text-xl text-white/90 font-medium max-w-lg leading-relaxed">
            الوصول إلى مئات الدورات التدريبية المباشرة والمسجلة، واكتساب مهارات جديدة مع أفضل المحاضرين في الوطن العربي.
          </p>

          <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-right max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-bold">✔</div>
              <p className="font-bold">دورات معتمدة وموثقة</p>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-bold">✔</div>
              <p className="font-bold">تفاعل مباشر مع المحاضر</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-bold">✔</div>
              <p className="font-bold">الوصول لمدى الحياة</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
