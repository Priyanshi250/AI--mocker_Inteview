import React, { useState } from "react"

function QuestionSection({ questions = [] }) {
    const [selected, setSelected] = useState(0);
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
            <div className="w-full max-w-xl flex justify-start">
                {questions[selected] && (
                    <div className="text-2xl font-bold text-white text-left p-8 bg-black/80 rounded-lg border border-red-700 w-full">
                        {questions[selected].question}
                    </div>
                )}
            </div>
        </div>
    )
}
export default QuestionSection