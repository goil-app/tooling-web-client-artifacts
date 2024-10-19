import React from "react";
import "../assets/css/popup.css";

interface PopupProps {
  data: {
    image: string;
    name: string;
    description: string;
  };
  onClose: () => void;
  isClosing: boolean;
}

const Popup: React.FC<PopupProps> = ({ data, onClose, isClosing }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={onClose}
    >
      <div
        className={`bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] p-5 rounded-md shadow-2xl absolute flex flex-col gap-4 ${
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
          <div className="bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] h-[300px] w-full rounded-md"></div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-white">{data.name}</h2>
            <p className="text-gray-300">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
