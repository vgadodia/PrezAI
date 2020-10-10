import React, {Component} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'


const Dictaphone = () => {
  const { transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  SpeechRecognition.startListening({ continuous: true });

  const defaultOptions = {
    loop: true,
    autoplay: true, 
    
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      
      <div style = {{fontWeight:'350', marginTop:"5%", width:"70vh", fontSize:"170%"}}>{transcript}</div>
    </div>
  )
}
export default Dictaphone