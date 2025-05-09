import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { getServerTranslations } from '@/i18n/server';
import logo from '../../public/logo.png';
import { LanguageSelector } from './language-selector';

export default async function HeaderMobile() {
	const { t, language } = await getServerTranslations('translation');
	const cookie = cookies().get('i18next');
	let lang = language;
	if (cookie) {
		lang = cookie.value;
	}

	return (
		<section className='w-screen h-20 fixed z-20 lg:hidden'>
			<div className='flex items-center justify-between h-full px-4'>
				<Image src={logo} alt='People we help' width='186' height='40'/>
				<div className='relative'>
					<input type='checkbox' id='menu-toggle' className='peer hidden-checkbox'/>
					<label htmlFor='menu-toggle' className='flex flex-col cursor-pointer z-50'>
						<span className='block w-6 h-0.5 bg-black mb-1 transition-transform peer-checked:rotate-45 peer-checked:translate-y-1.5'/>
						<span className='block w-6 h-0.5 bg-black mb-1 transition-opacity peer-checked:opacity-0'/>
						<span className='block w-6 h-0.5 bg-black transition-transform peer-checked:-rotate-45 peer-checked:-translate-y-1.5'/>
					</label>
					<label htmlFor='menu-toggle' className='fixed inset-0 bg-black bg-opacity-10 hidden peer-checked:block'/>
					<div className='fixed  z-50 top-0 right-0 h-full w-4/5 bg-white shadow-lg transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out'>
						<div className='flex flex-col items-center pb-8 pt-20 h-full gap-4'>
							<Link href='https://info.socialbee.org/arbeit-finden/' className='uppercase font-bold'>{t('header.forRefuges')}</Link>
							<Link href='https://info.socialbee.org/fluechtlinge-einstellen/' className='uppercase font-bold'>{t('header.forCompanies')}</Link>
							<Link href='https://info.socialbee.org/unterstuetzen/' className='uppercase font-bold '>{t('header.support')}</Link>
							<Link href='https://info.socialbee.org/diversity-trainings-plattform/' className='uppercase font-bold '>{t('header.impactCentre')}</Link>
							<Link href='https://info.socialbee.org/ueber-uns/' className='uppercase font-bold '>{t('header.aboutUs')}</Link>
							<LanguageSelector language={lang}/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
