import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import PaymentForm from './PaymentForm';

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem 0' }}>
      <PaymentForm course={course} />
    </div>
  );
}
