"use client";

import React, { useState } from 'react';
import { faPlus, faMinus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface QuestionProps {
    question: string;
    answer: string;
    startOpen?: boolean;
}

export const Question: FC<QuestionProps> = ({ question, answer, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <details 
            className="faq-container" 
            open={isOpen}
            onClick={(e) => {
                // Prevent default behavior to handle it ourselves
                e.preventDefault();
                toggleOpen();
            }}
        >
            <summary className="faq-header">
                <h5 className="hidden lg:block">{question}</h5>
                <h3 className="lg:hidden">{question}</h3>
                <FontAwesomeIcon 
                    icon={isOpen ? faMinus : faPlus} 
                    className="icon" 
                />
            </summary>
            <div 
                className={`faq-content ${isOpen ? 'open' : ''}`}
                dangerouslySetInnerHTML={{ __html: answer }}
            ></div>
        </details>
    );
};

export default Question;