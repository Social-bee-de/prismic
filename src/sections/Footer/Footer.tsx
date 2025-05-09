import React from 'react';
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaMailBulk, FaPhone } from 'react-icons/fa';
import { links } from './links';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMailBulk, faPhone } from '@fortawesome/pro-regular-svg-icons';

export interface FooterProps {
    t: (key: string) => string;
    getLink: (linkObj: { de: string; en: string }) => string;
    logoSrc: string;
    whatsappSrc: string;
}

export const Footer: React.FC<FooterProps> = ({ t, getLink, logoSrc, whatsappSrc }) => {
    return (
        <div className='bg-gray-100 z-10 p-8 text-sm w-full'>
            <div className='container  flex flex-col lg:flex-row justify-between items-start space-y-12 md:space-y-0 md:space-x-12'>
                <img
                    src={logoSrc}
                    alt="People we help"
                    width="186"
                    height="40"
                />
                <div className='flex flex-col md:flex-row justify-between w-full'>
                    <div className='mb-8 md:mb-0 md:mr-8'>
                        <p className='font-bold mb-4'>{t('footer.ForAWorld')}</p>
                        <div className='space-y-3'>
                            <div className='flex items-center gap-1'>
                                <FontAwesomeIcon icon={faPhone} size='lg' />
                                <span >+49 89 18914481</span>
                            </div>
                            <div className='flex items-center gap-1'>
                                <FontAwesomeIcon icon={faEnvelope} size='lg' />
                                <span >info@social-bee.de</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between w-full'>
                        <div className='mb-8 md:mb-0 md:mr-8'>
                            <h6 className='font-semibold mb-2 text-middle-gray uppercase'>{t('footer.LookingForWork')}</h6>
                            <a target="_blank" rel="noopener noreferrer" href={'https://info.socialbee.org/arbeit-finden/qualifikationsprogramme/'} className='bg-[#CAC7C7] hover:bg-opacity-90 text-black h-[45px] rounded-lg px-4 flex flex-row transition-colors duration-100 ease-in items-center justify-center'>
                                <span className='font-bold text-xs'>{t('footer.LookForJobs')}</span>
                            </a>
                            <div className='mt-4 gap-2 flex flex-col'>
                                <h6 className='font-semibold text-middle-gray uppercase'>{t('footer.CreateOwnImpact')}</h6>
                                <a href={getLink(links.hireAsCompany)}>
                                    {t('footer.HireAsACompany')}
                                </a>
                                <a href={getLink(links.donate)}>
                                    {t('footer.Donate')}
                                </a>
                                <a href={getLink(links.careers)}>
                                    {t('footer.Careers')}
                                </a>
                            </div>
                        </div>
                        <div className='mb-8 md:mb-0 md:mr-8 flex flex-col gap-2 min-w-[150px]'>
                            <h6 className=' text-middle-gray uppercase font-semibold'>{t('footer.OurWork')}</h6>
                            <a href={getLink(links.aboutUs)} >
                                {t('footer.AboutUs')}
                            </a>
                            <a href={getLink(links.press)} >
                                {t('footer.Press')}
                            </a>
                            <a href={getLink(links.diversityManagement)} >
                                {t('footer.DiversityManagement')}
                            </a>
                        </div>
                        <div className='mb-8 md:mb-0 md:mr-8 flex flex-col gap-2'>
                            <h6 className=' text-middle-gray uppercase font-semibold'>{t('footer.FollowUs')}</h6>
                            <div className='flex space-x-4 text-black'>
                                <a href='https://www.linkedin.com/company/social-bee-gmbh'>
                                    <FaLinkedin size='30' />
                                </a>
                                <a href='https://www.facebook.com/Socialbee.Munich'>
                                    <FaFacebookSquare size='30' />
                                </a>
                                <a href='https://www.instagram.com/socialbee_de/'>
                                    <FaInstagram size='30' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center mt-8 lg:px-5 flex-col md:flex-row gap-2'>
                <span className='font-bold'>&copy; 2024 Social-Bee gGmbH</span>
                <div className='flex space-x-1 font-bold text-xs md:text-[14px]'>
                    <a href={getLink(links.imprint)} className='text-gray-700'>
                        {t('footer.Imprint')}
                    </a>
                    <span className='text-gray-500'>|</span>
                    <a href={getLink(links.privacyPolicy)} className='text-gray-700'>
                        {t('footer.DataPrivacy')}
                    </a>
                    <span className='text-gray-500'>|</span>
                    <a href={getLink(links.privacyPolicy)} className='text-gray-700'>
                        {t('footer.Whistleblowing')}
                    </a>
                </div>
            </div>
        </div >
    );
};
