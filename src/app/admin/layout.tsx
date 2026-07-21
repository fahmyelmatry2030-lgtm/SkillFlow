import { Settings, Users, Shield, PieChart, BookOpen, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const sidebarLinks = [
    { name: 'لوحة التحكم', href: '/admin', icon: PieChart },
    { name: 'إدارة المستخدمين', href: '/admin/users', icon: Users },
    { name: 'الدورات', href: '/admin/courses', icon: BookOpen },
    { name: 'المدفوعات', href: '/admin/payments', icon: CreditCard },
    { name: 'الصلاحيات', href: '/admin/roles', icon: Shield },
    { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="container" style={{ display: 'flex', gap: '2rem', minHeight: '80vh', padding: '2rem 0' }}>
      <aside className="glass-panel" style={{ width: '250px', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'fit-content', borderLeft: '4px solid var(--danger)' }}>
        <h2 style={{ padding: '0 1rem', fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>إدارة النظام العليا</h2>
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="btn btn-outline" style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem', padding: '1rem', border: 'none', background: 'rgba(255,255,255,0.02)' }}>
              <Icon size={20} />
              {link.name}
            </Link>
          );
        })}
      </aside>

      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
