'use client';
import { useState } from 'react';
import { CreditCard, Wallet, Bitcoin, Lock } from 'lucide-react';
import { processPayment } from '@/actions/payment';
import { Course } from '@prisma/client';

export default function PaymentClient({ course }: { course: Course }) {
  const [paymentMethod, setPaymentMethod] = useState<'VISA' | 'PAYPAL' | 'CRYPTO'>('VISA');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    const result = await processPayment(course.id, course.price, paymentMethod);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      window.location.href = '/dashboard';
    }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '4rem', display: 'flex', justifyContent: 'center', minHeight: '70vh' }}>
      
      <div className="grid grid-cols-2" style={{ gap: '2rem', marginTop: '2rem', width: '100%' }}>
        
        {/* Payment Form */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}>
            <Lock size={24} /> الدفع الآمن
          </h1>

          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => setPaymentMethod('VISA')}
              className={`btn ${paymentMethod === 'VISA' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.5rem' }}
            >
              <CreditCard size={20} /> فيزا/ماستر
            </button>
            <button 
              onClick={() => setPaymentMethod('PAYPAL')}
              className={`btn ${paymentMethod === 'PAYPAL' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.5rem' }}
            >
              <Wallet size={20} /> PayPal
            </button>
            <button 
              onClick={() => setPaymentMethod('CRYPTO')}
              className={`btn ${paymentMethod === 'CRYPTO' ? 'btn-primary' : 'btn-outline'}`}
              style={{ flex: 1, padding: '0.5rem' }}
            >
              <Bitcoin size={20} /> عملات رقمية
            </button>
          </div>

          {paymentMethod === 'VISA' && (
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
              <input type="text" placeholder="الاسم على البطاقة" className="input-field" required />
              <input type="text" placeholder="رقم البطاقة" className="input-field" maxLength={16} required />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="MM/YY" className="input-field" style={{ flex: 1 }} required />
                <input type="text" placeholder="CVC" className="input-field" style={{ flex: 1 }} maxLength={3} required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                {loading ? 'جاري المعالجة...' : 'إتمام الدفع'}
              </button>
            </form>
          )}

          {paymentMethod === 'PAYPAL' && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>سيتم معالجة الدفع عبر PayPal وحفظ اشتراكك.</p>
              <button type="button" onClick={handlePayment} className="btn btn-primary" style={{ background: '#00457C' }} disabled={loading}>
                {loading ? 'جاري المعالجة...' : 'متابعة مع PayPal'}
              </button>
            </div>
          )}

          {paymentMethod === 'CRYPTO' && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>سيتم معالجة الدفع عبر Coinbase Commerce.</p>
              <button type="button" onClick={handlePayment} className="btn btn-primary" style={{ background: '#F7931A' }} disabled={loading}>
                {loading ? 'جاري المعالجة...' : 'الدفع بالعملات الرقمية'}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="glass-card" style={{ padding: '2rem', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
            ملخص الطلب
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span>{course.title}</span>
            <span>${course.price.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>الرسوم الإدارية</span>
            <span>$0.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--secondary)' }}>
            <span>الإجمالي</span>
            <span>${course.price.toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
