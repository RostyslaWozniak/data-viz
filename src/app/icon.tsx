import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="27.5"
          width="14"
          height="32"
          rx="7"
          fill="#72CCFF"
          stroke="#323886"
        />
        <rect
          x="23"
          y="12.5"
          width="14"
          height="47"
          rx="7"
          fill="#21E0DD"
          stroke="#323886"
        />
        <rect
          x="45.5"
          y="33.5"
          width="14"
          height="26"
          rx="7"
          fill="#DA00FF"
          stroke="#323886"
        />
      </svg>
    ),
    { ...size },
  );
}
