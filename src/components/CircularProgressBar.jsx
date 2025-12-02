const CircularProgressBar = ({
  progressValue,
  size,
  strokeWidth,
  strokeColor,
  fontSize,
  fontWeight,
}) => {
  const radius = 40;
  const strokeDasharray = radius * Math.PI * 2;
  const strokeDashoffset =
    strokeDasharray - (strokeDasharray * progressValue) / 100;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeWidth={strokeWidth}
        fill="none"
        stroke="#B9B9B9"
      />
      <circle
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeWidth={strokeWidth}
        fill="none"
        stroke={strokeColor}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        // className="progress-bg"
        // style={{ fill: "none", stroke: "#eae" }}
      />
      <text
        x={"50%"}
        y={"50%"}
        dy={"0.3em"}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {progressValue}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
