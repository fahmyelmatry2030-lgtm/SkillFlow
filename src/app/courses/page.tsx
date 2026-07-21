'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, Clock, Users, PlayCircle } from 'lucide-react';

const mockCourses = [
  { id: 1, title: 'دورة احتراف تطوير واجهات المستخدم', category: 'برمجة وتطوير', priceType: 'مدفوع', price: 99, instructor: 'أحمد محمود', rating: 4.9, reviews: 120, duration: 12, seats: 5, date: '2025-10-01' },
  { id: 2, title: 'أساسيات تصميم الجرافيك', category: 'تصميم جرافيك', priceType: 'مجاني', price: 0, instructor: 'سارة خالد', rating: 4.7, reviews: 85, duration: 8, seats: 20, date: '2025-10-05' },
  { id: 3, title: 'مقدمة في الأمن السيبراني', category: 'أمن سيبراني', priceType: 'مدفوع', price: 150, instructor: 'خالد السعيد', rating: 5.0, reviews: 200, duration: 20, seats: 2, date: '2025-09-20' },
  { id: 4, title: 'التسويق الرقمي عبر منصات التواصل', category: 'تسويق رقمي', priceType: 'مدفوع', price: 75, instructor: 'منى علي', rating: 4.5, reviews: 45, duration: 10, seats: 15, date: '2025-10-10' },
  { id: 5, title: 'إدارة الأعمال للمبتدئين', category: 'إدارة أعمال', priceType: 'مدفوع', price: 120, instructor: 'محمد حسن', rating: 4.8, reviews: 150, duration: 15, seats: 8, date: '2025-09-25' },
  { id: 6, title: 'تطوير تطبيقات الموبايل', category: 'برمجة وتطوير', priceType: 'مدفوع', price: 199, instructor: 'أحمد محمود', rating: 4.9, reviews: 300, duration: 25, seats: 0, date: '2025-08-15' },
  { id: 7, title: 'أساسيات البرمجة للمبتدئين', category: 'برمجة وتطوير', priceType: 'مجاني', price: 0, instructor: 'علي عمر', rating: 4.6, reviews: 60, duration: 5, seats: 50, date: '2025-11-01' },
];

const categoriesList = ['برمجة وتطوير', 'تصميم جرافيك', 'أمن سيبراني', 'تسويق رقمي', 'إدارة أعمال'];
const pricesList = ['مجاني', 'مدفوع'];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('الأحدث');

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const togglePrice = (price: string) => {
    setSelectedPrices(prev => 
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    );
  };

  // 1. Filter
  let filteredCourses = useMemo(() => {
    let result = mockCourses;

    if (searchQuery) {
      result = result.filter(c => c.title.includes(searchQuery) || c.instructor.includes(searchQuery));
    }

    if (selectedCategories.length > 0) {
      result = result.filter(c => selectedCategories.includes(c.category));
    }

    if (selectedPrices.length > 0) {
      result = result.filter(c => selectedPrices.includes(c.priceType));
    }

    // 2. Sort
    if (sortOption === 'الأحدث') {
      result = [...result].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortOption === 'الأعلى تقييماً') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'السعر: من الأقل للأعلى') {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    return result;
  }, [searchQuery, selectedCategories, selectedPrices, sortOption]);

  return (
    <div className="bg-[#FFFDF8] min-h-screen py-16 relative">
      <div className="hero-glow opacity-50 hidden md:block"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">تصفح <span className="text-[#8B5CF6]">جميع الدورات</span></h1>
          <p className="text-lg text-slate-500 font-medium">اختر من بين مئات الدورات المباشرة والمسجلة لتطوير مهاراتك.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-[320px] shrink-0 friendly-card p-6 sticky top-24 border border-slate-100">
            <div className="flex items-center gap-2 mb-8 text-xl font-black text-slate-800">
              <Filter size={24} className="text-[#8B5CF6]" /> الفلاتر
            </div>
            
            {/* Search */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-700 mb-3">بحث</h3>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 focus:border-[#8B5CF6] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] transition-all" 
                  placeholder="ابحث عن دورة..." 
                />
                <Search size={18} className="text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-700 mb-3">التصنيفات</h3>
              <div className="flex flex-col gap-3">
                {categoriesList.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer text-slate-600 font-medium hover:text-[#8B5CF6] transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-5 h-5 rounded border-slate-300 text-[#8B5CF6] focus:ring-[#8B5CF6]" 
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <h3 className="font-bold text-slate-700 mb-3">السعر</h3>
              <div className="flex flex-col gap-3">
                {pricesList.map(price => (
                  <label key={price} className="flex items-center gap-3 cursor-pointer text-slate-600 font-medium hover:text-[#8B5CF6] transition-colors">
                    <input 
                      type="checkbox" 
                      checked={selectedPrices.includes(price)}
                      onChange={() => togglePrice(price)}
                      className="w-5 h-5 rounded border-slate-300 text-[#8B5CF6] focus:ring-[#8B5CF6]" 
                    />
                    {price}
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
                setSelectedPrices([]);
                setSortOption('الأحدث');
              }}
              className="btn btn-outline w-full"
            >
              إعادة ضبط الفلاتر
            </button>
          </aside>

          {/* Courses Grid */}
          <div className="flex-1 w-full">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-100">
              <div className="text-slate-500 font-bold">عرض {filteredCourses.length} دورات متاحة</div>
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8B5CF6]"
              >
                <option>الأحدث</option>
                <option>الأعلى تقييماً</option>
                <option>السعر: من الأقل للأعلى</option>
              </select>
            </div>

            {/* Grid */}
            {filteredCourses.length === 0 ? (
              <div className="friendly-card p-12 text-center text-slate-500 font-bold text-lg">
                عذراً، لم يتم العثور على دورات تطابق الفلتر المحدد.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="friendly-card flex flex-col border border-slate-100">
                    
                    <div className="h-56 bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                      <PlayCircle size={48} className="text-slate-300 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-4 right-4 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#8B5CF6] shadow-md">
                        {course.seats > 0 ? 'متاح للتسجيل' : 'مكتمل'}
                      </div>
                      <div className="absolute top-4 left-4 bg-slate-900/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                        {course.category}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-800 mb-2 leading-relaxed">
                        {course.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-[#8B5CF6] font-black text-xs">
                          {course.instructor.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-600">{course.instructor}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm font-medium text-slate-500 mb-6 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-amber-400" fill="currentColor" /> {course.rating} ({course.reviews})
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} /> {course.duration} ساعة
                        </div>
                        <div className={`flex items-center gap-1 ${course.seats > 0 ? 'text-[#10B981]' : 'text-red-500'}`}>
                          <Users size={16} /> {course.seats > 0 ? `${course.seats} مقاعد` : 'مكتمل'}
                        </div>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                        <div className="text-2xl font-black text-slate-800">
                          {course.price === 0 ? 'مجاني' : `$${course.price}`}
                        </div>
                        <Link href={`/courses/${course.id}`} className="btn btn-primary px-6 py-2.5 text-sm">
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
      </div>
    </div>
  );
}
