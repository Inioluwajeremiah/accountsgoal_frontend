import Lottie from "lottie-react";
import loadingAnimation from "../lottie/loading.json";

const LoadingAnimation2 = () => {
  return (
    <div
      className={`w-full md:w-[50%] lg:w-[40%] h-1/2 max-h-1/2 md:h-screen md:max-h-screen fixed bottom-0 right-0 md:top-0 z-30 bg-black/10 flex flex-col justify-between items-start rounded-t-3xl md:rounded-none  overflow-scroll`}
    >
      <div className="h-full w-full flex flex-col items-center justify-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="h-20 w-20 "
        />
      </div>
    </div>
  );
};

export default LoadingAnimation2;
