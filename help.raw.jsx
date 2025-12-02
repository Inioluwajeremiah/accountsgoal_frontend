const { isLoaded } = useJsApiLoader({
  id: "google-map-script",
  googleMapsApiKey: "AIzaSyBx5KGKK1oPjtvLbiumwQ8DS-a9GpSVLWI",
});
//     "E5:63:E7:9B:5B:30:EF:10:F7:DB:0B:2E:8D:75:EE:D8:B9:E8:D1:92:12:53:C8:74:DE:A1:2B:58:97:AB:21:FA",
// "F0:39:25:6C:F8:6D:0C:51:F0:73:DC:32:19:25:13:D7:EE:28:38:CE:2C:C0:08:38:02:08:54:B0:EC:C1:C4:F6",
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

<>
  <APIProvider apiKey="AIzaSyBx5KGKK1oPjtvLbiumwQ8DS-a9GpSVLWI">
    <div className="h-screen w-[94%] absolute right-0 overflow-x-scroll">
      {/* This div will take up the remaining space */}
      <Map zoom={3} mapId={"ce7c26eb2155bd3d"}>
        {excelData &&
          excelData.length > 0 &&
          excelData.map((user, index) => (
            <div key={index} className="relative border borderwhit4">
              {user.data &&
                user.data.map((item, i) => (
                  <Marker
                    key={i}
                    position={{
                      lat: parseFloat(item.ADDRESS.trim().split(",")[0]),
                      lng: parseFloat(
                        item.ADDRESS.trim().split(",")[1]?.trim()
                      ),
                    }}
                    className="border border-red-600"
                    clickable
                    onClick={handleShowToolTip}

                    // onPress={() => handleOnPressMarker(item)}
                  >
                    <button
                      clickable
                      className="relative w-10 h-10 rounded-full bg-primary-color flex items-center justify-center"
                      onClick={handleShowToolTip}
                    >
                      <MarkerIcon />
                    </button>
                    {/* tool tip */}
                    {showToolTip && (
                      <div
                        style={{ width: 120, height: 45 }}
                        className="absolute -top-10"
                      >
                        <div className="relative w-full h-9 rounded-xl bg-primary-color flex flex-col items-center justify-center ">
                          <h4 className="text-white text-center text-[8px] p-2">
                            {/* {item.ADDRESS.split(",")[0].trim()} */}
                            {item?.ACCOUNT_NAME}
                          </h4>
                          {/* <h4 className="text-white text-center text-[8px] p-2">
                {item.ADDRESS.split(",")[1].trim()}
              </h4> */}
                          <div className="-mb-3 ">
                            <CaretDown />
                          </div>
                        </div>
                      </div>
                    )}
                  </Marker>
                ))}
            </div>
          ))}
      </Map>
    </div>
  </APIProvider>
  <GoogleMap
    // mapContainerStyle={containerStyle}
    mapContainerStyle={{ width: "100%", height: window.innerHeight }}
    center={center}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}
  >
    {/* Child components, such as markers, info windows, etc. */}
    {excelData &&
      excelData.length > 0 &&
      excelData.map(
        (user, index) =>
          // <div key={index}>
          user.data &&
          user.data.map((item, i) => (
            <Marker
              key={i}
              position={{
                lat: parseFloat(item.ADDRESS.trim().split(",")[0]),
                lng: parseFloat(item.ADDRESS.trim().split(",")[1]?.trim()),
              }}
              onPress={() => handleOnPressMarker(item)}
            >
              <div className="relative w-10 h-10 rounded-full bg-primary-color flex items-center justify-center">
                <MarkerIcon />
              </div>

              <div style={{ width: 120, height: 45 }}>
                <div className="relative w-full h-9 rounded-xl bg-primary-color flex flex-col items-center justify-center ">
                  <h4 className="text-white text-center text-[8px] p-2">
                    {/* {item.ADDRESS.split(",")[0].trim()} */}
                    {item?.ACCOUNT_NAME}
                  </h4>
                  {/* <h4 className="text-white text-center text-[8px] p-2">
                {item.ADDRESS.split(",")[1].trim()}
              </h4> */}
                  <div className="-mb-3 ">
                    <CaretDown />
                  </div>
                </div>
              </div>
            </Marker>
          ))
        // }
        // </div>
      )}
  </GoogleMap>

  <div className="h-screen w-[94%] absolute right-0 overflow-x-scroll">
    <GoogleMap
      // mapContainerStyle={containerStyle}
      mapContainerStyle={{ width: "100%", height: window.innerHeight }}
      center={center}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {excelData &&
        excelData.length > 0 &&
        excelData.map((user, index) => (
          <div key={index} className="relative ">
            {user.data &&
              user.data.map((item, i) => (
                <MarkerF
                  // children={() => }
                  key={i}
                  position={{
                    lat: parseFloat(item.ADDRESS.trim().split(",")[0]),
                    lng: parseFloat(item.ADDRESS.trim().split(",")[1]?.trim()),
                  }}
                  onPress={() => handleOnPressMarker(item)}
                >
                  <div className="relative border border-red-600 w-10 h-10">
                    <button
                      clickable
                      className="relative w-10 h-10 rounded-full bg-primary-color flex items-center justify-center"
                      onClick={() => handleShowToolTip(item, i)}
                    >
                      <MarkerIcon />
                    </button>
                    {/* tool tip */}
                    {currentIndex === i && (
                      <div
                        style={{ width: 120, height: 45 }}
                        className="absolute -top-10"
                      >
                        <div className="relative w-full h-9 rounded-xl bg-primary-color flex flex-col items-center justify-center ">
                          <h4 className="text-white text-center text-[8px] p-2">
                            {/* {item.ADDRESS.split(",")[0].trim()} */}
                            {currentItem?.ACCOUNT_NAME}
                          </h4>
                          {/* <h4 className="text-white text-center text-[8px] p-2">
                {item.ADDRESS.split(",")[1].trim()}
              </h4> */}
                          <div className="-mb-3 ">
                            <CaretDown />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </MarkerF>
              ))}
          </div>
        ))}
    </GoogleMap>
  </div>

  {/* loading animation */}
  {loadingDelete && (
    <Modal animationType="none" visible={loadingDelete} transparent={true}>
      <div className="flex-1 h-full w-full bg-black/30 justify-center items-center">
        <LottieView
          className="w-32 h-32"
          source={require("../../assets/starloader.json")}
          autoPlay
          loop={true}
        />
      </div>
    </Modal>
  )}

  {/************** view goal modal *************/}
  {toggleModal && (
    <Modal transparent={true} visible={toggleModal} animationType="slide">
      <div className="h-full w-full bg-transparent">
        <button className="h-[40%] bg-black/50" onPress={handleToggleModal} />
      </div>

      <div
        contentContainerStyle={{ flexGrow: 1 }}
        className="absolute bottom-0 w-full h-[65%] rounded-t-3xl  bg-screen-bg px-5"
      >
        {/* close button */}
        <button
          className=" w-6 h-6 flex self-end mt-7 items-center justify-center rounded-full  border border-[#A8A8A8] p-2"
          onPress={handleToggleModal}
        >
          <img src={closeButton} alt="close button" />
        </button>
        <p className=" text-base font-bold text-left ">
          {item?.goalName || "Goal name"}
        </p>

        <div className="flex flex-row items-center mt-6">
          <CalendarSmall />
          <p className="text-xs text-form-text-color  ml-2">
            {item?.endDate || "30 days left"}
          </p>
        </div>
        <div className="flex flex-row items-center mt-2">
          <UserIcon />
          <p className="text-xs text-form-text-color ml-2">
            {item?.client || "Baylor scott & White Irving"}
          </p>
        </div>

        <div className="mt-10 ">
          <Progress.Bar
            progress={progressValue}
            width={windowWidth - 40}
            height={10}
            borderRadius={20}
            unfilledColor="#E4E4E4"
            borderWidth={0}
            color={
              progressValue <= 0.3
                ? "#F35555"
                : progressValue > 0.3 && progressValue <= 0.6
                ? "#ffa600e6"
                : "#226e22eb"
            }
          />
          <div className="flex flex-row justify-between mt-2 mb-6">
            <p
              className={`${
                progressValue <= 0.3
                  ? "text-[#F35555]"
                  : progressValue > 0.3 && progressValue <= 0.6
                  ? "text-[#ffa600e6]"
                  : "text-[#226e22eb]"
              } text-xs font-semibold`}
            >
              {completedSubgoals} / {subGoalsLength}
            </p>
            <p
              className={`${
                progressValue <= 0.3
                  ? "text-[#F35555]"
                  : progressValue > 0.3 && progressValue <= 0.6
                  ? "text-[#ffa600e6]"
                  : "text-[#226e22eb]"
              } text-xs font-semibold`}
            >
              {Math.floor(progressValue * 100)}%
            </p>
          </div>
        </div>

        {/* list sub goals */}

        <SubgoalsText />
        <div className="pb-10">
          {selectedSubgoals.map((item, index) => (
            <div
              className="w-full flex flex-row items-center mt-4  "
              key={index}
            >
              {/* check box */}
              <div className="h-4 w-4 border border-black flex flex-row justify-center items-center">
                {item.status === true && <TickIcon />}
              </div>
              <p className="ml-4">{item.title}</p>
            </div>
          ))}
        </div>
        {/* edit goal button */}
        <button
          className="absolute bottom-10 right-0 w-[60px] h-[60px] rounded-full bg-primary-color flex items-center justify-center"
          onPress={handleToggleEditModal}
        >
          <EditTodoIcon color={"#fff"} />
        </button>
      </div>
    </Modal>
  )}

  {/************** edit goal modal *************/}
  {editGoalModal && (
    <Modal transparent={true} visible={toggleModal} animationType="slide">
      <div className="h-full w-full bg-transparent">
        <button
          className="h-[25%] bg-black/50"
          onPress={handleToggleEditModal}
        />
      </div>
      <div className="absolute bottom-0 flex-1 w-full h-[85%] rounded-t-3xl  bg-screen-bg ">
        <div
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 32}
          className="flex-1 h-full w-full "
        >
          <div contentContainerStyle={{ flexGrow: 1 }} className=" flex-1 px-5">
            {/* close button */}
            <button
              className="absolute right-0 top-5 w-6 h-6 flex items-center justify-center rounded-full  border border-[#A8A8A8] "
              onPress={handleToggleEditModal}
            >
              <CloseButton color={"#A8A8A8"} />
            </button>
            {/* goal name */}
            <LabelComponent label={"Goal Name"} required={true} />
            <div className="max-h-12 border border-form-text-color flex flex-row items-center justify-between rounded-3xl mt-4 py-3 px-6 ">
              <CustomTextInputField
                placeholder="Goal name"
                placeholderTextColor={"#B9B9B9"}
                cursorColor={"#B9B9B9"}
                onChangeText={(e) => setGoalName(e)}
                value={goalName}
                className="w-[70%]"
              />
              {goalName && (
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full  border border-[#000] "
                  onPress={() => setGoalName("")}
                >
                  <CloseButton color={"#000"} />
                </button>
              )}
            </div>

            {/* attachedClients */}
            <LabelComponent label={"Attach client to goals"} required={true} />
            <button
              className={customButtonWithIcon + " justify-between"}
              onPress={handleToggleAttachClient}
            >
              <p className="text-sm text-black">
                <ProfileIcon /> {"   "} {attachedClients}
              </p>
              <IconCaretDropdown />
            </button>
            {/* attachedClients drop down */}
            {/* attachedClients drop down */}
            {toggleAttachClients && (
              <div className="w-full bg-white rounded-lg my-2 p-3 ">
                {/* filter clients */}
                <CustomTextInputField
                  placeholder="filter user"
                  placeholderTextColor={"#B9B9B9"}
                  cursorColor={"#B9B9B9"}
                  value={attachClientInput}
                  className="h-12 border-b border-b-border-color px-2 text-primary-accent-color "
                  onChangeText={(e) => setAttaChClientInput(e)}
                />
                {/* {filteredClientData &&
                      filteredClientData.map((item, index) => (
                        <div key={index}>
                        
                          <button
                            onPress={() => handleSelectClients(item.email)}
                            className={`${
                              index === filteredClientData.length - 1
                                ? "border-none"
                                : "border-b-[0.7px] border-b-form-text-color"
                            }`}
                            key={index}
                          >
                            <p
                              className={` py-3 ${
                                attachedClients === item.email
                                  ? "text-black"
                                  : "text-form-text-color"
                              }`}
                            >
                              {item.email}
                            </p>
                          </button>
                        </div>
                      ))} */}

                <div>
                  {filteredClientData &&
                    filteredClientData.map((item, i) => (
                      <button
                        key={i}
                        onPress={() => handleSelectClients(item)}
                        //   className={`${
                        //     i === user?.data?.length - 1
                        //       ? "border-none"
                        //       : "border-b-[0.7px] border-b-form-text-color"
                        //   }`}
                      >
                        <p
                          className={` py-3 ${
                            attachedClient === item?.ACCOUNT_NAME
                              ? "text-black"
                              : "text-form-text-color"
                          }`}
                        >
                          {item?.ACCOUNT_NAME}
                        </p>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* end date */}
            <LabelComponent label={"End Date"} required={true} />
            <button
              className={customButtonWithIcon}
              onPress={handelToggleDateTimePickerMode}
            >
              <CalendarIcon color={"#000"} />
              <p className="ml-3 text-sm text-black">{date.toDateString()}</p>
            </button>

            {/* edit sub goals */}
            <LabelComponent label={"Sub Goals"} required={true} />

            <div className="w-full flex flex-row items-center mt-2">
              {/* check box */}
              <button
                className="h-4 w-4 border border-black flex flex-row justify-center items-center"
                onPress={handleToggleNewSubgoals}
              >
                {toggleNewSUbgoals && <TickIcon />}
              </button>
              <CustomTextInputField
                placeholder={"list item"}
                placeholderTextColor={"#B9B9B9"}
                cursorColor={"#B9B9B9"}
                value={subgoalInput}
                className={`flex-1 text-sm ml-4 h-12 ${
                  toggleNewSUbgoals && "border-b border-b-border-color"
                }`}
                onChangeText={(e) => setSubgoalInput(e)}
                onSubmitEditing={handleSetSubgoals}
              />
            </div>

            {/* list sub goals */}
            {selectedSubgoals.map((item, index) => (
              <div
                className="w-full flex flex-row items-center mt-4 "
                key={index}
              >
                {/* check box */}
                <button
                  className="h-4 w-4 border border-black flex flex-row justify-center items-center"
                  onPress={() => handleSelectSubgoals(index)}
                >
                  {item.status === true ? <TickIcon /> : ""}
                  {/* {selectedSubgoals.includes(item) && <TickIcon />} */}
                </button>
                <p className="ml-4">{item.title}</p>
                <button
                  className="absolute right-0 w-4 h-4 flex items-center justify-center rounded-full  border border-[#000] "
                  onPress={() => handleRemoveSubgoals(item)}
                >
                  <CloseButton color={"#000"} />
                </button>
              </div>
            ))}

            {/* save goals button */}

            <button
              className={`${
                !isValidForm ? "bg-primary-color" : "bg-[#6787e7]"
              } rounded-full mt-10 h-12 py-3 flx justify-center items-center mb-10`}
              disabled={isValidForm ? true : false}
              onPress={handleEditGoal}
            >
              <p className="text-center font-semibold text-white text-base">
                {loadingEditGoal ? <Loading /> : "Save Goal"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )}
  {/* alert */}
  {showAlertModal && (
    <DropDownAlert
      showAlertModal={showAlertModal}
      message={"Goal updated"}
      type={"success"}
    />
  )}

  {/* date time picker */}
  {showDateTimePicker && (
    <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={"date"}
      is24Hour={false}
      onChange={handleDateTimePicker}
    />
  )}
</>;
