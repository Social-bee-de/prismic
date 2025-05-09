import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { getServerTranslations } from '@/i18n/server';
import { isFilled } from '@prismicio/client';
import QuestionItem from './QuestionItem'; // Import from separate file

type FAQSectionSliceProps = {
  slice: any;
  context?: any;
}

async function FAQSectionSlice({ slice, context }: FAQSectionSliceProps) {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';

  // Get language-specific content for title
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);

  // Get language-specific content for description
  const descriptionField = isGerman
    ? (isFilled.richText(slice.primary.description_de) ? slice.primary.description_de : slice.primary.description)
    : (isFilled.richText(slice.primary.description_en) ? slice.primary.description_en : slice.primary.description);

  // Fetch questions if they're linked rather than embedded
  let questions = slice.items;
  
  if (slice.primary.fetch_questions && slice.primary.faq_content_type) {
    const client = createClient();
    const faqContent: any = await client.getSingle(slice.primary.faq_content_type);
    
    if (faqContent && faqContent.data && faqContent.data.slices) {
      // These will be slices with the slice_type 'question'
      questions = faqContent.data.slices.filter((slice: any) => slice.slice_type === 'question');
    }
  }

  return (
    <section className="faq-section py-12 px-4 md:px-8 lg:px-12">
      {titleField && (
        <div className="faq-title mb-4 md:mb-6">
          <PrismicRichText field={titleField} />
        </div>
      )}
      
      {descriptionField && (
        <div className="faq-description mb-8 md:mb-10 max-w-3xl">
          <PrismicRichText field={descriptionField} />
        </div>
      )}
      
      <div className="faq-questions space-y-4 md:space-y-6">
        {questions.map((questionItem: any, index: number) => {
          // For fetched questions (slices), use the slice itself
          if (questionItem.slice_type === 'question') {
            return (
              <QuestionItem 
                key={`question-${index}`} 
                question={questionItem.primary}
                language={language}
                startOpen={index === 0} // Open the first question by default
              />
            );
          }
          // For embedded questions (items), use the item directly
          else {
            return (
              <QuestionItem 
                key={`question-${index}`} 
                question={questionItem}
                language={language}
                startOpen={index === 0} // Open the first question by default
              />
            );
          }
        })}
      </div>
    </section>
  );
}

export default FAQSectionSlice;