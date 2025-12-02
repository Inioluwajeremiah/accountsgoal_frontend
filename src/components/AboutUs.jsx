import { useEffect, useRef } from "react";
import video from "../assets/video.png";
function AboutUs() {
  const aboutUsRef = useRef(null);
  useEffect(() => {
    // Scroll to the FAQ section if the hash is #faq
    if (window.location.hash === "#aboutus") {
      aboutUsRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <section
      id="aboutus"
      ref={aboutUsRef}
      className="container mx-auto flex flex-col items-center justify-center py-10  px-10"
    >
      <div className=" bg-blue-500 rounded-full shadow flex items-center justify-center px-4 py-3">
        <div className="text-white w-fit">About Us</div>
      </div>
      <div>
        <h2 className="font-bold text-sm md:text-3xl text-center mt-8 md:mt-12">
          User-Focused Design for Unmatched Efficiency
        </h2>
        <h2 className="font-normal text-xs md:text-lg text-center mt-3 mb-8 md:mb-16">
          We are dedicated to empowering professionals and businesses with
          innovative technology. <a href="/">Learn More</a>
        </h2>
      </div>

      <img
        src={video}
        loading="lazy"
        alt="video background"
        className="w-[90%] max-auto md:w-full"
      />
    </section>
  );
}
export default AboutUs;
