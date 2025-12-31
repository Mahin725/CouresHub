

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-primary mb-3">
                            CourseHub
                        </h3>
                        <p className="text-sm opacity-70 leading-relaxed">
                            Industry-focused tech courses designed to help you build
                            real-world skills and become job-ready.
                        </p>
                    </div>

                    {/* Courses */}
                    <div>
                        <h4 className="font-semibold mb-4">Courses</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li>Frontend Development</li>
                            <li>Backend Development</li>
                            <li>Full Stack Engineering</li>
                            <li>Database & API Design</li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li>Learning Roadmaps</li>
                            <li>Projects</li>
                            <li>Mentorship</li>
                            <li>Interview Prep</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li>Email: support@coursehub.dev</li>
                            <li>LinkedIn</li>
                            <li>GitHub</li>
                            <li>Discord Community</li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-base-content/10 mt-12 pt-6 text-center text-sm opacity-60">
                    © {new Date().getFullYear()} CourseHub. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
