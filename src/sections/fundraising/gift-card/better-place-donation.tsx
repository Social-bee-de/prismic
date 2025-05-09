'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DonationButton } from '@/components/Fundraising/GiftCard/DonationButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/pro-regular-svg-icons'

interface BetterPlaceConfig {
    project_id: number
    width: string
    color: string
    background_color: string
    default_amount: number
    recurring_interval: string
    bottom_logo: boolean
}

const BETTERPLACE_CONFIG: BetterPlaceConfig = {
    project_id: 101957,
    width: '100%',
    color: 'F6CE46',
    background_color: 'ffffff',
    default_amount: 50,
    recurring_interval: 'monthly',
    bottom_logo: true,
}

const createIframeUrl = (config: BetterPlaceConfig, language: string): string => {
    const baseUrl = `https://www.betterplace.org/${language ?? 'en'}/donate/iframe/projects/${config.project_id}`
    const params = new URLSearchParams()
    for (const key in config) {
        if (Object.prototype.hasOwnProperty.call(config, key)) {
            params.append(key, config[key as keyof BetterPlaceConfig].toString())
        }
    }
    params.append('_ts', new Date().getTime().toString())

    return `${baseUrl}?${params.toString()}`
}

interface BetterPlaceDonationProps {
    translations: Translations,
    language: string
}

export default function BetterPlaceDonation({ translations, language }: BetterPlaceDonationProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [iframeUrl, setIframeUrl] = useState<string>('')
    const [iframeKey, setIframeKey] = useState<number>(0)

    const openModal = () => {
        const url = createIframeUrl(BETTERPLACE_CONFIG, language)
        setIframeUrl(url)
        setIframeKey((prevKey) => prevKey + 1)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIframeUrl('')
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    return (
        <>
            <div className="flex justify-center">
                <DonationButton onClick={openModal} translations={translations} />
            </div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-lg lg:p-6 w-full max-w-2xl relative max-h-[92dvh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                            </button>
                            {iframeUrl && (
                                <iframe
                                    key={iframeKey}
                                    src={iframeUrl}
                                    width="100%"
                                    height="650"
                                    frameBorder="0"
                                    style={{ border: 'none' }}
                                    title="Betterplace Donation Form"
                                ></iframe>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
