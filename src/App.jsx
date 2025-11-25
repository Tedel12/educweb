import AppRoutes from "./routes/AppRoutes";
import 'aos/dist/aos.css';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Toaster } from "react-hot-toast";




AOS.init({
  duration: 1000,
  once: true,
});


function App() {
  return (
    <>
     <AppRoutes />;
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App;
