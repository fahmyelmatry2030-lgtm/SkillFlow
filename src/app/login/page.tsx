'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { loginWithPasswordAction } from '@/actions/auth';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const res = await loginWithPasswordAction(formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      if (res.role === 'INSTRUCTOR') router.push('/instructor');
      else if (res.role === 'ADMIN') router.push('/admin');
      else router.push('/student');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FFFDF8]">
      
      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[50%] xl:w-[40%] lg:px-20 relative z-10">
        
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#8B5CF6] transition-colors mb-8 font-medium text-sm">
              <ArrowRight size={16} /> العودة للرئيسية
            </Link>
            
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-3">مرحباً بعودتك! 👋</h2>
            <p className="text-slate-500 font-medium">قم بتسجيل الدخول لمتابعة رحلتك التعليمية</p>
          </div>

          <div className="friendly-card p-8 border border-slate-100">
            {error && (
              <div className="mb-6 bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-2 animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف أو البريد الإلكتروني</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="phone"
                    placeholder="أدخل بريدك أو رقم هاتفك"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                    required 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">كلمة المرور</label>
                  <Link href="#" className="text-sm font-bold text-[#8B5CF6] hover:underline">نسيت الكلمة؟</Link>
                </div>
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
                className="btn btn-primary w-full rounded-2xl py-4 flex items-center justify-center gap-2 text-base shadow-lg shadow-purple-500/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    جاري الدخول...
                  </span>
                ) : (
                  <>
                    <LogIn size={20} /> تسجيل الدخول
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-slate-500 font-medium">
            ليس لديك حساب بعد؟{' '}
            <Link href="/register" className="font-bold text-[#8B5CF6] hover:underline">
              أنشئ حساباً مجانياً
            </Link>
          </p>
        </div>
      </div>

      {/* Left Side - Graphic */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] overflow-hidden rounded-r-[3rem] shadow-2xl my-4 mr-4">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:32px_32px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/30 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/20 shadow-xl relative">
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles size={16} className="text-white" />
            </div>
            <ShieldCheck size={48} className="text-white" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">استثمر في مستقبلك <br/><span className="text-teal-200">المهني اليوم!</span></h2>
          <p className="text-lg lg:text-xl text-white/80 font-medium max-w-lg leading-relaxed">
            انضم لآلاف الطلاب والخبراء الذين يشاركون المعرفة ويبنون مستقبلاً مشرقاً من خلال منصتنا التعليمية الرائدة.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex -space-x-4 space-x-reverse">
              <div className="w-12 h-12 rounded-full border-2 border-[#6D28D9] bg-emerald-400 z-30"></div>
              <div className="w-12 h-12 rounded-full border-2 border-[#6D28D9] bg-amber-400 z-20"></div>
              <div className="w-12 h-12 rounded-full border-2 border-[#6D28D9] bg-sky-400 z-10"></div>
              <div className="w-12 h-12 rounded-full border-2 border-[#6D28D9] bg-pink-400 flex items-center justify-center font-bold text-sm">+10k</div>
            </div>
            <span className="text-white/80 font-bold text-sm">متدرب نشط على المنصة</span>
          </div>
        </div>
      </div>

    </div>
  );
}
