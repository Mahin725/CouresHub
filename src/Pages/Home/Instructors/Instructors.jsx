import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Instructor from "./Instructor";

const Instructors = () => {
  // const [Instructors,setInstructor] = useState([])

  const { data: instructors = [] } = useQuery({
    queryKey: "instructors",
    queryFn: async () => {
      const res = await fetch("https://speakup-ivory.vercel.app/topinstructor");
      return res.json();
    },
  });
  // console.log(instructors);

  return (
    <div>
      <h2 className="text-center text-3xl my-3 font-bold">Mentors Panel_</h2>
      <div className="grid md:grid-cols-3 space-y-7">
        {instructors.map((instructor) => (
          <Instructor key={instructor._id} instructor={instructor}></Instructor>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
