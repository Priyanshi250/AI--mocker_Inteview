"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { UserAnswer, MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        setLoading(true);
        // 1. Get all user answers for this user
        const answers = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(UserAnswer.id));

        // 2. Group by mockIdRef
        const grouped = {};
        answers.forEach(ans => {
            if (!grouped[ans.mockIdRef]) grouped[ans.mockIdRef] = [];
            grouped[ans.mockIdRef].push(ans);
        });

        // 3. For each group, fetch MockInterview and calculate avg rating
        const interviewCards = await Promise.all(
            Object.entries(grouped).map(async ([mockIdRef, groupAnswers]) => {
                // Fetch job info
                const mockArr = await db.select()
                    .from(MockInterview)
                    .where(eq(MockInterview.mockId, mockIdRef));
                const mock = mockArr[0];
                // Calculate average rating
                const ratings = groupAnswers
                    .map(ans => {
                        let rating = ans.rating;
                        // Try to parse from feedback JSON if needed
                        if (!rating && ans.feedback) {
                            try {
                                const fb = JSON.parse(ans.feedback);
                                rating = fb.rating;
                            } catch {}
                        }
                        return parseFloat(rating);
                    })
                    .filter(r => !isNaN(r));
                const avgRating = ratings.length > 0 ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;
                return {
                    mockIdRef,
                    jobPosition: mock?.jobPosition || 'N/A',
                    jobDesc: mock?.jobDesc || 'N/A',
                    createdAt: mock?.createdAt || '',
                    avgRating: avgRating.toFixed(1),
                };
            })
        );
        setInterviewList(interviewCards);
        setLoading(false);
    }

    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl text-white">Previous Mock Interviews</h2>
            {loading ? (
                <div className="text-gray-400">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {interviewList.length > 0 ? interviewList.map((interview, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-red-900/50 hover:bg-gray-700 transition-all">
                            <h3 className="text-xl font-bold text-red-400">{interview.jobPosition}</h3>
                            <p className="text-sm text-gray-400 mt-2">{interview.createdAt ? new Date(interview.createdAt).toLocaleDateString() : 'N/A'}</p>
                            <p className="text-white mt-2"><span className="font-semibold text-red-300">Description:</span> {interview.jobDesc}</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-white">Avg. Rating:</p>
                                <p className="text-2xl font-bold text-green-400">{interview.avgRating}</p>
                            </div>
                        </div>
                    )) : (
                        <p className="text-gray-400">No previous interviews found.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default InterviewList;