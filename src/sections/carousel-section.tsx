'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

interface Props {
	className?: string;
	header: string;
	images: Array<{ image: StaticImageData; alt: string }>;
}

export default function CompanyCarousel({ className = '', header, images }: Props) {
	const [offset, setOffset] = useState(0);
	const [visibleIcons, setVisibleIcons] = useState(8);

	useEffect(() => {
		const updateVisibleIcons = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth < 640) {
				setVisibleIcons(3);
			} else {
				setVisibleIcons(8);
			}
		};

		updateVisibleIcons();
		window.addEventListener('resize', updateVisibleIcons);

		return () => {
			window.removeEventListener('resize', updateVisibleIcons);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setOffset(prevOffset => (prevOffset + 1) % images.length);
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	}, [images.length]);

	return (
		<section className='w-screen lg:py-16 py-8 px-5 lg:px-[120px] flex flex-col gap-6 lg:gap-8'>
			<h6 className='text-overheader dark:text-gray-300 hidden lg:block ml-16'>{header}</h6>
			<h4 className='text-overheader dark:text-gray-300 lg:hidden ml-16'>{header}</h4>

			{/* The container ensures only a fixed number of icons are visible */}
			<div className={`relative overflow-hidden ${className}`} style={{ width: '100%' }}>
				<div
					className='flex transition-transform ease-linear duration-1000 items-center'
					style={{
						transform: `translateX(-${offset * (100 / visibleIcons)}%)`,
					}}
				>
					{images.map((img: any, index) => (
						<div
							// eslint-disable-next-line react/no-array-index-key
							key={index}
							className='h-full flex justify-center items-center'
							style={{ minWidth: `${100 / visibleIcons}%` }}
						>
							<Image src={img.image.url} alt={img.image.alt} width={90} height={40} draggable={false}/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
