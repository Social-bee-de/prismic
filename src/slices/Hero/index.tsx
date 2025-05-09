import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-regular-svg-icons';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicNextLink } from '@prismicio/next';
import { type Content, isFilled } from '@prismicio/client';
import { getServerTranslations } from '@/i18n/server';

type HeroSliceProps = {
  slice: Content.HeroSlice | any;
  context?: any;
}

const Hero = async ({ slice }: HeroSliceProps) => {
  const { language } = await getServerTranslations('translation');
  const isGerman = language === 'de';
  
  // Select language-specific content with fallbacks
  const titleField = isGerman
    ? (isFilled.richText(slice.primary.title_de) ? slice.primary.title_de : slice.primary.title)
    : (isFilled.richText(slice.primary.title_en) ? slice.primary.title_en : slice.primary.title);
    
  const mobileTitleField = isGerman
    ? (isFilled.richText(slice.primary.mobile_title_de) ? slice.primary.mobile_title_de : 
      (isFilled.richText(slice.primary.mobile_title) ? slice.primary.mobile_title : titleField))
    : (isFilled.richText(slice.primary.mobile_title_en) ? slice.primary.mobile_title_en : 
      (isFilled.richText(slice.primary.mobile_title) ? slice.primary.mobile_title : titleField));
      
  const mobileDescriptionField = isGerman
    ? (isFilled.richText(slice.primary.mobile_description_de) ? slice.primary.mobile_description_de : slice.primary.mobile_description)
    : (isFilled.richText(slice.primary.mobile_description_en) ? slice.primary.mobile_description_en : slice.primary.mobile_description);
    
  // Find Jobs section
  const findJobsTitleField = isGerman
    ? (isFilled.richText(slice.primary.find_jobs_title_de) ? slice.primary.find_jobs_title_de : slice.primary.find_jobs_title)
    : (isFilled.richText(slice.primary.find_jobs_title_en) ? slice.primary.find_jobs_title_en : slice.primary.find_jobs_title);
    
  const findJobsDescriptionField = isGerman
    ? (isFilled.richText(slice.primary.find_jobs_description_de) ? slice.primary.find_jobs_description_de : slice.primary.find_jobs_description)
    : (isFilled.richText(slice.primary.find_jobs_description_en) ? slice.primary.find_jobs_description_en : slice.primary.find_jobs_description);
    
  const findJobsButtonText = isGerman
    ? (slice.primary.find_jobs_button_text_de || slice.primary.find_jobs_button_text || "Jobs finden")
    : (slice.primary.find_jobs_button_text_en || slice.primary.find_jobs_button_text || "Find jobs");
    
  const findJobsButtonLink = isGerman
    ? (isFilled.link(slice.primary.find_jobs_button_link_de) ? slice.primary.find_jobs_button_link_de : slice.primary.find_jobs_button_link)
    : (isFilled.link(slice.primary.find_jobs_button_link_en) ? slice.primary.find_jobs_button_link_en : slice.primary.find_jobs_button_link);
    
  // Hire Talent section
  const hireTalentTitleField = isGerman
    ? (isFilled.richText(slice.primary.hire_talent_title_de) ? slice.primary.hire_talent_title_de : slice.primary.hire_talent_title)
    : (isFilled.richText(slice.primary.hire_talent_title_en) ? slice.primary.hire_talent_title_en : slice.primary.hire_talent_title);
    
  const hireTalentDescriptionField = isGerman
    ? (isFilled.richText(slice.primary.hire_talent_description_de) ? slice.primary.hire_talent_description_de : slice.primary.hire_talent_description)
    : (isFilled.richText(slice.primary.hire_talent_description_en) ? slice.primary.hire_talent_description_en : slice.primary.hire_talent_description);
    
  const hireTalentButtonText = isGerman
    ? (slice.primary.hire_talent_button_text_de || slice.primary.hire_talent_button_text || "Talent einstellen")
    : (slice.primary.hire_talent_button_text_en || slice.primary.hire_talent_button_text || "Hire talent");
    
  const hireTalentButtonLink = isGerman
    ? (isFilled.link(slice.primary.hire_talent_button_link_de) ? slice.primary.hire_talent_button_link_de : slice.primary.hire_talent_button_link)
    : (isFilled.link(slice.primary.hire_talent_button_link_en) ? slice.primary.hire_talent_button_link_en : slice.primary.hire_talent_button_link);
  
  return (
    <div className='w-full lg:h-[862px] h-[95vh] relative bg-gradient-to-b from-[#dae9ef] via-[#ddf3f4] to-[#eef5f6] lg:px-[120px] lg:pt-[159px] lg:pb-[80px]'>
      {slice.primary.header_man_image && (
        <PrismicNextImage
          field={slice.primary.header_man_image}
          className='absolute -left-12 lg:left-1/2 lg:transform lg:translate-x-[calc(-50%+320px)] w-auto h-[40%] bottom-1 lg:top-[68px] lg:h-[584px] z-0'
          fallbackAlt=""
        />
      )}

      {slice.primary.header_woman_image && (
        <PrismicNextImage
          field={slice.primary.header_woman_image}
          className='w-auto h-[35%] lg:h-[529px] -right-12 lg:right-auto lg:left-1/2 lg:transform lg:translate-x-[calc(-50%+630px)] bottom-1 lg:top-[142px] absolute'
          fallbackAlt=""
        />
      )}
      
      <div className='w-full hidden lg:block lg:h-[300px] top-[434px] absolute bg-gradient-to-b from-transparent via-[#dcf2f3] to-[#E6F3F4]'/>
      <div className='w-full h-[20px] z-10 lg:hidden bottom-0 absolute bg-gradient-to-b from-[#dcf2f3]/20 via-[#dcf2f3]/80 to-[#E6F3F4]'/>
      <div className='w-full h-[30%] z-10 lg:hidden bottom-0 absolute bg-gradient-to-b from-transparent via-transparent to-white'/>

      <div className='min-h-[623px] flex-col justify-start items-start gap-40 hidden lg:flex mx-auto'>
        <div className='w-[608px] h-[136px] relative'>
          <div className="w-[797px] left-0 top-0 absolute text-[#121c24] text-[64px] font-bold font-['Apercu Pro'] leading-[68px] whitespace-pre-line">
            <PrismicRichText field={titleField} />
          </div>
        </div>
        <div className='self-stretch min-h-[327px] flex-col justify-start items-start gap-16 z-10'>
          <div className='self-stretch justify-start items-start gap-6 inline-flex'>
            <div className='flex-1 grow shrink basis-0 self-stretch px-[60px] pt-10 pb-14 bg-[#f6f7f8] rounded-2xl flex-col justify-start items-start gap-2 inline-flex'>
              <div className='self-stretch min-h-[215px] h-full flex-col justify-start items-start gap-2 flex'>
                <div className="self-stretch text-[#121c24] text-[32px] font-bold font-['Apercu Pro'] leading-[38.40px]">
                  <PrismicRichText field={findJobsTitleField} />
                </div>
                <div className='self-stretch flex-col justify-between h-full items-start gap-8 flex'>
                  <div className="self-stretch text-[#121c24] text-lg font-normal font-['Apercu Pro'] leading-[27px]">
                    <PrismicRichText field={findJobsDescriptionField} />
                  </div>
                  <PrismicNextLink 
                    field={findJobsButtonLink}
                    className='min-h-14 px-8 py-2.5 bg-[#fed27a] rounded-xl justify-center items-center gap-3 inline-flex'
                  >
                    <div className="text-center text-[#121c24] text-lg font-bold font-['Apercu Pro'] leading-[27px]">
                      {findJobsButtonText}
                    </div>
                  </PrismicNextLink>
                </div>
              </div>
            </div>
            <div className='flex-1 grow shrink basis-0 self-stretch px-[60px] pt-10 pb-14 bg-[#242424] rounded-2xl flex-col justify-between gap-2 inline-flex'>
              <div className='grow shrink basis-0 flex-col justify-start items-start gap-2 flex'>
                <div className="self-stretch text-white text-[32px] font-bold font-['Apercu Pro'] leading-[38.40px]">
                  <PrismicRichText field={hireTalentTitleField} />
                </div>
                <div className='self-stretch grow shrink basis-0 flex-col justify-between gap-8 h-full items-start flex'>
                  <div className="self-stretch !text-white text-lg font-normal font-['Apercu Pro'] leading-[27px]">
                    <PrismicRichText field={hireTalentDescriptionField} />
                  </div>
                  <PrismicNextLink 
                    field={hireTalentButtonLink}
                    className='min-h-14 px-8 py-2.5 bg-[#fed27a] rounded-xl justify-center items-center gap-3 inline-flex'
                  >
                    <div className="text-center text-[#242424] text-lg font-bold font-['Apercu Pro'] leading-[27px]">
                      {hireTalentButtonText}
                    </div>
                  </PrismicNextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='px-5 pt-[120px] pb-8 flex-col justify-start items-start gap-8 inline-flex overflow-hidden lg:hidden'>
        <div className='self-stretch h-[188px] flex-col justify-start items-start gap-10 flex'>
          <div className='h-[76px] relative w-full'>
            <h1 className='z-10 absolute w-full leading-[38.40px] whitespace-pre-line'>
              <PrismicRichText field={mobileTitleField} />
            </h1>
          </div>
          <div className='self-stretch h-[72px] flex-col justify-start items-start gap-8 flex'>
            <div className="self-stretch text-[#28333e] text-base font-normal @font-['Apercu Pro'] leading-normal">
              <PrismicRichText field={mobileDescriptionField} />
            </div>
          </div>
        </div>
        <div className='self-stretch justify-center gap-4 items-start inline-flex'>
          <div className='w-full h-[60px] px-4 py-2.5 bg-[#f6f7f8] rounded-lg justify-center items-center gap-3 flex z-10'>
            <FontAwesomeIcon icon={faArrowRight} className='w-6 h-6'/>
            <PrismicNextLink 
              field={findJobsButtonLink}
              className="text-center text-[#121c24] text-base font-bold font-['Apercu Pro'] leading-normal"
            >
              {findJobsButtonText}
            </PrismicNextLink>
          </div>
          <div className='w-full h-[60px] px-4 py-2.5 bg-[#242424] rounded-lg justify-center items-center gap-3 flex z-10'>
            <FontAwesomeIcon icon={faArrowRight} className='w-6 h-6 text-white'/>
            <PrismicNextLink 
              field={hireTalentButtonLink}
              className="text-center !text-white text-base font-semibold !font-['Apercu Pro'] leading-normal"
            >
              {hireTalentButtonText}
            </PrismicNextLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;