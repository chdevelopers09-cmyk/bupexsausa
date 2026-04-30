'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateLayout(sections: any[]) {
  const supabase = await createAdminClient();
  
  // Update each section's order and visibility
  const updates = sections.map((s, index) => ({
    id: s.id,
    order_index: index,
    visible: s.visible,
    is_draft: true, // Mark as draft until published
  }));

  const { error } = await supabase.from('page_layouts').upsert(updates);
  
  if (error) return { error: error.message };

  revalidatePath('/admin/visual-builder');
  return { success: true };
}

export async function publishPage(pageKey: string) {
  const supabase = await createAdminClient();
  
  // Set all sections for this page as NOT draft
  const { error } = await supabase
    .from('page_layouts')
    .update({ is_draft: false })
    .eq('page_key', pageKey);

  if (error) return { error: error.message };

  revalidatePath('/'); // Revalidate home or relevant pages
  revalidatePath('/admin/visual-builder');
  
  return { success: true };
}

export async function saveSectionContent(id: string, content: any) {
  const supabase = await createAdminClient();
  
  const { error } = await supabase
    .from('page_layouts')
    .update({ 
      content,
      is_draft: true // Mark as draft when content changes
    })
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath(`/admin/visual-builder/content/${id}`);
  return { success: true };
}
