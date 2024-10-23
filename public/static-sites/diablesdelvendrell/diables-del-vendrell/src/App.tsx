import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Section from "./components/Section";
import Popup from "./components/Popup";
import Error404 from "./components/Error404";
import { PulseLoader } from "react-spinners";
import axios from "axios";

interface PopupData {
  id: string;
  image: string;
  name: string;
  validated: boolean;
}

function App() {
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imgData, setImgData] = useState<PopupData[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const imageId = queryParams.get("rid");

  useEffect(() => {
    if (!userId) {
      navigate("/not-found");
      return;
    }

    const fetchVestits = async () => {
      try {
        const response = await axios.get(
          `https://europe-west1-goil-community.cloudfunctions.net/diablesDelVendrellGetVestits?id=${userId}`
        );

        if (response.data.data.length === 0) {
          navigate("/not-found");
        } else {
          setImgData(response.data.data);
          setImagesLoaded(true);

          // Si hay un imageId, buscarlo y actualizar el estado de popupData
          if (imageId) {
            const foundImage = response.data.data.find(
              (item: PopupData) => item.id === imageId
            );
            if (foundImage) {
              setPopupData(foundImage);
            } else {
              navigate("/not-found");
            }
          }
        }
      } catch (error) {
        console.error("Error de Axios:", error);
        navigate("/not-found");
      }
    };

    fetchVestits();
  }, [userId, imageId, navigate]);

  const handleSectionClick = (data: PopupData) => {
    setIsClosing(false);
    setPopupData(data);
    const url = data.image ? `?id=${userId}&rid=${data.id}` : `?id=${userId}`;
    navigate(url);
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setPopupData(null);
      navigate(`?id=${userId}`);
    }, 300);
  };

  const renderSections = () => {
    if (imgData.length > 0) {
      return imgData.map((item) => (
        <Section
          key={item.id}
          onClick={() => handleSectionClick(item)}
          name={item.name}
          locked={!item.validated}
          imageName={item.image}
        />
      ));
    } else {
      navigate("/not-found");
      return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 bg-black image-background -z-10" />
      <Header />
      {!imagesLoaded ? (
        <div className="flex justify-center items-center h-full">
          <PulseLoader color="#ffffff" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-6 sm:grid-cols-4 grid-cols-3 md:grid-cols-5">
          {renderSections()}
        </div>
      )}
      {popupData && (
        <Popup data={popupData} onClose={closePopup} isClosing={isClosing} />
      )}
      <Footer />
      <Routes>
        <Route path="/:id" element={<Error404 />} />
        <Route path="/not-found" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/not-found" element={<Error404 />} />
      </Routes>
    </Router>
  );
}
