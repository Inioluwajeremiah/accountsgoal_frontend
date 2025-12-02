import React, { useRef, useState, useEffect } from "react";

const MediaRecord = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [audioClips, setAudioClips] = useState([]);
  const recordButtonRef = useRef(null);
  const stopButtonRef = useRef(null);

  console.log("chunks ==> ", chunks);
  console.log("audioClips ==> ", audioClips);

  useEffect(() => {
    const myAudio = document.getElementById("new_audio");

    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          console.log("mediaRecorder @ useeffect ==> ", recorder);

          recorder.onstop = () => {
            console.log("chunk  data  ", chunks);
            if (chunks.length > 0) {
              const clipName = new Date().getTime();
              //   prompt("Enter a name for your sound clip") || "Unnamed";
              const blob = new Blob(chunks, { type: recorder.mimeType });
              const audioURL = URL.createObjectURL(blob);
              const downloadURL = URL.createObjectURL(blob);
              myAudio.src = audioURL;

              console.log("blob generated  ", blob);
              console.log("audioURL ==> ", audioURL.split("/")[3]);

              console.log("downloadURL  ++> ", downloadURL);
              // "blob:null/" + audioURL.split("/")[3]

              setAudioClips((prevClips) => [
                ...prevClips,
                {
                  name: clipName,
                  url: audioURL,
                  downloadUrl: downloadURL,
                },
              ]);
              //   setChunks([]); // Reset chunks after creating the blob
            } else {
              alert("no chuink file");
            }
          };

          recorder.ondataavailable = (e) => {
            setChunks((prevChunks) => [...prevChunks, e.data]);

            // setChunks(e.data);

            console.log("data available ", e);
          };
        })
        .catch((err) => {
          console.error(`The following error occurred: ${err}`);
        });
    } else {
      console.log("MediaDevices.getUserMedia() not supported on your browser!");
    }
  }, []);

  const startRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      mediaRecorder.start();
      console.log("recorder started ==> ", mediaRecorder);

      recordButtonRef.current.style.background = "red";
      recordButtonRef.current.style.color = "black";
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      console.log("recorder stopped");
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
          <audio id="new_audio" controls></audio>
          {audioClips.map((clip, index) => (
            <div key={index} className="clip flex flex-col gap-y-6">
              <audio controls src={clip.url}>
                so
              </audio>

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
