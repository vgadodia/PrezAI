import React, {Component} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

var sentenceNumber = 0;
var prev = 0;

const Dictaphone = () => {
  var { transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  SpeechRecognition.startListening({ continuous: true });

  
  function main(k){
    var final = [];
    var x = "";

    var kk = k.split(" ");
    
    for (var i = 0; i < k.split(" ").length; i++){
      
      if (kk[i] == "firstly" || kk[i] == "secondly" || kk[i] == "thirdly" || kk[i] == "lastly" || kk[i] == "finally" || kk[i] == "then" || kk[i] == "next"){
        
        final.push(x);
        x = "";
      }
      else{
        
        x += kk[i] + " ";
      }
    }
    if (x != ""){
      final.push(x);
    }
    
    if (final.length == 0){
      final.push(k);
    }
    if (final[0] == ""){
      final.slice(1, final.length);
    }
    return final;
  }

  if (finalTranscript.length > prev){
    var xx = main(finalTranscript);
    
    if (xx.length > sentenceNumber){
     
      fetch('https://us-central1-todo-app-291703.cloudfunctions.net/audio', {
            method: 'post',headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({id: window.sessionStorage.getItem("id"), text: xx[sentenceNumber], num: sentenceNumber + 1})}).then((Response) => Response.json()).then((Result) => {
              console.log(Result);

            })
      sentenceNumber ++;
    }
    prev = finalTranscript.length;
  }

  return (
    <div>
      
      <div style = {{fontWeight:'350', marginTop:"5%", width:"70vh", fontSize:"170%"}}>{transcript}</div>
    </div>
  )
}
export default Dictaphone