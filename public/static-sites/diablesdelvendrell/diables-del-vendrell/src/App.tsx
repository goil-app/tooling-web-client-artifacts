import { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  const fetchVestits = async (userId: string) => {
    try {
      const response = await axios.get(
        `https://europe-west1-goil-community.cloudfunctions.net/diablesDelVendrellGetVestits?id=${userId}&rid=XXXX`
      );

      console.log("Respuesta de Axios:", response.data);

      if (response.data.data.length === 0) {
        navigate("*");
      } else {
        setImgData(response.data.data);
        setImagesLoaded(true);
      }
    } catch (error) {
      console.error("Error de Axios:", error);
      navigate("*");
    }
  };

  useEffect(() => {
    const userId = "123";
    if (!userId) {
      navigate("*");
      return;
    }
    fetchVestits(userId);
  }, [navigate]);

  const handleSectionClick = (data: PopupData) => {
    if (data.id) {
      setPopupData(data);
      setIsClosing(false);
      console.log(data);
      const url = data.image
        ? `?user_id=${data.id}&image_id=${data.image}`
        : `?user_id=${data.id}`;
      navigate(url);
    } else {
      console.error("User ID no existe");
      console.log(data);
      navigate("*");
    }
  };

  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setPopupData(null);
      navigate("/");
    }, 300);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = queryParams.get("user_id");
    const vestitId = queryParams.get("image_id");

    if (userId && vestitId) {
      const fetchVestitById = async () => {
        try {
          const response = await axios.get(
            `https://europe-west1-goil-community.cloudfunctions.net/diablesDelVendrellGetVestitById?vestitId=${vestitId}`
          );
          if (response.data) {
            setPopupData(response.data);
          } else {
            navigate("*");
          }
        } catch (error) {
          console.error("Error fetching vestit by id", error);
          navigate("*");
        }
      };

      fetchVestitById();
    }
  }, [navigate]);

  const renderSections = () => {
    if (Array.isArray(imgData) && imgData.length > 0) {
      return imgData.map((item, index) => (
        <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
          <Section
            onClick={() =>
              handleSectionClick({
                id: item.id,
                image: item.image,
                name: item.name,
                validated: item.validated,
              })
            }
            name={item.name}
            locked={!item.validated}
            imageName={item.image}
          />
        </div>
      ));
    } else {
      navigate("*");
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
        <Route path="/404" element={<Error404 />} />
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
      </Routes>
    </Router>
  );
}
