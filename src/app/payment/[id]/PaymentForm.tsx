'use client';
import { useState } from 'react';
import { CreditCard, Tag, ShieldCheck, ShieldAlert, CheckCircle } from 'lucide-react';
import { validateCoupon, processPayment } from '@/actions/payment';

export default function PaymentForm({ course }: { course: any }) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const finalPrice = Math.max(0, course.price - discount);

  const handleApplyCoupon = async () => {
    setCouponError('');
    setCouponSuccess('');
    
    if (!coupon) return;

    const result = await validateCoupon(coupon, course.id);
    if (result.error) {
      setCouponError(result.error);
      setDiscount(0);
    } else if (result.success && result.coupon) {
      const c = result.coupon;
      setCouponSuccess('تم تطبيق الكوبون بنجاح!');
      if (c.type === 'PERCENT') {
        setDiscount(course.price * (c.value / 100));
      } else {
        setDiscount(c.value);
      }
    }
  };

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const method = formData.get('method') as string;

    const result = await processPayment(course.id, finalPrice, method, couponSuccess ? coupon : undefined);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = `/student/courses/${course.id}`;
    }
  };

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '3rem 2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>إتمام الاشتراك</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>{course.title}</p>

      {/* Refund Policy */}
      <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <ShieldCheck color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ margin: 0, color: 'var(--primary)', marginBottom: '0.25rem' }}>سياسة الاسترداد</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {course.refundPolicyDays > 0 
              ? `يمكنك استرداد أموالك بالكامل خلال ${course.refundPolicyDays} يوم من تاريخ الشراء.`
              : 'هذه الدورة غير قابلة للاسترداد نهائياً.'}
          </p>
        </div>
      </div>

      <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span>سعر الدورة:</span>
          <span>${course.price.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
            <span>قيمة الخصم:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
          <span>الإجمالي:</span>
          <span>${finalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          placeholder="كود الخصم (إن وجد)" 
          className="input-field" 
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button type="button" onClick={handleApplyCoupon} className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
          <Tag size={18} /> تطبيق
        </button>
      </div>
      
      {couponError && <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '-1rem', marginBottom: '1rem' }}>{couponError}</p>}
      {couponSuccess && <p style={{ color: 'var(--success)', fontSize: '0.85rem', marginTop: '-1rem', marginBottom: '1rem' }}>{couponSuccess}</p>}

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
            <input type="radio" name="method" value="VISA" defaultChecked />
            <CreditCard size={20} /> فيزا/ماستركارد
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} disabled={loading}>
          {loading ? 'جاري المعالجة...' : 'تأكيد الدفع'}
        </button>
      </form>
    </div>
  );
}
