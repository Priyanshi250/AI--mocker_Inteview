"use client"
import React, { useRef, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

function Interview() {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [mediaStatus, setMediaStatus] = useState('idle') // idle, started, closed, error
  const [error, setError] = useState('')
  const [interviewStarted, setInterviewStarted] = useState(false)
  const router = useRouter()
  const params = useParams()
  const interviewId = params?.interviewId

  // Placeholder job info (replace with real data as needed)
  const jobRole = "Frontend Developer";
  const jobDescription = "React, Node.js, REST APIs";
  const jobExperience = "2 years";

  const handleStartMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      setMediaStatus('started')
    } catch (err) {
      setError('Unable to access camera/microphone. Please allow access.')
      setMediaStatus('error')
    }
  }

  const handleCloseWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    setMediaStatus('closed')
  }

  const handleStartInterview = () => {
    if (interviewId) {
      router.push(`/dashboard/interview/${interviewId}/start`)
    }
  }

  // Attach stream to video element when stream or mediaStatus changes
  useEffect(() => {
    if (mediaStatus === 'started' && videoRef.current && stream) {
      videoRef.current.srcObject = stream
      videoRef.current.play()
    }
  }, [stream, mediaStatus])

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="flex flex-row h-screen w-screen bg-black">
      {/* Left Side: Job Info & Info Block */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-gradient-to-b from-black via-gray-900 to-red-900 border-r border-red-900/40 h-full p-6">
        <div className="w-full max-w-xs">
          <h2 className="text-3xl font-extrabold text-white mb-4 text-center">Job Information</h2>
          <div className="text-red-200 mb-2 text-lg break-words"><span className="font-bold text-white">Role:</span> {jobRole}</div>
          <div className="text-red-200 mb-2 text-lg break-words"><span className="font-bold text-white">Description:</span> {jobDescription}</div>
          <div className="text-red-200 text-lg break-words"><span className="font-bold text-white">Experience:</span> {jobExperience}</div>
        </div>
        <div className="bg-black/70 border border-red-700 rounded-lg p-5 text-white text-lg mt-6 max-w-xs w-full text-center">
          <h3 className="font-extrabold text-red-400 mb-2 text-xl">Interview Instructions</h3>
          <ul className="list-disc pl-6 space-y-2 text-left">
            <li>Enable your <span className="font-bold">camera</span> and <span className="font-bold">microphone</span> to start.</li>
            <li>You will be asked <span className="font-bold">5 questions</span>.</li>
            <li>We will access your webcam and mic throughout.</li>
          </ul>
        </div>
      </div>
      {/* Right Side: Camera/Interview UI */}
      <div className="flex-1 flex flex-col justify-center items-center h-full p-6">
        {mediaStatus === 'idle' && !interviewStarted && (
          <>
            {/* Webcam Icon (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
            </svg>
            <h1 className="text-4xl font-extrabold text-white mb-6 text-center break-words">Let's get started</h1>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={handleStartMedia}
                className="px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-2xl font-extrabold rounded shadow hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200 mb-4"
              >
                Start Camera & Microphone
              </button>
              <button
                onClick={handleStartInterview}
                className="px-8 py-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-2xl font-extrabold rounded shadow hover:from-gray-800 hover:to-gray-900 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-all duration-200 mb-4"
                disabled={mediaStatus !== 'started'}
              >
                Start Interview
              </button>
            </div>
          </>
        )}
        {mediaStatus === 'started' && !interviewStarted && (
          <div className="flex flex-col items-center w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="rounded shadow w-full max-w-xl h-64 bg-black mb-4"
              style={{ background: 'black' }}
            />
            <div className="flex gap-4">
              <button
                onClick={handleCloseWebcam}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-xl font-bold rounded shadow mt-1"
              >
                Close Webcam
              </button>
              <button
                onClick={handleStartInterview}
                className="px-6 py-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-xl font-bold rounded shadow mt-1"
              >
                Start Interview
              </button>
            </div>
          </div>
        )}
        {interviewStarted && (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-3xl font-extrabold text-white mb-4 break-words">Interview Started!</h2>
            <p className="text-red-200 mb-4 text-xl break-words">The interview is now in progress. (You can add questions here.)</p>
            {mediaStatus === 'started' && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded shadow w-full max-w-xl h-64 bg-black mb-4"
                style={{ background: 'black' }}
              />
            )}
            {mediaStatus === 'started' && (
              <button
                onClick={handleCloseWebcam}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-xl font-bold rounded shadow mt-1"
              >
                Close Webcam
              </button>
            )}
          </div>
        )}
        {mediaStatus === 'closed' && !interviewStarted && (
          <div className="text-red-300 text-xl font-semibold">Webcam closed.</div>
        )}
        {mediaStatus === 'error' && (
          <div className="text-red-400 text-xl font-bold">{error}</div>
        )}
      </div>
    </div>
  )
}
export default Interview
