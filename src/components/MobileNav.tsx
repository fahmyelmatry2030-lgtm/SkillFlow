'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Users, User } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'الرئيسية', href: '/', icon: Home },
    { name: 'الدورات', href: '/courses', icon: BookOpen },
    { name: 'المحاضرون', href: '/instructors', icon: Users },
    { name: 'حسابي', href: '/login', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 px-6 py-3 pb-safe">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/' 
            ? pathname === '/'
            : pathname.startsWith(item.href);
            
          const Icon = item.icon;

          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
                isActive ? 'text-[#8B5CF6]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                isActive ? 'bg-purple-50' : 'bg-transparent'
              }`}>
                <Icon size={22} className={isActive ? 'fill-purple-100' : ''} />
              </div>
              <span className={`text-[11px] font-bold ${isActive ? 'text-[#8B5CF6]' : 'text-slate-500'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
