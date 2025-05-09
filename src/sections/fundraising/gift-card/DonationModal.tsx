'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface DonationModalProps {
    children: React.ReactNode
    modalSrc: string
}

export const DonationModal: React.FC<DonationModalProps> = ({ children, modalSrc }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleImageClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
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
            <div onClick={handleImageClick}>{children}</div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full h-full flex justify-center items-center"
                            onClick={(e) => {
                                if (e.target === e.currentTarget) {
                                    e.stopPropagation();
                                }
                            }}
                        >
                            <div className="relative w-[90%] h-[90%]">
                                <Image
                                    src={modalSrc}
                                    alt="Full-size donation image"
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-[16px]"
                                    draggable={false}
                                />
                            </div>
                            <button
                                className="absolute top-4 right-4 text-black text-2xl font-bold bg-white rounded-full w-10 h-10 flex items-center justify-center z-50"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCloseModal();
                                }}
                                aria-label="Close modal"
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}