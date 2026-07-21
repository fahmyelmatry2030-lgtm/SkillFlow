'use server';
import prisma from '@/lib/prisma';

export async function verifyCertificateAction(code: string) {
  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: code },
      include: {
        student: true,
      },
    });

    if (!certificate) {
      return { valid: false, message: 'لم يتم العثور على أي شهادة بهذا الكود.' };
    }

    return {
      valid: true,
      data: {
        studentName: certificate.student.name || certificate.student.phone,
        courseName: certificate.courseName,
        issuedAt: certificate.issuedAt.toLocaleDateString('ar-EG'),
      },
    };
  } catch (error) {
    console.error('Verify Error:', error);
    return { valid: false, message: 'حدث خطأ أثناء الاتصال بقاعدة البيانات.' };
  }
}
