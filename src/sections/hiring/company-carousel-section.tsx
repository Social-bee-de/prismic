import Image, { StaticImageData } from "next/image";


interface Props {
  class: string;
  header: string;
  images: { image: StaticImageData, alt: string }[];
}

export default async function CompanyCarousel(props: Props) {
  return (
    <section className="w-screen max-w-[1440px] lg:py-16 py-8 px-5 lg:px-[120px] flex-col flex gap-6 lg:gap-8">
      <h6 className="text-overheader dark:text-gray-300 hidden lg:block">{props.header}</h6>
      <h4 className="text-overheader dark:text-gray-300 lg:hidden">{props.header}</h4>
      <div className={`${props.class ?? 'glide'}`}>
        <div className="glide__track grayscale" data-glide-el="track">
          <ul className="glide__slides">
            {props?.images?.map((image, index) => (
              <li key={index} className={`glide__slide h-[60px] flex justify-center items-center w-[130px]`}>
                <Image
                  src={image.image}
                  alt={image.alt}
                  width="90"
                  height="40"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
