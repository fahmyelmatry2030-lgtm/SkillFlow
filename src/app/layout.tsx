import './index.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { MobileNav } from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'المنصة | رحلتك نحو التعلم',
  description: 'منصة تعليمية بتصميم دافئ ومريح',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col pb-[76px] lg:pb-0 relative">
        
        {/* Friendly Navbar */}
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Logo (Right) */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center gap-2 text-slate-800 font-bold text-2xl">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="url(#paint0_linear_logo)"/>
                    <path d="M20 10L8 16L20 22L32 16L20 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 24L20 30L32 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 16L20 22L32 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="paint0_linear_logo" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6"/>
                        <stop offset="1" stopColor="#3B82F6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  المنصة
                </Link>
              </div>

              {/* Navigation Links (Center) */}
              <Navigation />

              {/* Actions (Left) */}
              <div className="flex items-center gap-3">
                <Link href="/login" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:text-[#8B5CF6] hover:bg-purple-50 transition-colors">
                  تسجيل الدخول
                </Link>
                <Link href="/register" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8B5CF6] text-white text-sm font-bold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-200">
                  إنشاء حساب
                </Link>
              </div>

            </div>
          </div>
        </header>

        <main className="flex-1 relative">
          {children}
        </main>

        {/* Detailed Footer */}
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-auto">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              {/* Logo & About */}
              <div>
                <Link href="/" className="flex items-center gap-2 text-slate-800 font-bold text-2xl mb-6">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="url(#paint0_linear_logo_footer)"/>
                    <path d="M20 10L8 16L20 22L32 16L20 10Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 24L20 30L32 24" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 16L20 22L32 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="paint0_linear_logo_footer" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#8B5CF6"/>
                        <stop offset="1" stopColor="#3B82F6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  المنصة
                </Link>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  منصتك الموثوقة للتعليم المباشر والتفاعلي مع نخبة من الخبراء المعتمدين في مختلف المجالات.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#8B5CF6] hover:text-white transition-colors">W</a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#8B5CF6] hover:text-white transition-colors">T</a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#8B5CF6] hover:text-white transition-colors">F</a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#8B5CF6] hover:text-white transition-colors">L</a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-[#8B5CF6] hover:text-white transition-colors">E</a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-6">روابط سريعة</h4>
                <ul className="space-y-4">
                  <li><Link href="/" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">الرئيسية</Link></li>
                  <li><Link href="/courses" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">الدورات</Link></li>
                  <li><Link href="/instructors" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">المحاضرون</Link></li>
                  <li><Link href="/verify" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">التحقق من الشهادات</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-6">الدعم</h4>
                <ul className="space-y-4">
                  <li><Link href="/contact" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">تواصل معنا</Link></li>
                  <li><Link href="/faq" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">الأسئلة الشائعة</Link></li>
                  <li><Link href="/privacy" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">سياسة الخصوصية</Link></li>
                  <li><Link href="/terms" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">الشروط والأحكام</Link></li>
                  <li><Link href="/refunds" className="text-slate-500 hover:text-[#8B5CF6] font-medium transition-colors">سياسة الاسترجاع</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-bold text-slate-800 mb-6">تواصل معنا</h4>
                <ul className="space-y-4 text-slate-500 font-medium">
                  <li>البريد: info@almanassa.com</li>
                  <li>الهاتف: +966 50 123 4567</li>
                  <li>المقر: الرياض، المملكة العربية السعودية</li>
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-100 text-center text-slate-500 font-medium">
              <p>جميع الحقوق محفوظة © 2026</p>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </body>
    </html>
  );
}
