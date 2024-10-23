import React, { useState } from "react";
import "../assets/css/popup.css";
import { PulseLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface PopupProps {
  data: {
    image: string;
    name: string;
  };
  onClose: () => void;
  isClosing: boolean;
}

const Popup: React.FC<PopupProps> = ({ data, onClose, isClosing }) => {
  const [loading, setLoading] = useState(true);

  if (!data || !data.image || !data.name) {
    console.log("Datos no válidos para el popup:", data);
    return null;
  }

  console.log("Datos del popup:", data);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={onClose}
    >
      <div
        className={`[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#f00_100%)] p-5 rounded-md shadow-2xl absolute flex flex-col gap-4 mx-5 ${
          isClosing ? "animate-slide-down" : "animate-slide-up"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-auto">
            {loading && (
              <div className="absolute inset-0 h-[450px] w-[300px] flex items-center justify-center">
                <PulseLoader color="red" />
              </div>
            )}
            <LazyLoadImage
              className={`rounded-md w-[300px] object-cover`}
              src={data.image}
              loading="lazy"
              onLoad={() => setLoading(false)}
              onError={() => {
                setLoading(false);
                console.error("Error loading image:", data.image);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font text-2xl font-bold text-white">{data.name}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
