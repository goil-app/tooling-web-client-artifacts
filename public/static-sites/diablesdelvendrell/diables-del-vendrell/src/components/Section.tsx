import React, { useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface SectionProps {
  onClick: (data: { image: string; name: string }) => void;
  locked?: boolean;
  imageName: string;
  name: string;
}

const Section: React.FC<SectionProps> = ({
  onClick,
  locked = false,
  imageName,
  name,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const data = {
    image: `/img/vestits/${imageName}`,
    name: name,
  };

  let img = data.image;

  if (locked) {
    img = `/img/vestits/vestit-bloquejat.svg`;
  }

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col gap-2 items-center justify-between p-3 rounded-md ${
        locked ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={() => (locked ? null : onClick(data))}
    >
      <div className="relative w-full h-auto">
        {isLoading && (
          <div className="absolute inset-0 h-[180px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
            <PulseLoader color="#910000" />
          </div>
        )}
        <LazyLoadImage
          className={`rounded-md w-full h-[180px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover`}
          src={img}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <h2 className="text-sm text-white text-center">{name}</h2>
    </div>
  );
};

export default Section;
