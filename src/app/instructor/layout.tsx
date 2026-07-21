import Link from 'next/link';
import { LayoutDashboard, Users, BookOpen, PlayCircle, Settings, DollarSign, LogOut, Bell, Award } from 'lucide-react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import '../index.css';

export default async function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId')?.value;

  if (!userId) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== 'INSTRUCTOR') {
    redirect('/login');
  }

  const navItems = [
    { name: 'اللوحة الرئيسية', href: '/instructor', icon: LayoutDashboard },
    { name: 'إدارة الدورات', href: '/instructor/courses', icon: BookOpen },
    { name: 'الطلاب', href: '/instructor/students', icon: Users },
    { name: 'المحاضرات المباشرة', href: '/instructor/lectures', icon: PlayCircle },
    { name: 'الكويزات', href: '/instructor/quizzes', icon: Award },
    { name: 'الأرباح', href: '/instructor/revenue', icon: DollarSign },
    { name: 'الإعدادات', href: '/instructor/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }} dir="rtl">
      
      {/* SaaS Sidebar */}
      <aside style={{ width: '280px', background: 'var(--card)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Brand */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="white" />
            </div>
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--foreground)' }}>المنصة</span>
          </Link>
          <div className="badge badge-accent" style={{ marginTop: '0.5rem', fontSize: '0.7rem' }}>حساب محاضر</div>
        </div>

        {/* User Profile Summary */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '1.2rem', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}>
            {(user.name || 'M').charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--foreground)' }}>{user.name || 'محاضر'}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{user.phone}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <item.icon size={18} />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid var(--border)' }}>
          <Link href="/logout" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--danger)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
            <LogOut size={18} />
            تسجيل الخروج
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '72px', background: 'var(--card)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--foreground)' }}>لوحة المحاضر</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/instructor/courses/new" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ إنشاء دورة جديدة</Link>
            <div style={{ width: '1px', height: '24px', background: 'var(--border)' }}></div>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} color="var(--muted-foreground)" />
              <span style={{ position: 'absolute', top: '8px', right: '10px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>

    </div>
  );
}
