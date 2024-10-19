import { useState } from "react";
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
  const [isClosing, setIsClosing] = useState(false); // Nuevo estado

  const handleSectionClick = (data: PopupData) => {
    setPopupData(data);
    setIsClosing(false); // Asegúrate de que no esté en modo de cierre
  };

  const closePopup = () => {
    setIsClosing(true); // Activa la animación de cierre
    setTimeout(() => setPopupData(null), 300); // Espera a que termine la animación
  };

  return (
    <div className="absolute top-0 z-[-2] w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] px-2">
      <Header />
      <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-3 md:grid-cols-5">
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
        <Section onClick={handleSectionClick} />
      </div>
      <Footer />
      {popupData && (
        <Popup data={popupData} onClose={closePopup} isClosing={isClosing} />
      )}
    </div>
  );
}

export default App;
