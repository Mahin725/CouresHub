import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContex } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Social = () => {
  const [erros, setError] = useState("");
  const { googleSign } = useContext(AuthContex);
  const navigate = useNavigate();

  // googleSign
  const handleGoogle = () => {
    googleSign()
      .then((data) => {
        console.log(data.user);
        setError("");
        const loggedUser = data.user;
        const user = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          role: "student",
        };
        fetch("https://speakup-ivory.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully SingIn WIth Google",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div>
      <div className="text-center my-2">
        <button
          onClick={handleGoogle}
          className="btn btn-outline btn-circle text-2xl"
        >
          <FaGoogle></FaGoogle>
        </button>
      </div>
      {erros && <p className="text-red-600">{erros}</p>}
    </div>
  );
};

export default Social;
