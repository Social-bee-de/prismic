'use client';

import { startTransition, useState } from 'react';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/pro-regular-svg-icons';

import { changeLanguage } from '@/actions/changeLanguage';

export const LanguageSelector = ({ language }: { language: string }) => {
	const [lang, setLang] = useState<string>(language);
	const [visible, setVisible] = useState(false);
	const handleChangeLanguage = (lang: string) => {
		startTransition(() => {
			changeLanguage({
				language: lang,
			})
				.then(() => {
					setVisible(false);
					setLang(lang);
				})
				.catch(() => toast.error('Something went wrong.'));
		});
	};

	return (
		<div className='flex-1'>
			<button
				type='button' className='language-dropdown inline-flex gap-1 items-center text-gray-900 rounded-lg px-2 lg:px-4 py-1.5 lg:py-1.5 mr-2 md:mr-3 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 font-bold'
				onClick={() => {
					setVisible(!visible);
				}}
			>
				<FontAwesomeIcon icon={faGlobe}/>	<span style={{ marginTop: 2}}>{lang === 'en' ? 'EN' : 'DE'}</span>
			</button>
			<div className={`${visible ? '' : 'hidden'} absolute z-100 my-1 w-fit text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow`}>
				<ul className='py-1' role='none'>
					<li>
						<button
							className='w-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 text-left'
							role='menuitem'
							type='button'
							onClick={() => {
								handleChangeLanguage('en');
							}}
						>
							<div className='inline-flex items-center apercu-bold font-semibold'>
								EN
							</div>
						</button>
					</li>
					<li>
						<button
							className='w-full block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 text-left'
							type='button'
							role='menuitem'
							onClick={() => {
								handleChangeLanguage('de');
							}}
						>
							<div className='inline-flex items-center apercu-bold font-semibold'>
								DE
							</div>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};
