import React, { useState } from "react"

function QuestionSection({ questions = [], selected, setSelected }) {
    // Function to speak the current question
    const handleSpeak = () => {
        if (questions[selected] && typeof window !== 'undefined') {
            const utterance = new window.SpeechSynthesisUtterance(questions[selected].question);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };
    return (
        <div className="flex flex-col items-start w-full">
            {/* Horizontal row of question selectors, left-aligned */}
            <div className="flex flex-row gap-4 w-full max-w-xl justify-start mb-8">
                {questions.map((q, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        className={`px-6 py-3 rounded-lg font-bold text-lg transition border border-red-700 bg-black/70 hover:bg-red-900/60 focus:outline-none shadow ${selected === idx ? 'bg-red-700 text-white' : 'text-red-200'}`}
                        style={{ minWidth: '120px' }}
                    >
                        {`Question ${idx + 1}`}
                    </button>
                ))}
            </div>
            {/* Show selected question below the row, left-aligned */}
            <div className="w-full max-w-xl flex justify-start items-center gap-4">
                {questions[selected] && (
                    <>
                        <div className="text-2xl font-bold text-white text-left p-8 bg-black/80 rounded-lg border border-red-700 w-full">
                            {questions[selected].question}
                        </div>
                        {/* Speaker button */}
                        <button
                            onClick={handleSpeak}
                            aria-label="Listen to question"
                            className="ml-2 p-3 rounded-full bg-yellow-400 hover:bg-yellow-500 focus:outline-none shadow-lg flex items-center justify-center"
                        >
                            {/* Speaker SVG icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6h4l5 5V4l-5 5H9z" />
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
export default QuestionSection