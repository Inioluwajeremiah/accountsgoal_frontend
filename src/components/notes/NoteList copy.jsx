import React, { useEffect, useRef, useState } from "react";
import todoIcon from "../../assets/todo.svg";
import FeaturesHeader from "../FeaturesHeader";
import { windowWidth } from "../../utils/Dimensions";
import {
  useAddTextMutation,
  useAttachImageMutation,
  useDeleteAudioMutation,
  useDeleteImageMutation,
  useDeleteTextMutation,
  useGetAllNotesByUniqueIdQuery,
  useSendAudioMutation,
} from "../../store/noteApiSlice";
import TextInputField from "../forms/TextInputField";
import LoadingAnimation from "../LoadingAnimation";
import MicrophoneIcon from "../../icons/MicrophoneIcon";
import AddImageLargeIcon from "../../icons/AddImageLargeIcon";
import PlayIcon from "../../icons/PlayIcon";
// import AudioIcon from "../../icons/AudioIcon";
import { useSelector } from "react-redux";
import { Cloudinary } from "@cloudinary/url-gen";
import MediaRecording from "./MediaRecording";
import LoadingAnimation2 from "../LoadingAnimation2";
import { useGetUserQuery } from "../../store/authApi";

const cloudinary_cloud_name = import.meta.env.VITE_cloudinary_cloud_name;
const cloudinary_api_key = import.meta.env.VITE_cloudinary_api_key;
const cloudinary_secret_key = import.meta.env.VITE_cloudinary_secret_key;
const cloudinary_upload_preset = import.meta.env.VITE_cloudinary_upload_preset;

