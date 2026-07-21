import { getUser } from '@/actions/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Users, Video, DollarSign, Activity } from 'lucide-react';

export default async function AdminDashboard() {
  const user = await getUser();
  if (!user || user.role !== 'ADMIN') {
    redirect('/login');
  }

  const usersCount = await prisma.user.count();
  const coursesCount = await prisma.course.count();
  const paymentsCount = await prisma.payment.count();
  
  // Example sum aggregation
  const payments = await prisma.payment.findMany({ where: { status: 'COMPLETED' } });
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--danger)' }}>لوحة الإدارة العليا</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>مرحباً {user.name}. إليك نظرة عامة على إحصائيات المنصة.</p>
      
      <div className="grid grid-cols-4" style={{ gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Users size={20} /> إجمالي المستخدمين
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{usersCount}</div>
        </div>
        
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Video size={20} /> الدورات المسجلة
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{coursesCount}</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <Activity size={20} /> المعاملات
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{paymentsCount}</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <DollarSign size={20} /> إجمالي المبيعات
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>${totalRevenue.toFixed(2)}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
          أحدث النشاطات
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>لا توجد نشاطات مسجلة حديثاً.</p>
      </div>
    </div>
  );
}
