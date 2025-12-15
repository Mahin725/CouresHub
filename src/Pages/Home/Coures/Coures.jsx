import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CourseCard from "../../../Components/UpdatedCouresCart/UpdatedCouresCart";
import api from "../../../api/axios";


const Coures = () => {
  const [coures, setCoures] = useState([]);
  console.log("Coures", coures);
  useEffect(() => {
    api.get("/coures/allCoures")
      .then(res => setCoures(res.data.data));
  }, []);

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Industry-Focused Tech Courses
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Learn practical skills in frontend, backend, databases, and system design
            through real projects and production-ready workflows.
          </p>
        </div>


        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {coures.map((c, i) => (
            <SwiperSlide key={c._id}>
              <div data-aos="flip-left" data-aos-delay={i * 100}>
                <CourseCard course={c} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Coures;
