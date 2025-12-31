const Mission = () => {
  return (
    <section className="py-24 bg-base-200 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-extrabold mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Building industry-ready developers through practical learning,
            real projects, and strong engineering fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* LEFT: Tech Image */}
          <div data-aos="fade-right" className="relative">
            <img
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051"
              alt="Tech learning"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-lg font-bold">Real-World Skills</p>
              <p className="text-sm opacity-90">Not just theory</p>
            </div>
          </div>

          {/* RIGHT: Mission Cards */}
          <div className="space-y-6" data-aos="fade-left">
            
            <div className="bg-base-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-base-300">
              <h3 className="text-2xl font-bold text-primary mb-3">
                🚀 Why We Exist
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                Too many learners know syntax but fail in real jobs.
                We exist to close the gap between tutorials and
                production-level software engineering.
              </p>
            </div>

            <div className="bg-base-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-base-300">
              <h3 className="text-2xl font-bold text-primary mb-3">
                🛠 What We Teach
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                Practical courses on Frontend, Backend, Databases,
                System Design, Git workflows, and real team practices —
                exactly what tech companies expect.
              </p>
            </div>

            <div className="bg-base-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-base-300">
              <h3 className="text-2xl font-bold text-primary mb-3">
                🎯 How We Measure Success
              </h3>
              <p className="text-base-content/80 leading-relaxed">
                Success means shipping real projects, understanding
                engineering trade-offs, and confidently facing
                technical interviews — not just completing videos.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
