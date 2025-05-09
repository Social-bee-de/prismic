import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { createClient } from '@/prismicio';
import { components } from '../../slices';
import { getLocales } from '@/utils/getLocales';
import { generateMetadata as generateSeoMetadata } from '@/lib/seo';

type Params = { uid: string; lang: string };

// Generate metadata for the page
export async function generateMetadata({ params }: any) {
  const client = createClient();
  
  try {
    const page = await client.getByUID('page', params.uid ?? 'home');

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

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID('page', params.uid, {
      lang: params.lang,
    })
    .catch(() => notFound());

  const locales = await getLocales(page, client);

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType('page', {
    predicates: [prismic.filter.not('my.page.uid', 'home')],
    lang: '*',
  });

  return pages.map((page) => ({ uid: page.uid, lang: page.lang }));
}