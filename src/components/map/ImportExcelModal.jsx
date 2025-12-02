import React, { useRef, useState } from "react";
import Modal from "../Modal";
import Loading from "../Loading";
import excelIcon from "../../assets/excelIcon.svg";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/Endpoints";
import LoadingAnimation from "../LoadingAnimation";
import { useGetUserQuery } from "../../store/authApi";
import closeButton from "../../assets/closeIcon.svg";

const dataToUpload = [
  "ACCOUNT_NAME",
  "ADDRESS",
  "CELEBRATIONS",
  "EMAIL",
  "MOBILE_CONTACT",
  "REVENUE",
];

const ImportExcelModal = ({
  handleToggleImportExcelFile,
  refetchExcelData,
}) => {
  const { data: userInfo, isLoading, isError, error } = useGetUserQuery();
  const accountsGoalUser = isLoading ? "Loading.." : userInfo;
  const [toggleInitialFIleImport, setToggleInitialFIleImport] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = async (event) => {
    try {
      setSelectedFile(event.target.files[0]);
      console.log("selected file ==> ", event.target.files[0]);
      await uploadFile(event.target.files[0]);
    } catch (error) {
      console.log("handleFileChange error ==> ", error);
      setUploadingFile(false);
      setSelectedFile(null);
    }
  };

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // upload file to server
  const uploadFile = async (excelFile) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "multipart/form-data");
    // myHeaders.append("Authorization", `Bearer ${accountsGoalUser?.token}`);

    const formdata = new FormData();
    formdata.append("file", excelFile);

    console.log("fff", formdata);

    const requestOptions = {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${accountsGoalUser?.token}`,
      },
      credentials: "include",
      body: formdata,
    };

    setUploadingFile(true);
    fetch(`${BASE_URL}upload_excel`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("upload excel result ==> ", result);
        if (result === "Excel data uploaded successfully.") {
          refetchExcelData();
          alert("Excel data uploaded successfully");
          setUploadingFile(false);
          setSelectedFile(null);
          handleToggleImportExcelFile();
        }
        // if (result.msg === "Token has expired") {
        //   Alert.alert("", result.msg);
        //   setUploadingFile(false);
        // }
        else {
          alert(result.msg);
          setUploadingFile(false);
          setSelectedFile(null);
        }
        setUploadingFile(false);
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error("upload error ===> ", error);
        setUploadingFile(false);
        setSelectedFile(null);
      });
  };
  const EXCEL_FILE_URL =
    "https://www.accountsgoal.com/excel_template.xlsx" ||
    "http://localhost:5173/excel_template.xlsx";

  //Download excel template function
  const downloadExcelTemplate = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(new Blob([blob]));
        const fileName = url.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = blobUrl;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
  };

  return (
    <Modal>
      <div className="relative w-[80%] md:w-fit max-w-500 h-fit bg-white mx-auto rounded-xl md:rounded-3xl p-6">
        <div className="py-10 ">
          <img src={excelIcon} alt="Excel icon" className="mx-auto" />
          <p className="w-[70%] md:w-[60%] mx-auto text-sm text-secondary-accent-color text-center mt-6  ">
            Easily import your account data from Excel for streamlined account
            management.
          </p>
          <p className="font-black leading-6 text-base text-black mb-6 text-center mt-4">
            Please make sure each excel files as the following vaules
          </p>
          {dataToUpload.map((item, index) => (
            <div className="py-1 flex flex-row items-center  " key={index}>
              <div className="h-1 w-1 bg-black rounded-full mr-2" />
              <p className="text-sm text-black ">{item}</p>
            </div>
          ))}
        </div>
        {/* upload excel file button */}
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".xls,.xlsx"
          style={{ display: "none" }}
        />
        <button
          style={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: "#4169E1",
          }}
          className={`w-full bg-[#C4D1F6] rounded-full mt-4 h-12 py-3 flex justify-center items-center mb-1  `}
          disabled={false}
          onClick={handleButtonClick}
        >
          <div className="text-center font-semibold text-primary-color text-base">
            {uploadingFile ? <Loading /> : <p>Upload document (.xml format)</p>}
          </div>
        </button>
        <div className="flex  justify-center mb-7 mt-2">
          <button
            onClick={() => downloadExcelTemplate(EXCEL_FILE_URL)}
            className="flex items-center gap-x-4 "
          >
            <div className="w-5 h-5">
              <img
                src={excelIcon}
                alt="Excel icon"
                className="mx-auto w-full h-full object-cover object-center"
              />
            </div>
            <p>Download Template</p>
          </button>
        </div>

        <button
          className="absolute top-3 right-3  h-12 w-12 bg-border-color rounded-full text-primary-grey-color"
          onClick={handleToggleImportExcelFile}
        >
          <img
            src={closeButton}
            alt="close button"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
        {uploadingFile && <LoadingAnimation />}
      </div>
    </Modal>
  );
};

export default React.memo(ImportExcelModal);
