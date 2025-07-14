"use client"
import React, { useRef, useState, useEffect } from 'react'

function Interview() {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [mediaStatus, setMediaStatus] = useState('idle') // idle, started, closed, error
  const [error, setError] = useState('')

  const handleStartMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setStream(mediaStream)
      setMediaStatus('started')
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
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

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-black">
      {mediaStatus === 'idle' && (
        <>
          {/* Webcam Icon (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 7h6a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
          </svg>
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Let's get started</h1>
          <button
            onClick={handleStartMedia}
            className="px-6 py-3 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white font-bold rounded-xl shadow hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200 text-lg mb-4"
          >
            Start Camera & Microphone
          </button>
        </>
      )}
      {mediaStatus === 'started' && (
        <div className="flex flex-col items-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="rounded-xl shadow-lg w-full max-w-md h-auto bg-black mb-4"
            style={{ background: 'black' }}
          />
          <button
            onClick={handleCloseWebcam}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow mt-2"
          >
            Close Webcam
          </button>
        </div>
      )}
      {mediaStatus === 'closed' && (
        <div className="text-red-300 text-lg font-semibold">Webcam closed.</div>
      )}
      {mediaStatus === 'error' && (
        <div className="text-red-400 text-xl font-bold">{error}</div>
      )}
    </div>
  )
}
export default Interview
