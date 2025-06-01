'use server';

import { revalidateTag } from 'next/cache';

export async function revalidate() {
  revalidateTag('company'); // tag viết thường và KHÔNG có khoảng trắng
}
