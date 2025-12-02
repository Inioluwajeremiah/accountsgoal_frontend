<div
  className="  flex flex-row justify-center w-full "
  style={{ height: screen }}
>
  {/* w-[30%] -mt-[30vh] */}
  <div className="hidden md:block w-[30%] -mt-32  -mr-20">
    <img
      src={appscreenshot2}
      alt="app design"
      // h-[90vh] w-full
      className={` w-full  object-contain border border-red-700`}

      // style={{ height: windowHeight }}
    />
  </div>
  {/* -mt-[15vh] md:-mt-[35vh] */}
  <div className="w-[80%] md:w-[30%] -mt-40  z-20 ">
    <img
      src={appscreenshot1}
      alt="app design"
      // h-[75vh] md:h-[95vh]
      className={`w-full  object-contain border border-red-700`}
    />
  </div>
  {/* -mt-[30vh]  */}
  <div className="hidden md:block w-[30%] -mt-32 z-10 -ml-10 ">
    <img
      //  h-[90vh]
      src={appscreenshot3}
      alt="app design"
      className={`w-full object-contain border border-red-700`}
    />
  </div>
  <div className="flex flex-row justify-center flex-wrap gap-2 mt-3">
    {Todo.map((item, index) => (
      <div className="flex flex-row justify-between items-center gap-x-4 bg-white rounded-md shadow-md p-3 ">
        <div className="flex flex-col items-start">
          <p
            className={`text-xs text-tertiary-accent-color text-left rounded-full px-2 py-1`}
            style={{ backgroundColor: item.priorityColor }}
          >
            {item.priority}
          </p>
          <p className="text-sm text-left font-semibold py-1">{item.title}</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <svg
              Width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.39238 7.97672C6.32444 7.97672 7.89072 6.41044 7.89072 4.47838C7.89072 2.5463 6.32444 0.980042 4.39238 0.980042C2.4603 0.980042 0.894043 2.5463 0.894043 4.47838C0.894043 6.41044 2.4603 7.97672 4.39238 7.97672Z"
                stroke="#5C5C5C"
                strokeWidth="0.699668"
              />
              <path
                d="M4.39536 3.95651C4.10555 3.95651 3.87061 4.19146 3.87061 4.48126C3.87061 4.77106 4.10555 5.00601 4.39536 5.00601C4.68516 5.00601 4.92011 4.77106 4.92011 4.48126C4.92011 4.19146 4.68516 3.95651 4.39536 3.95651ZM4.39536 3.95651V2.72888M5.44727 5.53482L4.76559 4.85314"
                stroke="#5C5C5C"
                strokeWidth="0.699668"
                strokLinecap="round"
                strokLinejoin="round"
              />
            </svg>
            <p className="py-1 text-xs text-left text-primary-accent-color">
              {item.time}
            </p>
          </div>
        </div>

        <div className="w-4 h-4 border border-primary-accent-color rounded-full"></div>
      </div>
    ))}
  </div>
</div>;

<a
  href="#"
  className="text-white border border-white-color h-16 w-16 rounded-full flex justify-center items-center"
>
  <TwitterIcon />
</a>;
{
  /* tiktok */
}
<a
  href="#"
  className="text-white border border-white-color h-16 w-16 rounded-full flex justify-center items-center"
>
  <TitktokIcon />
</a>;
{
  /* youtube */
}
<a
  href="#"
  className="text-white border border-white-color h-16 w-16 rounded-full flex justify-center items-center"
>
  <YoutubeIcon />
</a>;
{
  /* instagram */
}
<a
  href="#"
  className="text-white border border-white-color h-16 w-16 rounded-full flex justify-center items-center"
>
  <InstagramIcon />
</a>;
