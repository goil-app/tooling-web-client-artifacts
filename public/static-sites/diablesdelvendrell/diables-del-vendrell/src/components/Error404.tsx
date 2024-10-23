import Footer from "./Footer";
import Header from "./Header";

const Error404 = () => {
  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 bg-black image-background -z-10" />
      <Header />
      <div className="text-center flex flex-col gap-4 mx-5">
        <p className="text-2xl text-white">
          Els Diables del Vendrell ara tenen la seva pròpia app!
        </p>
        <p className="text-white text-sm flex gap-1 items-center justify-center">
          Codi de l'app:{" "}
          <span className="w-7 h-7 border-2 font-bold border-gray-300 rounded flex items-center justify-center">
            0
          </span>
          <span className="w-7 h-7 border-2 font-bold border-gray-300 rounded flex items-center justify-center">
            1
          </span>
          <span className="w-7 h-7 border-2 font-bold border-gray-300 rounded flex items-center justify-center">
            9
          </span>
          <span className="w-7 h-7 border-2 font-bold border-gray-300 rounded flex items-center justify-center">
            7
          </span>
          <span className="w-7 h-7 border-2 font-bold border-gray-300 rounded flex items-center justify-center">
            9
          </span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Error404;
