"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import QuestionSection from "./_components/QuestionSection"
import RecordAnswerSection from "./_components/RecordAnswerSection"
import { useUser } from '@clerk/nextjs';

function StartInterview() {
    const params = useParams();
    const interviewId = params?.interviewId;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(0);
    const { user } = useUser();

    useEffect(() => {
        async function fetchQuestions() {
            setLoading(true);
            setError("");
            try {
                const res = await fetch(`/api/get-mock-interview?mockId=${interviewId}`);
                if (!res.ok) throw new Error("Failed to fetch questions");
                const data = await res.json();
                let questionsArr = [];
                if (Array.isArray(data?.jsonMockResp)) {
                  questionsArr = data.jsonMockResp;
                } else if (typeof data?.jsonMockResp === 'string') {
                  try {
                    questionsArr = JSON.parse(data.jsonMockResp);
                  } catch (e) {
                    questionsArr = [];
                  }
                }
                setQuestions(questionsArr);
            } catch (err) {
                setError("Could not load questions.");
            } finally {
                setLoading(false);
            }
        }
        if (interviewId) fetchQuestions();
    }, [interviewId]);

    const handleSaveAnswer = async ({ userAns, rating = '', feedback = '' }) => {
        const questionObj = questions[selected];
        if (!questionObj) return;
        const payload = {
            mockIdRef: interviewId,
            question: questionObj.question,
            correctAns: questionObj.answer || '',
            userAns,
            feedback,
            rating,
            userEmail: user?.primaryEmailAddress?.emailAddress || 'unknown',
        };
        await fetch('/api/get-mock-interview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    };

    if (loading) return <div className="text-white text-xl p-8">Loading questions...</div>;
    if (error) return <div className="text-red-400 text-xl p-8">{error}</div>;
    if (!questions.length) return <div className="text-white text-xl p-8">No questions found for this interview.</div>;

    return (
        <div className="flex flex-row w-full min-h-screen bg-black">
            {/* Left: Questions */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-start items-start bg-gradient-to-b from-black via-gray-900 to-red-900 border-r border-red-900/40 min-h-screen">
                <QuestionSection questions={questions} selected={selected} setSelected={setSelected} />
                {/* Navigation buttons below the question block */}
                <div className="flex flex-row gap-4 mt-6 mb-4">
                    <button
                        className="px-6 py-2 rounded-lg bg-gray-700 text-white font-bold shadow hover:bg-gray-800 disabled:opacity-50"
                        onClick={() => setSelected(selected - 1)}
                        disabled={selected === 0}
                    >
                        Previous Question
                    </button>
                    <button
                        className="px-6 py-2 rounded-lg bg-gray-700 text-white font-bold shadow hover:bg-gray-800 disabled:opacity-50"
                        onClick={() => setSelected(selected + 1)}
                        disabled={selected === questions.length - 1}
                    >
                        Next Question
                    </button>
                    {selected === questions.length - 1 && (
                        <button
                            className="px-6 py-2 rounded-lg bg-red-700 text-white font-bold shadow hover:bg-red-800"
                            onClick={() => alert('Interview Ended! (Implement summary/redirect logic here)')}
                        >
                            End Interview
                        </button>
                    )}
                </div>
                {/* Note block below the question section */}
                <div className="mt-4 w-full max-w-xl bg-yellow-100/10 border-l-4 border-yellow-400 p-6 rounded-lg shadow text-yellow-200 text-base font-semibold">
                    <span className="block mb-2 text-yellow-300 font-bold">Note:</span>
                    Click on <span className="font-bold text-red-400">Record Answer</span> when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to compare it.
                </div>
            </div>
            {/* Right: Webcam/Recording */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center min-h-screen">
                <RecordAnswerSection
                    question={questions[selected]?.question}
                    correctAns={questions[selected]?.answer}
                    onSaveAnswer={handleSaveAnswer}
                />
            </div>
        </div>
    )
}
export default StartInterview