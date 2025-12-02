import React from "react";
import Modal from "./Modal";
// import Lottie from "react-lottie";
import loadingAnimation from "../lottie/loading.json";
import Lottie from "lottie-react";

const LoadingAnimation = () => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: loadingAnimation,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  return (
    <Modal>
      <Lottie animationData={loadingAnimation} loop={true} />
    </Modal>
  );
};

export default LoadingAnimation;
