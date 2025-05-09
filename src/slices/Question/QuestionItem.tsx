import React from 'react';
import { isFilled } from '@prismicio/client';
import { asText } from '@prismicio/helpers';
import { Question } from './Question'; // Import your Question component
import richTextToHtml from '@/utils/richTextToHtml';

type QuestionItemProps = {
  question: any;
  language: string;
  startOpen?: boolean;
}

const QuestionItem = ({ question, language, startOpen = false }: QuestionItemProps) => {
  if (!question) {
    console.error("Question data is missing");
    return null;
  }
  
  const isGerman = language === 'de';
  
  // Get question field based on language
  const questionField = isGerman
    ? (isFilled.richText(question.question_de) ? question.question_de : question.question)
    : (isFilled.richText(question.question_en) ? question.question_en : question.question);

  // Get answer field based on language
  const answerField = isGerman
    ? (isFilled.richText(question.answer_de) ? question.answer_de : question.answer)
    : (isFilled.richText(question.answer_en) ? question.answer_en : question.answer);

  // Check if we have valid question and answer fields
  if (!isFilled.richText(questionField) || !isFilled.richText(answerField)) {
    return null;
  }

  // Convert the question field to plain text
  const questionText = asText(questionField);
  
  // Convert the answer field to HTML using our utility function
  const answerHtml = richTextToHtml(answerField);

  return (
    <Question 
      question={questionText}
      answer={answerHtml}
      startOpen={startOpen}
    />
  );
}

export default QuestionItem;
