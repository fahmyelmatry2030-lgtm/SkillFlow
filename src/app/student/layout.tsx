import Link from 'next/link';
import { BookOpen, User, PlayCircle, ShieldCheck, LogOut, LayoutDashboard, Settings, Bell } from 'lucide-react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import '../index.css';

export default async function StudentLayout({
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

  if (!user || user.role !== 'STUDENT') {
    redirect('/login');
  }

  const navItems = [
    { name: 'لوحة التحكم', href: '/student', icon: LayoutDashboard },
    { name: 'دوراتي', href: '/student/courses', icon: BookOpen },
    { name: 'المحاضرات', href: '/student/lectures', icon: PlayCircle },
    { name: 'الشهادات', href: '/student/certificates', icon: ShieldCheck },
    { name: 'الملف الشخصي', href: '/student/profile', icon: User },
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
        </div>

        {/* User Profile Summary */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.2rem' }}>
            {user.name?.charAt(0) || user.phone.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--foreground)' }}>{user.name || 'طالب'}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{user.phone}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: '1.5rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header */}
        <header style={{ height: '72px', background: 'var(--card)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>مرحباً بك، {user.name || 'طالب'}! 👋</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <Bell size={18} color="var(--muted-foreground)" />
              <span style={{ position: 'absolute', top: '8px', right: '10px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%' }}></span>
            </button>
            <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Settings size={18} color="var(--muted-foreground)" />
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
