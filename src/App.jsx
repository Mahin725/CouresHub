import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const popularCourses = [
    {
      title: "Full Stack Web Development",
      instructor: "John Doe",
      price: "৳8,999",
      rating: 4.8,
      students: "2.3k",
      img: "https://img-c.udemycdn.com/course/750x422/140238_dd80_2.jpg",
    },
    {
      title: "Data Science & Machine Learning",
      instructor: "Sarah Lee",
      price: "৳12,999",
      rating: 4.9,
      students: "1.8k",
      img: "https://media.geeksforgeeks.org/wp-content/uploads/20251115164301521507/jku1.webp",
    },
    {
      title: "UI/UX Design Mastery",
      instructor: "Mike Chen",
      price: "৳7,999",
      rating: 4.7,
      students: "3.1k",
      img: "https://cdn.dribbble.com/userupload/17334760/file/original-9b463b4e945a12d37dd73d7120c3e31c.png?resize=1200x900",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100" data-theme="coursehub">
      {/* Navbar */}
      <div className="navbar bg-base-200 shadow-lg fixed top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Home</a></li>
              <li><a>Courses</a></li>
              <li><a>About</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-2xl font-bold text-primary">Course Hub</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li><a className="hover:text-accent">Home</a></li>
            <li><a className="hover:text-accent">Courses</a></li>
            <li><a className="hover:text-accent">About</a></li>
            <li><a className="hover:text-accent">Contact</a></li>
          </ul>
        </div>
        <div className="navbar-end gap-3">
          <a className="btn btn-ghost">Login</a>
          <a className="btn btn-primary">Sign Up Free</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-secondary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
              <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
                Learn Without Limits.<br />
                <span className="text-primary">Grow Without Boundaries.</span>
              </h1>
              <p className="text-xl text-base-content/70 mt-6">
                Join thousands of students mastering new skills with expert-led courses, community support, and flexible learning.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#" className="btn btn-primary btn-lg">Browse Courses</a>
                <a href="#" className="btn btn-outline btn-secondary btn-lg">Watch Demo</a>
              </div>
            </div>
            <div className="lg:w-1/2" data-aos="fade-left">
              <img
                src="https://elements-resized.envatousercontent.com/elements-cover-images/8c2956d0-6245-4da6-b204-7407dc800278?w=800&cf_fit=scale-down&q=85&format=auto&s=7dd2830992524af49bb933625e9c370b07321c61a49813ac1049d8dee59fb68c"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, i) => (
              <div key={i} className="card bg-base-200 shadow-xl hover:shadow-2xl" data-aos="fade-up" data-aos-delay={i * 100}>
                <figure>
                  <img src={course.img} alt={course.title} className="h-48 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title">{course.title}</h3>
                  <p className="text-sm text-base-content/70">by {course.instructor}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <div className="text-2xl font-bold text-primary">{course.price}</div>
                      <div className="text-sm">{course.students} students</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="card-actions mt-6">
                    <button className="btn btn-primary w-full">Enroll Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">Why Choose Course Hub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Expert Instructors", "Lifetime Access", "Secure Payment", "Active Community"].map((feature, i) => (
              <div key={i} className="bg-base-100 p-8 rounded-2xl" data-aos="zoom-in" data-aos-delay={i * 100}>
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-xl font-bold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-aos="fade-up">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Get unlimited access to all courses. No commitments, cancel anytime.
          </p>
          <a href="#" className="btn btn-secondary btn-lg" data-aos="fade-up" data-aos-delay="400">
            Get Started — It's Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 py-10 text-center">
        <p>&copy; 2025 Course Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;