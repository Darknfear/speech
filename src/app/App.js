import { useSpeechContext } from '@speechly/react-client';
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from '@speechly/react-ui';
import { useEffect, useState } from 'react';

function App() {
  const { segment, attachMicrophone, listening, start, stop, transcript, microphoneState,  microphone} = useSpeechContext();
  const [tentativeTranscript, setTentativeTranscript] = useState("");
  const [transcripts, setTranscripts] = useState([]);
  const audio = new AudioContext();
  // await audio.resume();


  // useEffect(() => {
  //   // attachMicrophone().then((res) => console.log(res)).catch();
  //   attachMicrophone().then((str) => console.log('str', str)).catch(err => console.log('err', err))
  // }, [listening, segment])
  useEffect(() => {
   
    if (segment) {
      
      // Handle speech segment and make tentative changes to app state
      const plainString = segment.words.map(word => word.value).join(' ');
      // console.log('planingstring', plainString);
      setTentativeTranscript(plainString);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        setTentativeTranscript("");
        setTranscripts(current => [...current, plainString]);
      }
    }
    
    // console.log(listening)
    // const audio = new AudioContext();
    // audio.resume();
    //console.log('segment', segment);
  }, [segment]);
  return (
    <div className="App">
      {/* <BigTranscript placement="top" /> */}
      <PushToTalkButton placement="bottom" captureKey=" " />
      {/* <IntroPopup /> */}
      {/* <SpeechlyApp /> */}
      <button onClick={attachMicrophone}>Initialize microphone</button>
      <button onPointerDown={async ()=> {
        await start();
        console.log(microphone);
        // start().then(async res => {
        //   await attachMicrophone();
        //   console.log('transcript', transcript);
        //   console.log('segment', segment);
        //   console.log('listening',listening)
        //   console.log('microphoneState', microphoneState);
          
          
        // });
      }} onPointerUp={async () => {
        await stop();
        // await attachMicrophone()
      }}>
        {listening ? 'Listening…' : 'Push to talk'}
      </button>
      <PushToTalkButton
        placement="bottom"
        hide="false"
        captureKey=" "
        intro="Push to talk"
        size="80px" >
      </PushToTalkButton>
      <p></p>
      {transcripts?.map((value) =>
        <p>{value}</p>
      )}
      {tentativeTranscript && <p><em>{tentativeTranscript}</em></p>}
    </div>
  );
}

export default App;
