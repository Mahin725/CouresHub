import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Info = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-20 bg-base-200" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 25, label: "Expert Mentors", suffix: "+" },
            { end: 120, label: "Language Courses", suffix: "+" },
            { end: 6800, label: "Happy Students", suffix: "+" },
            { end: 12, label: "Years of Excellence", suffix: "+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-base-100 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all"
              data-aos="zoom-in"
              data-aos-delay={i * 50}
            >
              <h3 className="text-5xl font-bold text-primary">
                {inView && <CountUp end={stat.end} duration={4} suffix={stat.suffix} />}
              </h3>
              <p className="text-xl font-semibold mt-4">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Info;