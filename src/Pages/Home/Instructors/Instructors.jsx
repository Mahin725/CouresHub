const instructors = [
  {
    id: 1,
    name: "Raihanul Islam",
    role: "Senior Full Stack Engineer",
    expertise: "React, Node.js, MongoDB",
    experience: "7+ Years Experience",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Frontend Specialist",
    expertise: "React, Next.js, Tailwind CSS",
    experience: "5+ Years Experience",
    image: "https://i.pravatar.cc/300?img=32",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Backend & Cloud Engineer",
    expertise: "Node.js, AWS, Docker",
    experience: "6+ Years Experience",
    image: "https://i.pravatar.cc/300?img=45",
  },
];

const Instructors = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6">
        <h2
          className="text-4xl font-bold text-center mb-12"
          data-aos="fade-up"
        >
          Meet Our Tech Mentors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {instructors.map((instructor, i) => (
            <div
              key={instructor.id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-base-100 rounded-2xl shadow-xl p-6 text-center hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-28 h-28 rounded-full ring ring-primary ring-offset-4 overflow-hidden">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-semibold">
                {instructor.name}
              </h3>

              <p className="text-primary font-medium mt-1">
                {instructor.role}
              </p>

              <p className="text-sm text-base-content/70 mt-3">
                {instructor.expertise}
              </p>

              <p className="text-sm font-medium mt-4">
                {instructor.experience}
              </p>

              {/* Actions */}
              <div className="mt-6">
                <button className="btn btn-outline btn-primary btn-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
