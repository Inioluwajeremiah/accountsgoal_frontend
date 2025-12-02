const ProgressBar = ({ progressValue, progressColor }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "24px",
        backgroundColor: "#B9B9B9",
        borderRadius: 20,
      }}
    >
      {/* Render the progress bar */}
      <div
        style={{
          width: `${progressValue}%`,
          // width: progressValue,
          height: "100%",
          backgroundColor: progressColor,
          borderRadius: 20,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
