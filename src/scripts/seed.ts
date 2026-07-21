import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  // 1. Create an Admin
  const admin = await prisma.user.upsert({
    where: { phone: '+201000000000' },
    update: { role: 'ADMIN', password: passwordHash },
    create: {
      phone: '+201000000000',
      email: 'admin@lms.com',
      name: 'مدير النظام',
      role: 'ADMIN',
      password: passwordHash,
    },
  });

  // 2. Create an Instructor
  const instructor = await prisma.user.upsert({
    where: { phone: '+20123456789' },
    update: { role: 'INSTRUCTOR', password: passwordHash },
    create: {
      phone: '+20123456789',
      email: 'instructor@lms.com',
      name: 'أحمد محمد',
      role: 'INSTRUCTOR',
      password: passwordHash,
    },
  });

  // 3. Create a Student
  const student = await prisma.user.upsert({
    where: { phone: '+20111111111' },
    update: { role: 'STUDENT', password: passwordHash },
    create: {
      phone: '+20111111111',
      email: 'student@lms.com',
      name: 'طالب مجتهد',
      role: 'STUDENT',
      password: passwordHash,
    },
  });

  // 4. Create mock courses (Different Statuses)
  const c1 = await prisma.course.create({
    data: {
      title: 'دورة أدوبي فوتوشوب الشاملة',
      description: 'تعلم الفوتوشوب من الصفر حتى الاحتراف مع تطبيقات عملية.',
      shortDescription: 'احترف الفوتوشوب في 4 أسابيع.',
      instructorId: instructor.id,
      durationWeeks: 4,
      totalHours: 20,
      maxStudents: 50,
      price: 99.99,
      refundPolicyDays: 7, // 7 days refund policy
      startDate: new Date('2026-08-01T00:00:00Z'),
      registrationEnd: new Date('2026-07-25T00:00:00Z'),
      status: 'OPEN',
      goals: JSON.stringify(['احتراف أدوات الفوتوشوب', 'تصميم السوشيال ميديا', 'تعديل الصور بذكاء']),
      requirements: JSON.stringify(['لا يتطلب خبرة', 'جهاز كمبيوتر']),
    },
  });

  const c2 = await prisma.course.create({
    data: {
      title: 'كورس البرمجة للمبتدئين',
      description: 'مدخل لعالم البرمجة باستخدام لغة بايثون',
      shortDescription: 'الخطوة الأولى في عالم البرمجة',
      instructorId: instructor.id,
      durationWeeks: 6,
      totalHours: 30,
      price: 150.00,
      refundPolicyDays: 0, // No refund
      startDate: new Date('2026-06-01T00:00:00Z'),
      registrationEnd: new Date('2026-05-25T00:00:00Z'),
      status: 'ENDED', // This course has ended
    }
  });

  // 5. Add mock lectures
  const l1 = await prisma.lecture.create({
    data: {
      title: 'مقدمة في واجهة البرنامج',
      type: 'RECORDED',
      courseId: c1.id,
    }
  });
  
  const l2 = await prisma.lecture.create({
    data: {
      title: 'تطبيق عملي مباشر (تصميم إعلان)',
      type: 'LIVE',
      liveStatus: 'SCHEDULED', // SCHEDULED, LIVE, ENDED
      courseId: c1.id,
      date: new Date('2026-08-02T18:00:00Z'),
    }
  });

  // 6. Create Coupons
  await prisma.coupon.create({
    data: {
      code: 'WELCOME50',
      type: 'PERCENT',
      value: 50.0,
      maxUses: 100,
      expiryDate: new Date('2026-12-31T00:00:00Z'),
    }
  });

  await prisma.coupon.create({
    data: {
      code: 'DISCOUNT10',
      type: 'FIXED',
      value: 10.0,
      courseId: c1.id,
    }
  });

  // 7. Create Mock Enrollments, Attendance & Reviews
  await prisma.enrollment.create({
    data: {
      studentId: student.id,
      courseId: c2.id,
    }
  });

  await prisma.review.create({
    data: {
      studentId: student.id,
      courseId: c2.id,
      rating: 5,
      comment: 'دورة ممتازة جدا والمحاضر رائع',
      isApproved: true,
    }
  });

  // 8. Create Notification
  await prisma.notification.create({
    data: {
      userId: student.id,
      title: 'مرحباً بك في المنصة',
      message: 'تم تفعيل حسابك بنجاح. نتمنى لك تجربة تعليمية ممتعة!',
      type: 'SUCCESS',
    }
  });

  console.log('Database seeded successfully with new Phase 4 features!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
