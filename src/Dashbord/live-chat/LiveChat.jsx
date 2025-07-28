import React, { useContext, useState } from "react";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
const LiveChat = () => {
  // received user from AuthContex
  const { user } = useContext(AuthContex);
  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const userQuery = () => {
    // i comment out Full Code For Key Issues
    fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error sending query:", error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "OpenAi Key Is Expire.",
      footer: "<p>This issue from Developer Site. Please contact with me </p>",
    });

    // userQuery(); //function for send data
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-row items-center justify-between pe-2 bg-zinc-900 py-4 rounded-sm">
        <p className="text-sm text-white md:text-white font-semibold border-l-4 border-primary ml-2 inline-block px-2 md:px-5">
          Live Chat With Ai Assistant
        </p>
      </div>
      {/* main section */}
      <section>
        <h1 className="text-center text-2xl my-3 font-bold">
          Hey {user.displayName || "User"}, How can I help you?
        </h1>
        <div className="border p-5 border-primary-focus m-5 mt-3 h-80">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum
            perferendis eveniet recusandae.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <input
            className="border p-5 border-primary mx-5 mt-[40px] w-[70%]"
            type="text"
            placeholder="Drop Your Query"
            value={query}
            onChange={handleQueryChange}
          />
          <button type="submit" className="btn btn-primary justify-end">
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

export default LiveChat;
