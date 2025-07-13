"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import AddNewInterview from "./_components/AddNewInterview";

export default function DashBoard() {
  const { isLoaded } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4">
      <div className="bg-black/70 border border-red-900/40 rounded-2xl shadow-lg p-8 mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-2 tracking-tight text-center">
          Dashboard
        </h1>
        {!showModal && (
          <p className="text-lg text-red-200 mb-6 text-center font-medium">
            Create and start your AI Mock Interview
          </p>
        )}
        <div className="mb-2">
          {!showModal && (
            <button
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-200 text-lg"
              title="Start New AI Mock Interview"
              onClick={() => setShowModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add New
            </button>
          )}
        </div>
      </div>
      <AddNewInterview
        open={showModal}
        onClose={() => setShowModal(false)}
        onStart={questions => {
          setShowModal(false);
          setQuestions(questions);
        }}
      />
      {/* Show questions if available */}
      {questions.length > 0 && (
        <div className="bg-black/60 border border-red-900/30 rounded-xl shadow p-6 mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Interview Questions</h2>
          <ul className="space-y-6">
            {questions.map((q, idx) => (
              <li key={idx} className="bg-gray-900/60 rounded-lg p-4">
                <p className="text-lg text-red-300 font-semibold mb-2">Q{idx + 1}: {q.question}</p>
                <p className="text-white/90 pl-4">A: {q.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}