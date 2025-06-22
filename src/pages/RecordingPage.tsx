import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RecordButton } from '../components/RecordButton';
import { NavBar } from '../components/NavBar';
import { LanguageIndicator } from '../components/LanguageIndicator';
import { ClaimAnalysis } from '../components/ClaimAnalysis';

// This is the WebSocket URL for your local backend.
// In production, this would be something like "wss://api.yourdomain.com/ws/audio"
const WEBSOCKET_URL = "ws://localhost:8000/ws/audio";
let claimNum: number = 0;

// Mock claims data (you can keep this for UI testing)
const mockClaims = [
  // ... (your existing mockClaims array)
];

export const RecordingPage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  
  // --- UI-related state from your original file ---
  const [claims, setClaims] = useState<Array<any>>([]);
  const [detectedLanguages, setDetectedLanguages] = useState<string[]>([]);
  const [isDetectingLanguage, setIsDetectingLanguage] = useState(false);

  const [summary, setSummary] = useState<string | null>(null)
  
  // --- Refs to hold WebSocket, MediaRecorder, and timers ---
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<number | null>(null);

  // Effect for cleaning up resources when the component unmounts
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  interface Source {
    abstract_index: number;
    website_link: string;
    title: string;
    reason: string;
  }

  interface ClaimData {
    claim: string;
    validity: number;
    question: string;
    sources: Source[];
  }

  const claimList: ClaimData[] = []; // an array of ClaimData objects
  
  const handleStartRecording = async () => {
    // Reset UI state
    setClaims([]);
    setDetectedLanguages(['English']);
    
    try {
      // 1. Get audio stream from microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // 2. Create WebSocket connection
      socketRef.current = new WebSocket(WEBSOCKET_URL);

      socketRef.current.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.type === "verification") {
          console.log("GOT IN VERIFY*****************")
          claimNum += 1;
          mockClaims.push({
            id: claimNum,
            text: data.claim,
            timing: 5000,
            status: data.validity,
            explanation: (data.sources)[0].reason,
            followUpQuestion: data.question
          });
          // setClaims((prev) => [
          //   ...prev,
          //   {
          //     speaker: data.speaker || "Patient",
          //     text: data.text,
          //     hasClaim: data.claims?.length > 0,
          //     claimStatus: "verifying",
          //   },
          // ]);
        }

        if (data.type === "summary") {
          setSummary(data.summary)
        }
      };
        
      
      
      // 3. Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        // Send the complete blob when stopped
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          console.log(`Sending audio chunk of size: ${audioBlob.size}`);
          socketRef.current.send(audioBlob);
        }
        audioChunksRef.current = []; // Clear chunks for the next interval
      };

      // Automatically restart recording every 30 seconds
      recordingIntervalRef.current = window.setInterval(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.start();
        }
      }, 30000);

      
      // 4. When WebSocket opens, start recording
      socketRef.current.onopen = () => {
        console.log("WebSocket connected. Starting recording...");
        setIsRecording(true);
        mediaRecorderRef.current?.start();

        // Send audio every 30 seconds
        recordingIntervalRef.current = window.setInterval(() => {
          if (mediaRecorderRef.current?.state === "recording") {
            mediaRecorderRef.current.stop(); // This triggers onstop, which sends the data
            mediaRecorderRef.current.start(); // Immediately start the next chunk
          }
        }, 30_000); // 30 seconds
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket Error:", error);
        alert("Could not connect to the recording server. Please ensure the backend is running.");
        handleStopRecording(false); // Stop without navigating
      };
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access the microphone. Please grant permission and try again.");
    }
  };

  const handleStopRecording = (shouldNavigate = true) => {
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }

    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop(); // Triggers onstop for the final chunk
    }
    
    // Close the microphone stream tracks
    mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());

    if (socketRef.current) {
      // Wait a moment for the last chunk to send before closing
      setTimeout(() => {
        socketRef.current?.close();
        socketRef.current = null;
      }, 500);
    }

    setIsRecording(false);

    // Your original navigation logic
    if (shouldNavigate) {
        setTimeout(() => navigate('/summary'), 1000);
    }
  };

  // Get the primary and secondary languages
  const primaryLanguage = detectedLanguages.length > 0 ? detectedLanguages[0] : 'English';
  const secondaryLanguage = detectedLanguages.length > 1 ? detectedLanguages[1] : '';

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showBack={true} title="Recording" />
      
      <div className="p-4 flex-grow overflow-y-auto pb-24">
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sticky top-0 mb-4 flex justify-between items-center py-2 px-4 bg-red-100 text-red-600 rounded-lg text-sm"
            >
              <span>Recording in progress...</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {isRecording && (detectedLanguages.length > 1 || isDetectingLanguage) && (
          <div className="mb-4">
            <LanguageIndicator
              sourceLanguage={primaryLanguage}
              targetLanguage={secondaryLanguage || '...'}
              isDetecting={isDetectingLanguage}
              isTranslating={detectedLanguages.length > 1}
            />
          </div>
        )}
        
        <div className="space-y-4">
          {claims.map(claim => (
            <ClaimAnalysis
              key={claim.id}
              claim={claim.text}
              isAnalyzing={claim.isAnalyzing}
              status={claim.status}
              explanation={claim.explanation}
              followUpQuestion={claim.followUpQuestion}
            />
          ))}
        </div>
        
        {!isRecording && claims.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 text-slate-500 text-center"
          >
            <p>Tap the microphone button below to start recording</p>
          </motion.div>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 flex justify-center py-6 bg-gradient-to-t from-slate-50 to-transparent">
        {/* The RecordButton now calls our new handlers */}
        <RecordButton 
          onStart={handleStartRecording}
          onStop={() => handleStopRecording(true)}
        />
      </div>
    </div>
  );
};

export default RecordingPage; // Ensure there's a default export