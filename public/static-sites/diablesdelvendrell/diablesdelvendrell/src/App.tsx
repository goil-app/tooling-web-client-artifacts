import { useState, useEffect, useRef } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";
import Popup from "./components/Popup";

// Define el tipo para los datos del popup
interface PopupData {
  image: string;
  name: string;
  description: string;
}

function App() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (!visibleSections.includes(index)) {
              setVisibleSections((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentSectionRefs = sectionRefs.current;

    currentSectionRefs.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentSectionRefs.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [visibleSections]);

  const handleSectionClick = (data: PopupData) => {
    setPopupData(data);
    setIsClosing(false);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => setPopupData(null), 300);
  };

  return (
    <div className="absolute top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] px-2">
      <Header />
      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-3 md:grid-cols-5">
        {Array.from({ length: 40 }, (_, index) => {
          const isLocked = index % 5 === 0;
          return (
            <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
              {visibleSections.includes(index) && (
                <Section onClick={handleSectionClick} locked={isLocked} />
              )}
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
