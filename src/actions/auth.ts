'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!phone || !password || !name) {
    return { error: 'يرجى تعبئة الحقول الإجبارية (الاسم، رقم الهاتف، وكلمة المرور).' };
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: phone },
          ...(email ? [{ email: email }] : []),
        ],
      },
    });

    if (existingUser) {
      return { error: 'رقم الهاتف أو البريد الإلكتروني مسجل مسبقاً.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email: email || undefined,
        password: hashedPassword,
        role: 'STUDENT',
      },
    });

    // Automatically log in after registration
    await setAuthCookie(user.id);
    return { success: true };
  } catch (error) {
    console.error('Registration Error:', error);
    return { error: 'حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقاً.' };
  }
}

export async function loginWithPasswordAction(formData: FormData) {
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  if (!phone || !password) {
    return { error: 'رقم الهاتف وكلمة المرور مطلوبان.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user || !user.password) {
      return { error: 'بيانات الدخول غير صحيحة.' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: 'بيانات الدخول غير صحيحة.' };
    }

    await setAuthCookie(user.id);
    return { success: true, role: user.role };
  } catch (error) {
    console.error('Login Error:', error);
    return { error: 'حدث خطأ أثناء تسجيل الدخول.' };
  }
}

async function setAuthCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set('userId', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('userId');
  redirect('/login');
}

export async function getUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    return null;
  }
}
