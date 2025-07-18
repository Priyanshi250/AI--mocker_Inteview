"use client"
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function FeedbackPage({ params }) {
    const [feedbackList, setFeedbackList] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [openIndexes, setOpenIndexes] = useState([]); // Track which questions are open
    // Unwrap params if it's a promise (Next.js 14+)
    const unwrappedParams = typeof params.then === 'function' ? React.use(params) : params;
    const interviewId = unwrappedParams?.interviewId;

    useEffect(() => {
        if (interviewId) {
            GetFeedback();
        }
        // eslint-disable-next-line
    }, [interviewId]);

    const GetFeedback = async () => {
        // Fetch user answers for this interview from your API
        const res = await fetch(`/api/get-user-answers?mockIdRef=${interviewId}`);
        const result = await res.json();
        setFeedbackList(result);
        // Calculate average rating (assuming rating is a number or string number)
        if (result && result.length > 0) {
            const ratings = result
                .map(r => parseFloat(r.rating))
                .filter(r => !isNaN(r));
            if (ratings.length > 0) {
                const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                setAverageRating(avg.toFixed(1));
            }
        }
    };

    const toggleDetails = idx => {
        setOpenIndexes(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    // Pie chart data
    const pieData = {
        labels: feedbackList.map((item, idx) => `Q${idx + 1}`),
        datasets: [
            {
                label: 'Rating',
                data: feedbackList.map(item => parseFloat(item.rating) || 0),
                backgroundColor: [
                    '#ef4444', // red
                    '#f59e42', // orange
                    '#facc15', // yellow
                    '#22d3ee', // cyan
                    '#a78bfa', // purple
                    '#34d399', // green
                    '#f472b6', // pink
                    '#818cf8', // indigo
                    '#f87171', // light red
                    '#fde68a', // light yellow
                ],
                borderColor: '#222',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="max-w-6xl mx-auto mt-12 flex flex-col md:flex-row gap-8">
            {/* Left: Feedback summary and questions */}
            <div className="flex-1 p-8 rounded-xl shadow-lg bg-gradient-to-br from-red-700 via-black to-red-900 border border-red-900/60">
                <h1 className="text-4xl font-bold text-center text-white mb-4 drop-shadow-lg">Congratulations!</h1>
                <h2 className="text-2xl font-semibold text-center mb-6 text-red-200">Here is your Interview Feedback</h2>
                {averageRating && (
                    <div className="text-xl text-center font-bold text-yellow-300 mb-8">
                        Your overall interview rating: {averageRating}/10
                    </div>
                )}
                <div className="space-y-6">
                    {feedbackList.map((item, idx) => (
                        <div key={item.id || idx} className="bg-black/60 rounded-lg shadow p-4 border border-red-900/40">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="text-lg text-white font-semibold mb-2 md:mb-0">Q{idx + 1}: {item.question}</div>
                                <button
                                    className="px-4 py-2 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white font-bold rounded-lg shadow hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                                    onClick={() => toggleDetails(idx)}
                                >
                                    {openIndexes.includes(idx) ? 'Hide Details' : 'Show Details'}
                                </button>
                            </div>
                            {openIndexes.includes(idx) && (
                                <div className="mt-4 space-y-2 text-white/90">
                                    <div><span className="font-bold text-yellow-300">Your Rating:</span> {item.rating || 'N/A'}</div>
                                    <div><span className="font-bold text-green-300">Correct Answer:</span> {item.correctAns || 'N/A'}</div>
                                    <div><span className="font-bold text-blue-300">Your Answer:</span> {item.userAns || 'N/A'}</div>
                                    <div><span className="font-bold text-pink-300">Feedback:</span> {item.feedback || 'N/A'}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Right: Pie chart */}
            <div className="w-full md:w-96 flex flex-col items-center justify-center bg-black/70 rounded-xl shadow-lg border border-red-900/60 p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Performance Chart</h3>
                <Pie data={pieData} />
                <div className="mt-4 text-white/80 text-center text-sm">
                    Each slice shows your rating for a question.<br />Colors correspond to question order.
                </div>
            </div>
        </div>
    );
}

export default FeedbackPage;