import React, { useState, useEffect, useRef } from "react";

const Record = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [audioClips, setAudioClips] = useState([]);
  const myAudioRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };

      const onSuccess = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.onstop = () => {
          console.log("Chunks on stop: ", chunks);
          if (chunks.length) {
            const clipName = new Date().getTime();
            const blob = new Blob(chunks, { type: recorder.mimeType });
            const audioURL = URL.createObjectURL(blob);
            const downloadURL = URL.createObjectURL(blob);
            myAudioRef.current.src = audioURL;

            console.log("Blob generated: ", blob);
            console.log("Audio URL: ", audioURL);
            console.log("Download URL: ", downloadURL);

            setAudioClips((prevClips) => [
              ...prevClips,
              {
                name: clipName,
                url: audioURL,
                downloadUrl: downloadURL,
              },
            ]);

            setChunks([]); // Reset chunks after creating the blob
          } else {
            alert("No chunk data available.");
          }
        };

        recorder.ondataavailable = (e) => {
          setChunks((prevChunks) => [...prevChunks, e.data]);
          console.log("Data available: ", e.data);
          console.log("Chunks: ", chunks);
        };
      };

      const onError = (err) => {
        console.error(`The following error occurred: ${err}`);
      };

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    } else {
      console.log("MediaDevices.getUserMedia() not supported on your browser!");
    }
  }, [chunks]);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      mediaRecorder.start();
      console.log("Recorder started");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log("Recorder stopped");
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio ref={myAudioRef} controls></audio>
      <div>
        {audioClips.map((clip) => (
          <div key={clip.name}>
            <audio controls src={clip.url}></audio>
            <a href={clip.downloadUrl} download={clip.name}>
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Record;
