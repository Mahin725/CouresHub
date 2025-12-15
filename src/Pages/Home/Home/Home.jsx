import { Helmet } from "react-helmet-async";
import Hero from "../Hero/Hero";
import Coures from "../Coures/Coures";
import Instructors from "../Instructors/Instructors";
import Info from "../info/Info";
import Testimonial from "../Testimonial/Testimonial";
import Mission from "../Mission/Mission";
import Footer from "../../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="pt-20 bg-base-100 min-h-screen"> {/* Offset for fixed navbar */}
      <Helmet>
        <title>Home | Coures Hub</title>
      </Helmet>

      <Hero />

      <Info />

      <Coures />

      <Instructors />

      <Testimonial />

      <Mission />
      <Footer />
    </div>
  );
};

export default Home;