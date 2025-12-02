import React, { useCallback, useEffect, useState } from "react";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useSelector } from "react-redux";
import { useGetExcelDataQuery } from "../store/accountApiSlice";
import CaretDown from "../icons/CaretDown";
import MarkerIcon from "../icons/MarkerIcon";
import ImportExcelModal from "../components/map/ImportExcelModal";
import MapPreviewAccount from "../components/map/MapPreviewAccount";
import LoadingAnimation from "../components/LoadingAnimation";
import AddFloatingButon from "../components/AddFloatingButon";
import FeaturesMainHeader from "../components/FeaturesMainHeader";
import SearchBox from "../components/SearchBox";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";

import angleDown from "../assets/angleDown.svg";
import { BASE_URL } from "../utils/Endpoints";
import { useGetInvitedUserQuery, useGetUserQuery } from "../store/authApi";
import axios from "axios";

const MapScreen = () => {
  const { accountsGoalUser: invitedUserfromLocalStorage } = useSelector(
    (state) => state.auth
  );
  const [toggleImportExcelModal, setToggleImportExcelModal] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMapPreview, setShowMapPreview] = useState(false);
  const [searchTerm, handleSearch] = useState("");
  const google_api_key = import.meta.env.VITE_GOOGLE_API_KEY;
  const [getInvitedUserData, setGetInvitedUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const {
    data: accountsGoalUser,
    isLoading,
    isError,
    error,
  } = useGetUserQuery();

  const {
    data: accountsGoalInvitedUser,
    isLoading: inviteLoad,
    isError: inviteError,
    error: inviteErr,
  } = useGetInvitedUserQuery(
    invitedUserfromLocalStorage?.organizationId,
    invitedUserfromLocalStorage?.userId,
    invitedUserfromLocalStorage?._id
  );

  const getInvitedUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}getuser-under-organization/${invitedUserfromLocalStorage.organizationId}/${invitedUserfromLocalStorage.userId}/${invitedUserfromLocalStorage._id}`
      );
      if (res) {
        console.log(res.data, "innnnnnvvvv");
        setGetInvitedUserData(res?.data[0]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitedUser();
  }, []);

  // console.log(
  //   "user-data11",
  //   inviteError ? inviteErr.data : !inviteLoad && accountsGoalInvitedUser
  // );
  const handleToggleImportExcelFile = () => {
    setToggleImportExcelModal(!toggleImportExcelModal);
  };

  const handleShowToolTip = (item, i) => {
    setShowToolTip(!showToolTip);
    // alert(item.ACCOUNT_NAME);
    setCurrentItem(item);
    setCurrentIndex(i + 1);
  };

  const handelToggleAccountPreview = (item, index) => {
    handleShowToolTip(item, index);
    setShowMapPreview(!showMapPreview);
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const [map, setMap] = useState(null);
  // load map
  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  // unload map
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  // fetch excel data
  const {
    data: excelData,
    isLoading: loadingExcelData,
    isError: isExcelrror,
    error: excelDataError,
    refetch: refetchExcelData,
  } = useGetExcelDataQuery({
    userId: accountsGoalUser
      ? accountsGoalUser?._id
      : !loading && getInvitedUserData && getInvitedUserData?.userId?._id,
    // token: accountsGoalUser?.token,
  });

  // filter users
  const filteredClientData =
    excelData &&
    excelData.map((user) => {
      return user.data.filter((item) =>
        item?.ACCOUNT_NAME.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    });

  console.log("excelData ==> ", excelData);
  console.log("filteredClientData ==> ", filteredClientData);

  // Function to check and instantiate MediaRecorder
  const initializeMediaRecorder = (stream) => {
    if (!window.MediaRecorder) {
      console.error("MediaRecorder is not supported in this browser.");
      return;
    }

    try {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error initializing MediaRecorder:", error);
    }
  };

  useEffect(() => {
    // Request access to the microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        initializeMediaRecorder(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  }, []);

  return loadingExcelData ? (
    <LoadingAnimation />
  ) : (
    <APIProvider apiKey={google_api_key}>
      {/* This div will take up the remaining space */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"ce7c26eb2155bd3d"}
        >
          {filteredClientData &&
            filteredClientData.length > 0 &&
            filteredClientData.map((user, index) => (
              <div key={index} className="relative">
                {user.map((item, i) => {
                  if (item?.coordinates?.lat && item?.coordinates?.lng) {
                    return (
                      <AdvancedMarker
                        key={i}
                        position={{
                          // lat: parseFloat(item.ADDRESS.trim().split(",")[0]),
                          // lng: parseFloat(item.ADDRESS.trim().split(",")[1]?.trim()),

                          lat: item?.coordinates?.lat,
                          lng: item?.coordinates?.lng,
                        }}
                        className="w-10 h-10 relative flex flex-col items-center justify-center"
                        clickable
                        // onClick={handleShowToolTip}
                        onClick={() => handleShowToolTip(item, i)}
                        onDoubleClick={() =>
                          handelToggleAccountPreview(item, i)
                        }
                      >
                        <button
                          // style={{ backgroundColor: getIndicator(item).status }}
                          style={{
                            backgroundColor: item?.statusColor?.hexColor,
                          }}
                          className=" w-10 h-10 rounded-full  flex items-center justify-center"
                        >
                          <MarkerIcon />
                        </button>
                        {/* tool tip */}
                        {currentIndex === i + 1 && (
                          <div
                            style={{ width: 120, height: 45 }}
                            className="absolute -top-10 z-20"
                          >
                            <div
                              style={{
                                backgroundColor: item?.statusColor?.hexColor,
                              }}
                              className="relative w-full h-9 rounded-xl  flex flex-col items-center justify-center p-1"
                            >
                              <h4 className="text-white text-center text-[10px]">
                                {/* {item.ADDRESS.split(",")[0].trim()} */}
                                {item?.ACCOUNT_NAME}
                              </h4>
                              <h6 className="text-white text-center text-[8px]">
                                {item?.statusColor?.text}
                              </h6>
                              <div className="-mb-3 ">
                                <CaretDown
                                  color={item?.statusColor?.hexColor}
                                  ifMarker={true}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </AdvancedMarker>
                    );
                  }
                })}
              </div>
            ))}
        </Map>
      </div>
      {/* add floating button */}

      {!getInvitedUserData && (
        <AddFloatingButon handleOnclick={handleToggleImportExcelFile} />
      )}

      <div className="absolute w-[94%] top-0 px-10 pt-10">
        <FeaturesMainHeader
          map={true}
          placeHolderText={"Search for account"}
          handleSearch={handleSearch}
        />
      </div>

      {/******************** import excel  ****************/}
      {toggleImportExcelModal && (
        <ImportExcelModal
          handleToggleImportExcelFile={handleToggleImportExcelFile}
          refetchExcelData={refetchExcelData}
        />
      )}

      {/******************** show account preview  ****************/}

      {currentIndex && (
        <MapPreviewAccount
          handelToggleAccountPreview={() => setCurrentIndex(0)}
          handleToggleTakeActionModal={null}
          currentItem={currentItem}
          handleToggleContactModal={null}
          uniqueId={currentItem.uniqueId}
          currentIndex={currentIndex}
          mediaRecorder={mediaRecorder}
        />
      )}
    </APIProvider>
  );
};

export default MapScreen;
