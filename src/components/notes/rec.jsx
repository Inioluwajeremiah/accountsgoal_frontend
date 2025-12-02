import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const MediaRecord = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [audioClips, setAudioClips] = useState([]);
  const recordButtonRef = useRef(null);
  const stopButtonRef = useRef(null);

  console.log("recjsx initial chunks ==> ", chunks);
  console.log("recjsx intial audioClips ==> ", audioClips);

  useEffect(() => {
    // const myAudio = document.getElementById("new_audio");
    let newchunks = [];
    const myMediaPlayer = () => {
      if (navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");

        const constraints = { audio: true };

        let onSuccess = (stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          console.log("recjsx mediaRecorder @ useeffect ==> ", recorder);

          recorder.ondataavailable = (e) => {
            const newdata = e.data;
            setChunks((prevChunks) => [...prevChunks, newdata]);

            newchunks.push(e.data);

            console.log("recjsx data available ", e);
            console.log("recjsx chunks data available  ", chunks);
            console.log("recjsx new chunks data available  ", newchunks);
          };

          recorder.onstop = () => {
            console.log("recjsxchunk  data  ", chunks);
            if (chunks) {
              // const clipName = new Date().getTime();
              const clipName =
                prompt("Enter a name for your sound clip") || "Unnamed";
              const blob = new Blob(chunks.length > 0 ? chunks : newchunks, {
                type: recorder.mimeType,
              });
              const audioURL = URL.createObjectURL(blob);
              const downloadURL = URL.createObjectURL(blob);
              //   myAudio.src = audioURL;

              console.log("recjsx blob generated  ", blob);
              console.log("recjsx audioURL ==> ", audioURL.split("/")[3]);

              console.log("recjsx downloadURL  ++> ", downloadURL);
              // "blob:null/" + audioURL.split("/")[3]

              setAudioClips((prevClips) => [
                ...prevClips,
                {
                  name: clipName,
                  url: audioURL,
                  downloadUrl: downloadURL,
                },
              ]);
              newchunks = [];
              setChunks([]); // Reset chunks after creating the blob
            } else {
              alert("recjsx no chuink file");
            }
          };
        };

        let onError = (err) => {
          console.error(`recjsx The following error occurred: ${err}`);
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(onSuccess, onError);
      } else {
        console.log(
          "recjsx MediaDevices.getUserMedia() not supported on your browser!"
        );
      }
    };
    myMediaPlayer();
  }, [chunks, recordButtonRef, stopButtonRef]);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      mediaRecorder.start();
      console.log("recorder started ==> ", mediaRecorder);

      console.log("recjsx start recording chunks ==> ", chunks);

      recordButtonRef.current.style.background = "red";
      recordButtonRef.current.style.color = "black";
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log("recorder stopped");

      console.log("recjsx stop recording chunks ==> ", chunks);
      recordButtonRef.current.style.background = "";
      recordButtonRef.current.style.color = "";
    }
  };

  const deleteClip = (index) => {
    const clipToDelete = audioClips[index];
    if (clipToDelete) {
      URL.revokeObjectURL(clipToDelete.url); // Clean up the Blob URL
      setAudioClips((prevClips) => prevClips.filter((clip, i) => i !== index));
    }
  };

  if (audioClips.length > 0) {
    const wavesurfer = WaveSurfer.create({
      container: "#audio",
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: audioClips[0]?.url,
    });

    wavesurfer.on("click", () => {
      wavesurfer.play();
    });
  }

  return (
    <div>
      <div className="mt-10 bg-green-100 flex flex-col  items-start text-xl gap-y-6 p-6">
        <button ref={recordButtonRef} onClick={startRecording}>
          Record
        </button>
        <button ref={stopButtonRef} onClick={stopRecording}>
          Stop
        </button>
        <div>
          <p>one audio</p>
          {/* <audio id="new_audio" controls></audio> */}
          <div id="audio"></div>
          {audioClips.map((clip, index) => (
            <div key={index} className="clip flex flex-col gap-y-6">
              <audio controls src={clip.url}></audio>

              <p>{clip.name}</p>
              <p>{clip.url}</p>
              <a href={clip.downloadUrl} download={`${clip.name}.ogg`}>
                Download
              </a>
              <button onClick={() => deleteClip(index)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaRecord;
