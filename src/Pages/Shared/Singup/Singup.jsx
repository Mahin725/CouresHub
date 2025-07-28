import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Social from "../../../Components/SocialIcon/Social";
import { useContext, useState } from "react";
import { AuthContex } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Singup = () => {
  const [erros, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, userProfileUpdate } = useContext(AuthContex);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        userProfileUpdate(data.name, data.photo).then(() => {
          const user = { name: data.name, email: data.email, role: "student" };
          console.log(user);
          fetch("https://speakup-ivory.vercel.app/users", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "SingUp Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <Helmet>
        <title>SINGUP || SPEAKUP</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
          <p className="text-3xl text-center font-serif pt-4">Join With Us</p>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                {...register("photo", { required: true })}
                type="text"
                placeholder="Paste URL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
                    message:
                      "Password must contain at least one capital letter and one special character",
                  },
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && <span>{errors.password.message}</span>}
              {errors.password?.type === "minLength" && (
                <span>Password must be at least 6 characters long</span>
              )}

              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm password"
                className="input input-bordered"
              />
              {errors.confirmPassword && (
                <span>{errors.confirmPassword.message}</span>
              )}
              {errors.required && <span>Confirm Password Required</span>}

              <div className="flex justify-between">
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Terms & Condition
                  </a>
                </label>
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Alredy An Account?
                  </Link>
                </label>
              </div>
            </div>
            <input className="btn btn-outline" type="submit" value="SIngUp" />
          </form>
          <Social></Social>
          {erros && <p className="text-red-600">{erros}</p>}
        </div>
      </div>
    </div>
  );
};

export default Singup;
