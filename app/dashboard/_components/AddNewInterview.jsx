import React, { useState } from 'react';

// Replace this with your real Gemini API endpoint or function
async function fetchInterviewQuestionsFromGemini({ role, description, experience }) {
  // Example: POST to your backend API route that calls Gemini
  const response = await fetch('/api/gemini-interview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role, description, experience })
  });
  if (!response.ok) throw new Error('Failed to fetch questions from Gemini');
  const data = await response.json();
  // Expecting data to be an array of { question, answer }
  return data;
}

export default function AddNewInterview({ open, onClose, onStart }) {
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]); // <-- Add state for questions

  if (!open) return null;

  const handleStart = async (e) => {
    e.preventDefault();
    if (role.trim() && description.trim() && experience) {
      setLoading(true);
      try {
        const questions = await fetchInterviewQuestionsFromGemini({ role, description, experience });
        console.log('Gemini Interview Questions:', questions);
        setQuestions(questions); // <-- Save questions to state
        setRole('');
        setDescription('');
        setExperience('');
        onStart(questions);
      } catch (err) {
        alert('Failed to fetch questions from Gemini AI.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-black via-gray-900 to-red-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-red-900/40">
        <button
          className="absolute top-3 right-3 text-red-300 hover:text-red-500 text-3xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-extrabold mb-2 text-white drop-shadow text-center">Tell me about your job interviewing</h2>
        <form onSubmit={handleStart}>
          <div className="mb-5">
            <label className="block text-red-200 font-semibold mb-1" htmlFor="role">1) Job Position / Role Name</label>
            <input
              id="role"
              type="text"
              className="w-full border border-red-700 bg-black/60 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-red-200 text-lg shadow"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={e => setRole(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-red-200 font-semibold mb-1" htmlFor="description">2) Job Description / Tech Stack (in short)</label>
            <input
              id="description"
              type="text"
              className="w-full border border-red-700 bg-black/60 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-red-200 text-lg shadow"
              placeholder="e.g. React, Node.js, REST APIs"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-red-200 font-semibold mb-1" htmlFor="experience">3) No. of Years Experience</label>
            <input
              id="experience"
              type="number"
              min="0"
              className="w-full border border-red-700 bg-black/60 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-red-200 text-lg shadow"
              placeholder="e.g. 2"
              value={experience}
              onChange={e => setExperience(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 font-semibold transition shadow"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white font-bold hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none transition shadow disabled:opacity-50"
              disabled={!(role.trim() && description.trim() && experience) || loading}
            >
              {loading ? (
                <span className="flex items-center gap-2"><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span> Generating...</span>
              ) : (
                'Start'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}