const NoteList = ({
  uniqueId,
  handleToggleNoteModal,
  handleToggleCloseModal,
  dontShowHeader,
  refetch,
}) => {
  // const { accountsGoalUser } = useSelector((state) => state.auth);
  const {
    data: accountsGoalUser,
    isError,
    error,
  } = useGetUserQuery();

  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState();
  const [textInput, setTextInput] = useState("");
  const [showSendButton, setShowSendButton] = useState(false);
  const [showMedia, setSHowMedia] = useState(false);

  const imageHeight = Math.floor(windowWidth * 0.8);
  const webViewRef = useRef(null);
  const scrollViewRef = useRef(null);
  const pickImageRef = useRef(null);

  console.log("cloudinary_cloud_name ==> ", cloudinary_cloud_name);
  console.log("cloudinary_api_key ==> ", cloudinary_api_key);
  console.log("cloudinary_secret_key ==> ", cloudinary_secret_key);

  const [deleteAudio, { isLoading: loadingDeleteAudio }] =
    useDeleteAudioMutation();
  const [deleteImage, { isLoading: loadingDeleteImage }] =
    useDeleteImageMutation();
  const [deleteText, { isLoading: loadingDeleteText }] =
    useDeleteTextMutation();
  const {
    data: notesData,
    isLoading: loadingNotesData,
    isError: isGetError,
    error: getNoteError,
  } = useGetAllNotesByUniqueIdQuery({ uniqueId });

  const [
    addText,
    {
      isLoading: loadingAddText,
      isSuccess: isAddTextSuccess,
      isError: isAddTextError,
      error: addTextError,
    },
  ] = useAddTextMutation();

  const [
    attachImage,
    {
      isLoading: loadingAttachImage,
      isError: isAttachImageError,
      error: AttachImageError,
    },
  ] = useAttachImageMutation();
  const [
    sendAudio,
    {
      isLoading: loadingSendAudio,
      isError: isSendAudioError,
      error: SendAudioError,
    },
  ] = useSendAudioMutation();

  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudinary_cloud_name,
      api_key: cloudinary_api_key,
      api_secret: cloudinary_secret_key,
    },
    url: {
      secure: true,
    },
  });

  const options = {
    upload_preset: cloudinary_upload_preset,
    unsigned: true,
  };

  // upload image to cloudinary
  const handleSelectImage = (evt) => {
    uploadImage(evt.target.files[0]);
  };
  const handleUploadText = async () => {
    const response = await addText({
      user: accountsGoalUser._id,
      textName: textInput,
      uniqueId,
    });
    console.log("add text response", response);
    if (response.data) {
      setTextInput("");
      setShowSendButton(false);
    }
    if (isAddTextError) {
      Alert.alert("", response.data.message);
    }
  };
  const handleUploadImage = async (url) => {
    const response = await attachImage({
      user: accountsGoalUser._id,
      imageUrl: url,
      uniqueId,
    });
  };
  const handleUploadAudio = async (url) => {
    const response = await sendAudio({
      user: accountsGoalUser._id,
      audioUrl: url,
      uniqueId,
    });
    console.log("audio upload response ==> ", response);
  };

  const handleDeleteAudio = async (itemId) => {
    console.log("deleteAudio body", { itemId, uniqueId });
    const response = await deleteAudio({ uniqueId: uniqueId, id: itemId });
    console.log("deleteAudio", response);
  };
  const handleDeleteImage = async (itemId) => {
    const response = await deleteImage({ uniqueId: uniqueId, id: itemId });
    console.log("delete image", response);
  };
  const handleDeleteText = async (itemId) => {
    const response = await deleteText({ uniqueId: uniqueId, id: itemId });
    console.log("deleteText", response);
  };

  const uploadImage = async (imageFile) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    const time = new Date().getTime();
    // const imageName = `${accountsGoalUser._id + time}.${
    //   imageFile.uri.split(".")[3]
    // }`;
    // const formfile = {
    //   uri: imageFile.uri,
    //   type: imageFile.mimeType,
    //   name: imageName,
    // };
    const formdata = new FormData();
    formdata.append("file", imageFile);
    formdata.append("upload_preset", cloudinary_upload_preset);
    formdata.append("public_id", accountsGoalUser._id + time);
    formdata.append("api_key", cloudinary_api_key);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
    setUploadingImage(true);
    fetch(
      `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/upload`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("cloudinary upload result ==> ", result);
        setProfileImage(result.secure_url);
        setUploadingImage(false);
        // upload url to database
        handleUploadImage(result.secure_url);
      })
      .catch((error) => {
        console.error(error);
        setUploadingImage(false);
      });
  };

  const uploadAudio = async (uri, filename) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    const time = new Date().getTime();

    const formfile = {
      uri: uri,
      type: "audio/mp4",
      name: filename,
    };
    const formdata = new FormData();
    formdata.append("file", formfile);
    formdata.append("upload_preset", cloudinary_upload_preset);
    formdata.append("public_id", accountsGoalUser._id + time);
    formdata.append("api_key", cloudinary_api_key);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
    setUploadingImage(true);
    fetch(
      `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/video/upload`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("cloudinary upload result ==> ", result);
        setProfileImage(result.secure_url);
        // setUploadingImage(false);
        // upload url to database

        handleUploadAudio(result.secure_url);
      })
      .catch((error) => {
        console.error(error);
        setUploadingImage(false);
      });
  };

  const MediaRecorder = () => {
    if (navigator.mediaDevices) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };
      let chunks = [];

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);

          record.onclick = () => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
            record.style.background = "red";
            record.style.color = "black";
          };

          stop.onclick = () => {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            record.style.background = "";
            record.style.color = "";
          };

          mediaRecorder.onstop = (e) => {
            console.log("data available after MediaRecorder.stop() called.");

            const clipName = prompt("Enter a name for your sound clip");

            const clipContainer = document.createElement("article");
            const clipLabel = document.createElement("p");
            const audio = document.createElement("audio");
            const deleteButton = document.createElement("button");
            const mainContainer = document.querySelector("body");

            clipContainer.classList.add("clip");
            audio.setAttribute("controls", "");
            deleteButton.textContent = "Delete";
            clipLabel.textContent = clipName;

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            mainContainer.appendChild(clipContainer);

            audio.controls = true;
            const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
            chunks = [];
            const audioURL = URL.createObjectURL(blob);
            audio.src = audioURL;
            console.log("recorder stopped");

            deleteButton.onclick = (e) => {
              const evtTgt = e.target;
              evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            };
          };

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          };
        })
        .catch((err) => {
          console.error(`The following error occurred: ${err}`);
        });
    }
  };

  const startRecording = () => {};

  const stopRecording = () => {};

  const scrollToBottom = () => {
    if (scrollViewRef) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  };
  // scrollContainer.scrollTop = scrollContainer.scrollHeight;

  // scrollTop = scrollContainer.scrollHeight
  useEffect(() => {
    scrollToBottom();
  }, []);
  return (
    <>
      <div
        className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6  rounded-t-3xl md:rounded-none overflow-y-scroll`}
      >
        <div
          ref={scrollViewRef}
          className="relative w-full h-full mx-auto flex flex-col justify-between bg-white px-10 py-12 rounded-3xl overflow-y-scroll"
        >
          <div className="">
            <FeaturesHeader
              dontShowHeader={dontShowHeader}
              title={"Notes"}
              handleBackButton={handleToggleNoteModal}
              handleCloseButton={handleToggleCloseModal}
            />

            {/* note content */}
            <div className="w-[90%] mx-auto {scrollViewRef}">
              {notesData &&
                notesData?.data?.noteUniqueId?.map((item, index) => (
                  <div key={index}>
                    {item?.textName && (
                      <p className="text-primary-accent-color my-4">
                        {item?.textName}
                      </p>
                    )}
                    {item.audioUrl && (
                      <div className="w-[80%] flex flex-row justify-evenly items-center my-4 ">
                        <audio controls src={item.audioUrl}></audio>
                        {/* <button
                          className="w-8 h-8 rounded-full bg-primary-color flex justify-center items-center mr-4"
                          onClick={() => playSound(item.audioUrl)}
                        >
                          <PlayIcon color={"#fff"} />
                        </button>

                        <AudioIcon /> */}
                      </div>
                    )}
                    {item?.imageUrl && (
                      // <div className="w-fit h-fit rounded-3xl border ">
                      <img
                        src={item?.imageUrl}
                        style={{ width: 300, height: 300 }}
                        className=" rounded-3xl  my-4 w-"
                      />
                      // </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* no todo image */}
          {!loadingNotesData && !notesData && (
            <div className="h-fit  w-full flex flex-col justify-center items-center">
              <img src={todoIcon} alt="todo icon" />
              <p className="text-[24px] text-[#A8A8A8] mt-6">
                No note for account
              </p>
            </div>
          )}
        </div>
        {/* text area div */}

        <div className="absolute w-full left-0 bottom-0  py-2 bg-white">
          <div className="w-[80%] mx-auto flex flex-row self-center items-center justify-between border border-black h-12 rounded-full px-4 ">
            {recording ? (
              <p>Recording...</p>
            ) : (
              <input
                className=" w-[75%]  text-base  text-secondary-accent-color appearance-none focus:outline-none"
                placeholder="Type a message here"
                color={"#8a8a8a"}
                cursor={"#8a8a8a"}
                value={textInput}
                onKeyDown={() => setShowSendButton(true)}
                // onPointerLeave={() => setShowSendButton(false)}
                onChange={(e) => setTextInput(e.target.value)}
              />
            )}

            <>
              {/* send button */}
              {showSendButton && (
                <button
                  className="h-8 w-8 rounded-full bg-primary-accent-color flex justify-center items-center"
                  onClick={handleUploadText}
                >
                  <PlayIcon color={"#fff"} />
                </button>
              )}

              {!showSendButton && (
                <>
                  {/*upload image icon */}
                  <input
                    ref={pickImageRef}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleSelectImage}
                    className="hidden"
                  />
                  {!recording && (
                    <button
                      className=""
                      onClick={() => pickImageRef.current.click()}
                    >
                      <AddImageLargeIcon color={"#A8A8A8"} />
                    </button>
                  )}
                  {/* microphone icon */}
                  {/* <button onClick={recording ? stopRecording : startRecording}> */}
                  <button onClick={() => setSHowMedia(!showMedia)}>
                    <MicrophoneIcon />
                  </button>
                </>
              )}
            </>
          </div>
        </div>
      </div>
      {(uploadingImage || loadingNotesData) && <LoadingAnimation2 />}
      {showMedia && <MediaRecording />}
    </>
  );
};

export default NoteList;
