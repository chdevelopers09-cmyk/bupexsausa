'use server';

import { createAdminClient } from '@/lib/supabase/admin';
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

export async function createPage(pageKey: string, slug: string) {
  const supabase = await createAdminClient();
  
  // Create an initial Hero section for the new page
  const { data, error } = await supabase
    .from('page_layouts')
    .insert([{
      page_key: pageKey,
      slug: slug,
      component: 'HeroSection',
      variant: 'centered-primary',
      order_index: 0,
      visible: true,
      is_draft: true,
      content: {
        badge: 'New Page',
        heading: `Welcome to ${pageKey}`,
        subheading: 'This is your newly created page. Start customizing it in the visual builder!',
        cta1Label: 'Get Started',
        cta1Url: '#'
      }
    }])
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath('/admin/visual-builder');
  return { success: true, id: data.id };
}
