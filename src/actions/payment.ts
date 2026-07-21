'use server';

import prisma from '@/lib/prisma';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';

export async function validateCoupon(code: string, courseId: string) {
  try {
    const coupon = await prisma.coupon.findUnique({ where: { code } });
    if (!coupon) return { error: 'الكوبون غير صالح' };

    if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
      return { error: 'عذراً، هذا الكوبون منتهي الصلاحية' };
    }

    if (coupon.maxUses && coupon.usesCount >= coupon.maxUses) {
      return { error: 'عذراً، تم الوصول للحد الأقصى لاستخدام الكوبون' };
    }

    if (coupon.courseId && coupon.courseId !== courseId) {
      return { error: 'هذا الكوبون غير مخصص لهذه الدورة' };
    }

    return { success: true, coupon };
  } catch (error) {
    return { error: 'حدث خطأ غير متوقع' };
  }
}

export async function processPayment(courseId: string, amount: number, method: string, couponCode?: string) {
  const user = await getUser();
  if (!user) return { error: 'يجب تسجيل الدخول أولاً' };

  try {
    // Mock processing payment...
    
    // Create payment record
    await prisma.payment.create({
      data: {
        studentId: user.id,
        amount,
        paymentMethod: method,
        status: 'COMPLETED',
        couponCode
      }
    });

    // Create enrollment
    await prisma.enrollment.create({
      data: {
        studentId: user.id,
        courseId,
      }
    });

    // Update coupon count if used
    if (couponCode) {
      await prisma.coupon.update({
        where: { code: couponCode },
        data: { usesCount: { increment: 1 } }
      });
    }

    // Send notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: 'نجاح الدفع',
        message: 'تم تأكيد اشتراكك في الدورة بنجاح. نتمنى لك التوفيق!',
        type: 'SUCCESS'
      }
    });

    revalidatePath('/student');
    return { success: true };
  } catch (error) {
    return { error: 'فشلت عملية الدفع. يرجى المحاولة مرة أخرى.' };
  }
}
