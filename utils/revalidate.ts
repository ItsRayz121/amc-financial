'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

export async function revalidatePublicPages() {
  revalidatePath('/', 'page')
  revalidateTag('site-links')
  revalidateTag('site-content')
}
