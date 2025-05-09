import { cookies } from 'next/headers';
import { Header, HeaderMobile } from 'socialbee-ui';

import logo from '../../public/logo.png';
import { getServerTranslations } from '@/i18n/server';
import { LanguageSelector } from './language-selector';

export default async function HeaderSection() {
	const { t, language } = await getServerTranslations('translation');
	const cookie = cookies().get('i18next');
	let lang = language;
	if (cookie) {
		lang = cookie.value;
	}

	const translations = {
		'header.forRefuges': t('header.forRefuges'),
		'header.forCompanies': t('header.forCompanies'),
		'header.support': t('header.support'),
		'header.diversityManagement': t('header.diversityManagement'),
		'header.aboutUs': t('header.aboutUs'),
		'header.qualificationProgrammes': t('header.qualificationProgrammes'),
		'header.jobs': t('header.jobs'),
		'header.info': t('header.info'),
		'header.loginAcademy': t('header.loginAcademy'),
		'header.candidateLogin': t('header.candidateLogin'),
		'header.femaleAccelerator': t('header.femaleAccelerator'),
		'header.otherPrograms': t('header.otherPrograms'),
		'header.interculturalReadinessAssessment': t('header.interculturalReadinessAssessment'),
		'header.press': t('header.press'),
		'header.career': t('header.career'),
		'header.contactUs': t('header.contactUs'),
	};

	return (
		<>
			<HeaderMobile
				whiteBackground
				showBanner
				logoSrc={logo.src}
				translations={translations}
				bannerUrl='https://go.socialbee.org/untapped'
				bannerText={t('header.banner')}
				bannerButtonText={t('header.bannerButtonText')}
				zIndex={50}
			>
				<LanguageSelector language={language}/>
			</HeaderMobile>
			<Header
				whiteBackground
				showBanner
				logoSrc={logo.src}
				bannerText={t('header.banner')}
				bannerUrl='https://go.socialbee.org/untapped'
				bannerButtonText={t('header.bannerButtonText')}
				translations={translations}
				zIndex={50}
			>
				<div className='flex items-center'>
					<LanguageSelector language={language}/>
					{/* <a href='https://info.socialbee.org/arbeit-finden/qualifikationsprogramme/' className='bg-anthracite text-text-diap-primary font-semibold lg:px-6 py-[10px] rounded-[10px]'>{t('header.findJobs')}</a> */}
				</div>
			</Header>
		</>
	);
}
