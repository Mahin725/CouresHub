import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Raihan Sharif",
    role: "Frontend Developer",
    course: "React & Modern Frontend",
    quote:
      "This course clarified component architecture, hooks, and state management in a way YouTube never did. Very practical.",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Kamrul Hasan",
    role: "Backend Engineer",
    course: "Node.js & REST API",
    quote:
      "API design, authentication flow, and real-world error handling were explained clearly. Helped me in my job.",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Kafia Sultana",
    role: "CS Student",
    course: "Data Structures & Algorithms",
    quote:
      "Finally understood time complexity and problem-solving patterns. This course saved my semester.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Arif Mahmud",
    role: "Junior Software Engineer",
    course: "MERN Stack",
    quote:
      "End-to-end project building taught me how frontend and backend actually connect in production.",
    avatar: "https://i.pravatar.cc/150?img=56",
  },
  {
    name: "Nusrat Jahan",
    role: "QA → Developer Transition",
    course: "JavaScript Deep Dive",
    quote:
      "Scope, closures, async behavior — everything finally made sense. This boosted my confidence.",
    avatar: "https://i.pravatar.cc/150?img=22",
  },
  {
    name: "Tanvir Ahmed",
    role: "Intern Developer",
    course: "Git, GitHub & Team Workflow",
    quote:
      "Learned real team workflows like PR reviews, rebasing, and conflict resolution.",
    avatar: "https://i.pravatar.cc/150?img=61",
  },
];

const Testimonial = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">
            What Tech Learners Say
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Honest feedback from developers who learned practical skills and
            applied them in real projects.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              {/* FIXED HEIGHT CARD */}
              <div className="h-[340px] bg-base-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
                
                {/* Review */}
                <p className="text-base-content/80 leading-relaxed mb-6 line-clamp-4">
                  “{item.quote}”
                </p>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-base-300">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold leading-tight">
                      {item.name}
                    </p>
                    <p className="text-sm text-base-content/60">
                      {item.role}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {item.course}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
