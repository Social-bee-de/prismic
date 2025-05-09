import { createClient } from '@/prismicio';

const generateSitemap = (pages) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${pages.map((page) => {
        // Get all language versions of this page
        const alternates = page.alternate_languages || [];
        
        return `
          <url>
            <loc>https://yourdomain.com/${page.lang === 'en-us' ? 'en' : 'de'}/${page.uid}</loc>
            <lastmod>${new Date(page.last_publication_date).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            
            <xhtml:link 
              rel="alternate" 
              hreflang="${page.lang === 'en-us' ? 'en' : 'de'}" 
              href="https://yourdomain.com/${page.lang === 'en-us' ? 'en' : 'de'}/${page.uid}" 
            />
            
            ${alternates.map(alternate => `
              <xhtml:link 
                rel="alternate" 
                hreflang="${alternate.lang === 'en-us' ? 'en' : 'de'}" 
                href="https://yourdomain.com/${alternate.lang === 'en-us' ? 'en' : 'de'}/${alternate.uid}" 
              />
            `).join('')}
            
            <xhtml:link 
              rel="alternate" 
              hreflang="x-default" 
              href="https://yourdomain.com/en/${page.uid}" 
            />
          </url>
        `;
      }).join('')}
    </urlset>`;
};

export async function getServerSideProps({ res }) {
  const client = createClient();
  const pages = await client.getAllByType('page');
  
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateSitemap(pages));
  res.end();
  
  return {
    props: {},
  };
}

export default function Sitemap() {
  // This component doesn't need to render anything
  return null;
}