"use client"
import React, { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import QuestionSection from "./_components/QuestionSection"
import RecordAnswerSection from "./_components/RecordAnswerSection"

function StartInterview() {
    const params = useParams();
    const interviewId = params?.interviewId;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (loading) return <div className="text-white text-xl p-8">Loading questions...</div>;
    if (error) return <div className="text-red-400 text-xl p-8">{error}</div>;
    if (!questions.length) return <div className="text-white text-xl p-8">No questions found for this interview.</div>;

    return (
        <div className="flex flex-row w-full min-h-screen bg-black">
            {/* Left: Questions */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-start items-start bg-gradient-to-b from-black via-gray-900 to-red-900 border-r border-red-900/40 min-h-screen">
                <QuestionSection questions={questions} />
            </div>
            {/* Right: Webcam/Recording */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center min-h-screen">
                <RecordAnswerSection />
            </div>
        </div>
    )
}
export default StartInterview