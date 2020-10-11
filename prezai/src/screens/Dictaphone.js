import React, {Component} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

var sentenceNumber = 0

const Dictaphone = () => {
  var { transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  SpeechRecognition.startListening({ continuous: true });

  
  const main = async (keyword) => {
    var sentence = await finalTranscript.slice(0, finalTranscript.indexOf(keyword))
    finalTranscript = await finalTranscript.slice(finalTranscript.indexOf(keyword) + keyword.length, finalTranscript.length)
    sentenceNumber++;
    console.log("sentence:" + sentence, sentenceNumber)
    console.log("final transcript: "+ finalTranscript)
    sentence = ""
  }

  if (finalTranscript.includes("next up")){
    main("next up")
  }

  return (
    <div>
      
      <div style = {{fontWeight:'350', marginTop:"5%", width:"70vh", fontSize:"170%"}}>{transcript}</div>
    </div>
  )
}
export default Dictaphone