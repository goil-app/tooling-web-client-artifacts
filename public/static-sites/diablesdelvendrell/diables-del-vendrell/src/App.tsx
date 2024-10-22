import { useState, useRef } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";
import Popup from "./components/Popup";
import imgData from "./data/img.json";

interface PopupData {
  image: string;
  name: string;
}

function App() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSectionClick = (data: PopupData) => {
    setPopupData(data);
    setIsClosing(false);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => setPopupData(null), 300);
  };

  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 bg-black image-background -z-10" />
      <Header />
      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-3 md:grid-cols-5">
        {imgData.map((item, index) => {
          const isLocked = index % 5 === 0;
          if (!item.image || !item.name) return null;
          return (
            <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
              <Section
                onClick={() =>
                  handleSectionClick({
                    image: item.image,
                    name: item.name,
                  })
                }
                name={item.name}
                locked={isLocked}
                imageName={item.image}
              />
            </div>
          );
        })}
      </div>
      <Footer />
      {popupData && (
        <Popup data={popupData} onClose={closePopup} isClosing={isClosing} />
      )}
    </div>
  );
}

export default App;
