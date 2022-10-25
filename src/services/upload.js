import axios from "axios";
import ENV from '../config/env';
// import fs from "fs-extra";
// eslint-disable-next-line no-unused-vars
// import * as fs from 'fs';
function transcript() {
  console.log(ENV.ASSEMBLYAI_API_KEY)
  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: ENV.ASSEMBLYAI_API_KEY,
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  });
  assembly
    .post("/transcript", {
      audio_url: "https://bit.ly/3yxKEIY"
    })
    .then((res) => {
      console.log('success');
      console.log(res.data)
      assembly.get(`/transcript/${res.data.id}`).then((res) => {
        console.log('test', res.data.text)
        // setTranscript(transcriptData.text)
      })
    })
    .catch((err) => console.error(err));
}

async function upload() {
  // const file = await fs.readFile('../DanGilbert_2004.mp3');
  // console.log(file);
}
export {
  transcript,
  upload
}
