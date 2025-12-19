import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Mentor from "../../Components/mentor/Mentor";
import mentors from "../../data/mentors";

const Instructors = () => {
  const { data: instructor = mentors } = useQuery({
    queryKey: ["instructor"],
    queryFn: async () => {
      const res = await fetch("/instructor/instructors");
      return res.json();
    },
  });

  return (
    <div className="mt-[6rem] px-6">
      <Helmet>
        <title>Mentors || SpeakUp</title>
      </Helmet>

      <h1 className="text-3xl text-center font-semibold mb-8">
        Our Mentors
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructor.map((mentor) => (
          <Mentor mentor={mentor} key={mentor._id} />
        ))}
      </div>
    </div>
  );
};

export default Instructors;
