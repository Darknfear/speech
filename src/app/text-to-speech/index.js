import { useState, useEffect } from "react";
import { transcript } from '../../services/upload';
function TextToSpeech() {
  const [ourText, setOurText] = useState("")
  const msg = new SpeechSynthesisUtterance({ lang: 'ko-KR'})

  const speechHandler = (msg) => {
    msg.text = ourText
    msg.lang = 'ko-KR'
    window.speechSynthesis.speak(msg)
    console.log(window.speechSynthesis.getVoices())
  }
  useEffect(() => {
    transcript();
  })
  return (
    <div>
      <h1>React Text to Speech App</h1>
      <input
        type='text'
        value={ourText}
        placeholder='Enter Text'
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
    </div>
  );
}

export default TextToSpeech;
