'use server';

import prisma from '@/lib/prisma';

export async function verifyCertificateAction(formData: FormData) {
  const code = formData.get('code') as string;
  
  if (!code) {
    return { error: 'الرجاء إدخال كود الشهادة' };
  }

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: code },
      include: {
        student: true,
      }
    });

    if (!certificate) {
      return { error: 'الشهادة غير موجودة أو الكود غير صحيح' };
    }

    return { 
      success: true, 
      certificate: {
        studentName: certificate.student.name,
        courseName: certificate.courseName,
        instructorName: certificate.instructorName,
        issuedAt: certificate.issuedAt,
        status: 'صحيحة وموثقة'
      }
    };
  } catch (err) {
    return { error: 'حدث خطأ أثناء البحث عن الشهادة' };
  }
}
