import { Helmet } from "react-helmet-async";
// import Banner from "../Banner/Banner";
import Coures from "../Coures/Coures";
import Instructors from "../Instructors/Instructors";
import Testimonial from "../Testimonial/Testimonial.jsx";
import Hero from "../Hero/Hero";
import Mission from "../Mission/Mission.jsx";
import Footer from "../../../Components/Footer/Footer.jsx";
import Info from "../info/Info.jsx";

const Home = () => {
  return (
    <div>
      <div>
        <Helmet>
          <title>Home || BSPI-PC</title>
        </Helmet>
      </div>
      <Hero />
      {/* <Banner></Banner> */}
      <div className="mx-20">
        <Coures />
        <Instructors />
        <Info/>
        <Testimonial />
        <Mission />
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
