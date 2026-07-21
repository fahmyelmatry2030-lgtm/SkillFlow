'use client';

import { useState } from 'react';
import { Search, CheckCircle, XCircle, Award, Loader2, ShieldCheck } from 'lucide-react';
import { verifyCertificateAction } from '@/actions/certificates';

export default function VerifyCertificate() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'valid' | 'invalid'>('idle');
  const [certData, setCertData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    setStatus('verifying');
    
    // Simulate API call for the UI preview (since we don't have real data yet)
    // In a real app, this would use the real verifyCertificateAction
    setTimeout(() => {
      if (code.toLowerCase() === '1234') {
        setCertData({
          studentName: 'أحمد محمود',
          courseName: 'احتراف تطوير واجهات المستخدم الشاملة',
          issuedAt: '2025-10-15'
        });
        setStatus('valid');
      } else {
        setErrorMessage('عذراً، لم نتمكن من العثور على شهادة بهذا الكود. يرجى التأكد من الكود والمحاولة مرة أخرى.');
        setStatus('invalid');
      }
    }, 1500);
  };

  return (
    <div className="bg-[#FFFDF8] min-h-[calc(100vh-80px)] py-16 relative flex items-center justify-center">
      <div className="hero-glow opacity-50 hidden md:block"></div>
      
      <div className="max-w-2xl w-full mx-auto px-4 relative z-10">
        
        <div className="friendly-card p-8 md:p-12 border border-slate-100 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-50 rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 bg-purple-50 text-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-purple-100">
              <ShieldCheck size={40} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">التحقق من <span className="text-[#8B5CF6]">الشهادات</span></h1>
            
            <p className="text-slate-500 mb-10 leading-relaxed max-w-lg mx-auto font-medium">
              نظامنا مدعوم بتشفير متقدم لمنع التزوير. أدخل كود التحقق الموجود على الشهادة للتأكد من صحتها وموثوقيتها.
              <br/> <span className="text-xs text-slate-400 mt-2 block">(للتجربة: أدخل الكود 1234 لشهادة صحيحة، أو أي كود آخر لشهادة خاطئة)</span>
            </p>

            <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  placeholder="أدخل كود الشهادة (مثال: cert-1234-abcd)" 
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-6 py-4 text-center md:text-right font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all text-lg" 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  dir="ltr"
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-primary rounded-full px-8 py-4 text-lg w-full md:w-auto flex items-center justify-center min-w-[140px]" 
                disabled={status === 'verifying' || !code}
              >
                {status === 'verifying' ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <>
                    <Search size={20} className="ml-2" /> تحقق الآن
                  </>
                )}
              </button>
            </form>

            {/* Success State */}
            {status === 'valid' && certData && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 md:p-8 animate-fade-in text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
                <CheckCircle size={56} className="text-emerald-500 mx-auto mb-4" />
                <h2 className="text-emerald-700 text-2xl font-black mb-6">الشهادة صحيحة ومعتمدة رسمياً</h2>
                
                <div className="bg-white rounded-xl p-5 border border-emerald-50 text-right space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-400 font-bold text-sm">اسم المتدرب</span>
                    <span className="text-slate-800 font-black text-lg">{certData.studentName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-400 font-bold text-sm">اسم الدورة</span>
                    <span className="text-[#8B5CF6] font-black">{certData.courseName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold text-sm">تاريخ الإصدار</span>
                    <span className="text-slate-600 font-bold">{certData.issuedAt}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {status === 'invalid' && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8 animate-fade-in text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                <XCircle size={56} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-red-700 text-2xl font-black mb-3">الشهادة غير صحيحة</h2>
                <p className="text-red-500 font-medium leading-relaxed">
                  {errorMessage}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
