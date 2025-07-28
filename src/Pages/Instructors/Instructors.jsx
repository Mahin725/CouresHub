import { useEffect, useState } from "react";
import RowIns from "./RowIns";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Mentor from "../../Components/mentor/Mentor";

const Instructors = () => {
  const { data: instructor = [] } = useQuery({
    queryKey: "instructor",
    queryFn: async () => {
      const res = await fetch("https://speakup-ivory.vercel.app/instructors");
      return res.json();
    },
  });
  return (
    <div className="mt-[6rem]">
      <div>
        <Helmet>
          <title>Mentors || SpeakUp</title>
        </Helmet>
      </div>
      <div>
        <h1 className="text-3xl text-center font-semibold">Mentors Team </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 mx-20 p-2 ">
          {instructor.map((mentor) => (
            <Mentor mentor={mentor} key={mentor._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
