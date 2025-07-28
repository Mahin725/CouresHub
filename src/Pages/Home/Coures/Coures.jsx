import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/core";
import CourseCard from "../../../Components/UpdatedCouresCart/UpdatedCouresCart";

SwiperCore.use([Navigation, Pagination]);

const breakpoints = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
};

const Coures = () => {
  const [coures, setCoures] = useState([]);

  useEffect(() => {
    fetch("https://speakup-ivory.vercel.app/coures")
      .then((res) => res.json())
      .then((data) => setCoures(data));
  }, []);
  return (
    <div>
      <h2 className="text-center text-3xl font-bold my-3">Coures_</h2>

      {/* COURSES SECTION */}
      <div className="">
        <Swiper
          loop={true}
          slidesPerView={3}
          autoplay={true}
          modules={[Pagination, Autoplay]}
          breakpoints={breakpoints}
          className="flex flex-row mt-10 md:pt-5"
        >
          {coures?.map((course, index) => (
            <SwiperSlide key={index} className="md:p-5">
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <div className="grid md:grid-cols-3 space-y-7">
        {coures.map((object) => (
          <CouresCart object={object} key={object._id}></CouresCart>
        ))}
      </div> */}
    </div>
  );
};

export default Coures;
