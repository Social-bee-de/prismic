'use client'

import { FC } from "react"
import Image from "next/image"
import { DonationModal } from "./DonationModal"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/pro-regular-svg-icons"

interface Props {
    title: string
    description: string
    thumbnailSrc: string
    modalSrc: string
}

const DonationSection: FC<Props> = ({ title, description, thumbnailSrc, modalSrc }) => {
    return (
        <div className="lg:p-[120px] py-8 flex flex-col-reverse lg:flex-row gap-9 max-w-[1440px] w-screen px-4" id="donation-section">
            <div className="flex flex-col flex-1 whitespace-pre-line gap-2">
                <h3 className="lg:pr-9 hidden lg:block">{title}</h3>
                <h2 className="lg:hidden">{title}</h2>
                <p className="lg:pr-9" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <div className="flex-1 flex items-center relative overflow-hidden rounded-[16px]">
                <div className="lg:absolute w-full h-full cursor-pointer">
                    <DonationModal modalSrc={modalSrc}>
                        <div className="relative w-full h-full group">
                            <motion.div
                                className="absolute top-0 transform w-full flex justify-center bg-gradient-to-b from-black to-transparent text-white px-4 py-6   z-10"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                }}
                                transition={{
                                    delay: 2,
                                    duration: 0.5,
                                }}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                    }}
                                >
                                    <div className="flex items-center gap-2 pt-2">
                                        <FontAwesomeIcon icon={faEye} className="text-white text-[20px]" />
                                        <span className="text-sm font-semibold">Tap to view full image</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                            <Image
                                draggable={false}
                                src={thumbnailSrc}
                                alt="Donation thumbnail"
                                width={1000}
                                height={1000}
                                className="rounded-[16px] cursor-pointer object-contain object-center"
                            />
                        </div>
                    </DonationModal>
                </div>
            </div>
        </div>
    )
}

export default DonationSection
