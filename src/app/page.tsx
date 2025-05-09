import { SliceZone } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { components } from '../slices';
import { getLocales } from '@/utils/getLocales';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';


// Generate metadata for the page
export async function generateMetadata({ params }: any) {
  const client = createClient();
  
  try {
    const page = await client.getByUID('page', 'home');

    // Find the SEO slice
    const seoSlice = page.data.slices.find(slice => slice.slice_type === 'seo');
    
    // Generate metadata using our helper
    if (seoSlice) {
      return generateSeoMetadata(seoSlice);
    }
    
    // Fallback to basic metadata if no SEO slice
    return {
      title: page.data.title || '',
    };
  } catch (error) {
    return {
      title: 'Page Not Found',
    };
  }
}

export default async function Index({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const client = createClient();
  const home = await client.getByUID('page', 'home', {
    lang,
  });
  const locales = await getLocales(home, client);

  return (
    <div className='pb-20'>
      <SliceZone slices={home.data.slices} components={components} />
    </div>
  );
}