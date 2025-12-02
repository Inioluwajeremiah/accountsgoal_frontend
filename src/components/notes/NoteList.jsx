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
  useUpdateNoteMutation,
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
import TextArea from "../forms/TextArea";
import MicrophoneActive from "../../icons/MicrophoneActive";
import SaveIcon from "../../icons/SaveIcon";
import DropDownAlert from "../DropDownAlert";

const NoteList = ({
  uniqueId,
  handleToggleNoteModal,
  handleToggleCloseModal,
  dontShowHeader,
  refetch,
  mediaRecorder,
}) => {
  const { accountsGoalUser } = useSelector((state) => state.auth);
  // const { data: accountsGoalUser, isError, error } = useGetUserQuery();

  const cloudinary_cloud_name = import.meta.env.VITE_cloudinary_cloud_name;
  const cloudinary_api_key = import.meta.env.VITE_cloudinary_api_key;
  const cloudinary_secret_key = import.meta.env.VITE_cloudinary_secret_key;
  const cloudinary_upload_preset = import.meta.env
    .VITE_cloudinary_upload_preset;

  console.log("cloudinary_cloud_name ==> ", cloudinary_cloud_name);
  console.log("cloudinary_upload_preset ==> ", cloudinary_upload_preset);

  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [sound, setSound] = useState();
  // const [recording, setRecording] = useState();
  const [recording, setRecording] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [showSendButton, setShowSendButton] = useState(false);
  const [showMedia, setSHowMedia] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);

  // let time = 0;
  const imageHeight = Math.floor(windowWidth * 0.8);
  const timerRef = useRef(null);
  const scrollViewRef = useRef(null);
  const pickImageRef = useRef(null);
  const textEditorRef = useRef(null);
  const fileInputRef = useRef(null);
  const cancelRecRef = useRef(false);
  const timeRef = useRef(0);

  // console.log("textEditorRef ==> ", textEditorRef);

  const [deleteAudio, { isLoading: loadingDeleteAudio }] =
    useDeleteAudioMutation();
  const [deleteImage, { isLoading: loadingDeleteImage }] =
    useDeleteImageMutation();
  const [deleteText, { isLoading: loadingDeleteText }] =
    useDeleteTextMutation();
  const {
    data: notesData,
    refetch: refetchNoteData,
    isLoading: loadingNotesData,
    isError: isNoteError,
    error: getNoteError,
  } = useGetAllNotesByUniqueIdQuery({
    userId: accountsGoalUser?._id,
    uniqueId: uniqueId,
  });

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

  const noteId = notesData && notesData?.data?.noteId?._id;

  // console.log("uniqueId==>", uniqueId);
  // console.log("note data is error ===> ", !loadingNotesData && isNoteError);
  // console.log("note data error ===> ", !loadingNotesData && getNoteError);
  // console.log("note data  ===> ", notesData && notesData);

  const [updateNote, { isLoading: loadingUpdateNote }] =
    useUpdateNoteMutation();

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
    // myHeaders.append("Content-Type", "multipart/form-data");
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
    formdata.append("public_id", accountsGoalUser?._id + time);
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
        // handleUploadImage(result.secure_url);
        // const imageHTML = `<img src="${result.secure_url}" style="max-width: 90%; margin-top: 20px; margin-bottom: 20px;" />`;
        // setEditContent((prevContent) => prevContent + imageHTML);
        handleInsertImage(result.secure_url);
      })
      .catch((error) => {
        console.error(error);
        setUploadingImage(false);
      });
  };

  // const uploadAudio = async (uri, filename) => {
  const uploadAudio = async (formfile) => {
    console.log("cloudinary_upload_preset===>", cloudinary_upload_preset);
    const myHeaders = new Headers();

    const time = new Date().getTime();

    // const formfile = {
    //   uri: uri,
    //   type: "audio/mp4",
    //   name: filename,
    // };
    const formdata = new FormData();
    formdata.append("file", formfile);
    formdata.append("upload_preset", cloudinary_upload_preset);
    formdata.append("public_id", accountsGoalUser?._id + time);
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
        // setProfileImage(result.secure_url);
        setUploadingImage(false);
        if (result.secure_url) {
          const audioContainer = document.createElement("div");
          audioContainer.contentEditable = false;
          const audio = document.createElement("audio");
          audio.controls = true;
          audio.src = result.secure_url;
          audio.style.marginTop = "20px";
          audio.style.marginBottom = "20px";
          audio.style.width = "70%";

          audioContainer.appendChild(audio);
          textEditorRef.current.appendChild(audioContainer);
          // create an empty paragraph to make sure there's space for the cursor
          const emptyParagraph = document.createElement("p");
          emptyParagraph.innerHTML = "<br>";
          textEditorRef.current.appendChild(emptyParagraph);
        }
      })
      .catch((error) => {
        console.error(error);
        setUploadingImage(false);
      });
  };

  const handleInsertImage = (imageUrl) => {
    // const file = event.target.files[0];
    // console.log("selected image ==> ", file);
    if (imageUrl) {
      // const imageUrl = URL.createObjectURL(file);
      const image = new Image();
      image.src = imageUrl;
      const img = document.createElement("img");
      console.log("img url ==> ", imageUrl);
      img.src = imageUrl;
      img.style.marginTop = "20px";
      img.style.marginBottom = "20px";
      img.style.width = "80%";
      // img.style.height = "80%";
      img.style.objectFit = "contain";
      textEditorRef.current.appendChild(img);

      // create an empty paragraph to make sure there's space for the cursor
      const emptyParagraph = document.createElement("p");
      emptyParagraph.innerHTML = "<br>";
      textEditorRef.current.appendChild(emptyParagraph);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Function to start the timer
  const startTimer2 = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear any existing interval
    }

    timerRef.current = setInterval(() => {
      timeRef.current += 1;

      const newSeconds = timeRef.current % 60;
      const newMinutes = Math.floor(timeRef.current / 60) % 60;
      const newHours = Math.floor(timeRef.current / 3600);

      // Update state only if values have changed
      setSecond((prev) => (prev !== newSeconds ? newSeconds : prev));
      setMinute((prev) => (prev !== newMinutes ? newMinutes : prev));
      setHour((prev) => (prev !== newHours ? newHours : prev));
    }, 1000);
  };

  const startRecording = async () => {
    setRecording(true);
    cancelRecRef.current = false;

    console.log("mediaRecorder ===> ", mediaRecorder);

    startTimer2();
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      if (!cancelRecRef.current) {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp4",
        });
        console.log("audioBlob ===> ", audioBlob);
        const audioUrl = URL.createObjectURL(audioBlob);

        console.log("audioUrl ==> ", audioUrl);

        const filename = `${accountsGoalUser?._id}-audio-${Date.now()}`;
        const formFile = new File([audioBlob], filename, { type: "audio/mp4" });
        console.log("upload audio form file ===> ", formFile);
        // uploadAudio(audioUrl, filename);
        uploadAudio(formFile);
      }
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
    clearInterval(timerRef.current);
    // time = 0;
    timeRef.current = 0;
    setHour("");
    setMinute("");
    setSecond("");
  };

  const cancelRedording = async () => {
    if (mediaRecorderRef.current && recording) {
      cancelRecRef.current = true;
      mediaRecorderRef.current.stop();
      audioChunksRef.current = [];
      setRecording(false);
      clearInterval(timerRef.current);
      // time = 0;
      timeRef.current = 0;
      setHour("");
      setMinute("");
      setSecond("");
      console.log("Recording canceled");
    }
  };

  const handleSaveContent = async () => {
    if (textEditorRef.current) {
      const content = textEditorRef.current.innerHTML;
      // setHtmlContent(content);
      console.log("HTML Content: ", content);

      // Alert.alert("", userNote);
      if (notesData && notesData?.data?.noteId?._id) {
        const response = await updateNote({
          uniqueId: uniqueId,
          noteId: noteId,
          text: content,
        });
        console.log("update note response ====>>> ", response);

        if (response.data) {
          refetchNoteData();
          setAlertMessage(response?.data?.message);
          setAlertType("success");
          setShowAlertModal(true);
        }
        if (response.error) {
          setAlertMessage(response?.error?.data?.message);
          setAlertType("danger");
          setShowAlertModal(true);
        }
      } else {
        const response = await addText({
          user: accountsGoalUser._id,
          text: content,
          uniqueId,
        });
        console.log("add text response ====>>> ", response);
        if (response.data) {
          setAlertMessage("Note saved");
          setAlertType("success");
          setShowAlertModal(true);
        }
        if (response.error) {
          setAlertMessage(response?.error?.data?.msg);
          setAlertType("danger");
          setShowAlertModal(true);
        }
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef) {
      scrollViewRef.current.scrollTop = scrollViewRef.current.scrollHeight;
    }
  };
  // scrollContainer.scrollTop = scrollContainer.scrollHeight;

  useEffect(() => {
    let interval = null;

    interval = setInterval(async () => {
      if (recording) {
      }
    }, 1000);
    clearInterval(interval);

    return () => clearInterval(interval);
  }, [recording]);

  // scrollTop = scrollContainer.scrollHeight
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (showAlertModal === true) {
      setTimeout(() => {
        setShowAlertModal(false);
      }, 1000);
    }
  });
  useEffect(() => {
    // if (!loadingNotesData && notesData) {
    //   setInitialContent(notesData?.data?.noteId?.text);
    // }
    if (textEditorRef.current) {
      textEditorRef.current.innerHTML = notesData?.data?.noteId?.text || "";
    }
  }, [loadingNotesData, notesData]);

  return (
    <>
      <div
        className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30  bg-white flex flex-col justify-between items-start pt-6  rounded-t-3xl md:rounded-none overflow-y-scroll`}
      >
        <div
          ref={scrollViewRef}
          className="relative w-full h-full mx-auto flex flex-col justify-between bg-white px-10 py-12 rounded-3xl overflow-y-scroll"
        >
          <div className="h-full">
            <FeaturesHeader
              dontShowHeader={dontShowHeader}
              title={"Notes"}
              handleBackButton={handleToggleNoteModal}
              handleCloseButton={handleToggleCloseModal}
            />

            {/* note content */}
            <div
              contentEditable
              ref={textEditorRef}
              className="max-h-[90%] p-5 min-h-[90%] w-full bg-screen-bg outline-none overflow-y-scroll "
              // onInput={handleInput}
              // dangerouslySetInnerHTML={{ __html: editContent }}
              // dir="ltr"
            ></div>
          </div>

          {/* no todo image */}
          {/* {!loadingNotesData && !notesData && (
            <div className="h-fit  w-full flex flex-col justify-center items-center">
              <img src={todoIcon} alt="todo icon" />
              <p className="text-[24px] text-[#A8A8A8] mt-6">
                No note for account
              </p>
            </div>
          )} */}
        </div>
        {/* text editor tools */}
        <div className="absolute w-full left-0 bottom-0  py-2 bg-white">
          <div className="w-[80%] mx-auto flex flex-row self-center items-center justify-evenly h-12 rounded-full px-4 ">
            {/*upload image icon */}
            <input
              ref={pickImageRef}
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleSelectImage}
              // onChange={handleInsertImage}
              className="hidden"
            />

            <button className="" onClick={() => pickImageRef.current.click()}>
              <AddImageLargeIcon color={"#A8A8A8"} />
            </button>

            {/* microphone icon */}
            <button onClick={startRecording}>
              {/* <button onClick={() => setSHowMedia(!showMedia)}> */}
              <MicrophoneIcon />
            </button>

            <button onClick={handleSaveContent}>
              <SaveIcon color={"#A8A8A8"} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              // onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
        </div>

        {/* recording view */}
        {recording && (
          <div className="absolute w-full left-0 bottom-0  py-2 bg-white">
            <div className="w-[80%] mx-auto flex flex-row self-center items-center justify-evenly h-12 rounded-full px-4 ">
              {/*upload image icon */}
              {/* <div className="absolute bottom-0 max-w-48 h-14 py-2 px-5 bg-white flex flex-row items-center justify-between "> */}
              <p
                // style={{ width: windowWidth * 0.25 }}
                className="py-2 overflow-scroll"
              >
                {hour.toString().padStart(2, "0")}:
                {minute.toString().padStart(2, "0")}:
                {second.toString().padStart(2, "0")}
              </p>
              {/* <div className=" flex flex-row items-center justify-evenly"> */}

              <button
                // style={{ width: windowWidth * 0.65 }}
                onClick={cancelRedording}
                className="flex flex-row items-center  "
              >
                <p className="py-2 bg-red-600 rounded-md px-3 p-1 text-white">
                  {"Cancel"}
                </p>
              </button>
              {/* stop recording to send to database */}
              <button onClick={stopRecording}>
                <MicrophoneActive />
              </button>
            </div>
          </div>
          // </div>
        )}
      </div>
      {(uploadingImage || loadingNotesData) && <LoadingAnimation2 />}

      {/* alert */}
      {showAlertModal && (
        <DropDownAlert
          showAlertModal={showAlertModal}
          message={alertMessage}
          type={alertType}
        />
      )}
      {/* {showMedia && <MediaRecording />} */}
    </>
  );
};

export default NoteList;
