

import React, { useRef, useState } from 'react';

function RecordAnswerSection() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [mediaStatus, setMediaStatus] = useState('idle'); // idle, started, closed, error
    const [error, setError] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);
    const [showCameraWarning, setShowCameraWarning] = useState(false);

    const handleStartMedia = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(mediaStream);
            setMediaStatus('started');
        } catch (err) {
            setError('Unable to access camera/microphone. Please allow access.');
            setMediaStatus('error');
        }
    };

    // Attach stream to video element when stream or mediaStatus changes
    React.useEffect(() => {
        if (mediaStatus === 'started' && videoRef.current && stream) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    }, [stream, mediaStatus]);

    // Clean up stream on unmount
    React.useEffect(() => {
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [stream]);

    // Speech-to-text logic
    const handleRecordAnswer = async () => {
        if (mediaStatus !== 'started') {
            setShowCameraWarning(true);
            setTimeout(() => setShowCameraWarning(false), 2000);
            return;
        }
        if (isRecording) {
            // Stop recording
            setIsRecording(false);
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            return;
        }
        // Request mic permission
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (err) {
            setError('Microphone permission denied.');
            return;
        }
        // Start speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError('Speech recognition is not supported in this browser.');
            return;
        }
        setTranscript('');
        setIsRecording(true);
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = 0; i < event.results.length; ++i) {
                finalTranscript += event.results[i][0].transcript;
            }
            setTranscript(finalTranscript);
        };
        recognition.onerror = (event) => {
            setError('Speech recognition error: ' + event.error);
            setIsRecording(false);
        };
        recognition.onend = () => {
            setIsRecording(false);
        };
        recognitionRef.current = recognition;
        recognition.start();
    };

    return (
        <div className="w-full flex flex-col items-center justify-start h-full">
            <div className="w-full max-w-2xl mt-2 flex flex-col items-center bg-gradient-to-br from-gray-900 via-black to-red-900 rounded-2xl shadow-2xl border border-red-900/40 p-8">
                <div className="w-full flex flex-col items-center justify-center">
                    {mediaStatus === 'idle' && (
                        <button
                            onClick={handleStartMedia}
                            className="flex flex-col items-center justify-center focus:outline-none transition bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-6 rounded-xl shadow-lg mb-4 mt-2 group"
                            aria-label="Start Camera"
                        >
                            {/* Modern Webcam SVG Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white group-hover:text-red-200 transition mb-3" fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth={2}>
                                <rect x="8" y="14" width="32" height="20" rx="6" fill="#1f2937" stroke="#ef4444" strokeWidth="2" />
                                <circle cx="24" cy="24" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                                <rect x="20" y="36" width="8" height="4" rx="2" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                            </svg>
                            <span className="text-white text-xl font-extrabold tracking-wide">Enable Camera</span>
                        </button>
                    )}
                    {mediaStatus === 'started' && (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="rounded-2xl shadow-2xl w-full max-w-2xl h-[420px] bg-black border-4 border-red-700 object-cover"
                            style={{ background: 'black' }}
                        />
                    )}
                    {mediaStatus === 'error' && (
                        <div className="text-red-400 text-xl font-bold mt-4">{error}</div>
                    )}
                </div>
                <div className="mt-6 w-full flex flex-col items-center">
                    <span className="text-gray-300 text-lg">Your camera preview will appear here.</span>
                </div>
                {/* Record Answer Button */}
                <div className="w-full flex flex-col items-center mt-8">
                    <button
                        onClick={handleRecordAnswer}
                        className={`px-8 py-4 bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white text-xl font-extrabold rounded-xl shadow-lg hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none transition-all duration-200 ${isRecording ? 'animate-pulse' : ''}`}
                        disabled={mediaStatus !== 'started'}
                        title={mediaStatus !== 'started' ? 'Enable camera to record answer' : ''}
                    >
                        {isRecording ? 'Stop Recording' : 'Record Answer'}
                    </button>
                    {showCameraWarning && (
                        <div className="mt-2 text-red-400 text-base font-bold">Enable camera before recording answer.</div>
                    )}
                    {transcript && (
                        <div className="mt-6 w-full bg-black/70 rounded-lg p-4 border border-red-700 text-white text-lg">
                            <span className="font-bold text-red-400">Transcript:</span> {transcript}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RecordAnswerSection;