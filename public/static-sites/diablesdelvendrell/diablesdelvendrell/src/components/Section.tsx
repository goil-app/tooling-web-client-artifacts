import React from "react";
import "../assets/css/section.css";

interface SectionProps {
  onClick: (data: { image: string; name: string; description: string }) => void;
  locked?: boolean;
}

const Section: React.FC<SectionProps> = ({ onClick, locked = false }) => {
  const data = {
    image: "ruta/a/la/imagen.jpg",
    name: "Diables de El Vendrell",
    description: "Descripción del evento o grupo.",
  };

  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center cursor-pointer p-3 rounded-md ${locked ? "blur-sm" : ""}`}
      onClick={() => onClick(data)}
    >
      <div className="bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[350px] w-full rounded-md" />
      <h2 className="text-sm text-white text-center">Diables de El Vendrell</h2>
    </div>
  );
};

export default Section;
