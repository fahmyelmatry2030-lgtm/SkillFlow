import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#FFFDF8] min-h-screen py-16 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="hero-glow opacity-50 hidden md:block"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-100 rounded-full blur-[100px] opacity-40 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-100 rounded-full blur-[80px] opacity-40 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-purple-50 text-[#8B5CF6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-purple-100">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">تواصل <span className="text-[#8B5CF6]">معنا</span></h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            نحن هنا لمساعدتك. سواء كان لديك استفسار عن دورة، أو تواجه مشكلة تقنية، أو ترغب في الانضمام كمحاضر، لا تتردد في مراسلتنا.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Contact Info (Right Side) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            <div className="friendly-card p-8 border border-slate-100 flex items-start gap-4 group hover:border-purple-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-50 text-[#8B5CF6] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">البريد الإلكتروني</h3>
                <p className="text-slate-500 font-medium mb-2">للاستفسارات العامة والدعم التقني</p>
                <a href="mailto:info@almanassa.com" className="text-[#8B5CF6] font-bold text-lg hover:underline" dir="ltr">info@almanassa.com</a>
              </div>
            </div>

            <div className="friendly-card p-8 border border-slate-100 flex items-start gap-4 group hover:border-teal-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-[#14B8A6] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">رقم الهاتف</h3>
                <p className="text-slate-500 font-medium mb-2">متاحون من الأحد للخميس (9ص - 5م)</p>
                <a href="tel:+966501234567" className="text-[#14B8A6] font-bold text-lg hover:underline" dir="ltr">+966 50 123 4567</a>
              </div>
            </div>

            <div className="friendly-card p-8 border border-slate-100 flex items-start gap-4 group hover:border-amber-200 transition-colors">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">المقر الرئيسي</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  المملكة العربية السعودية،<br/>
                  الرياض، طريق الملك فهد،<br/>
                  برج الابتكار، الدور 15
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form (Left Side) */}
          <div className="lg:col-span-3">
            <div className="friendly-card p-8 md:p-10 border border-slate-100 relative overflow-hidden">
              {/* Decoration inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full opacity-50"></div>
              
              <h2 className="text-2xl font-black text-slate-800 mb-8 relative z-10">أرسل لنا رسالة</h2>
              
              <form className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="أحمد محمد"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      placeholder="ahmed@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">نوع الاستفسار</label>
                  <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all">
                    <option>استفسار عام</option>
                    <option>مشكلة تقنية</option>
                    <option>الانضمام كمحاضر</option>
                    <option>شراكة أعمال</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">نص الرسالة <span className="text-red-500">*</span></label>
                  <textarea 
                    rows={5}
                    placeholder="اكتب رسالتك هنا بوضوح وسنقوم بالرد عليك في أقرب وقت..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                  ></textarea>
                </div>

                <button type="button" className="btn btn-primary rounded-full py-4 text-lg w-full flex items-center justify-center gap-2 mt-2">
                  <Send size={20} /> إرسال الرسالة الآن
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
