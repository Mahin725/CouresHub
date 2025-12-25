import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Social from "../../../Components/SocialIcon/Social";
import { useContext, useState } from "react";
import { AuthContex } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Singup = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { createUser, userProfileUpdate } = useContext(AuthContex);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const nextStep = async () => {
    let fields = [];
    if (step === 1) fields = ["name"];
    if (step === 2) fields = ["photo"];

    const valid = await trigger(fields);
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data) => {
    // Final validation for step 3
    const step3Valid = await trigger(["email", "password", "confirmPassword"]);
    if (!step3Valid) return;

    try {
      // Create user in Firebase
      await createUser(data.email, data.password);

      // Update profile
      await userProfileUpdate(data.name, data.photo || "");
      const userInfo = {
        name: data.name,
        email: data.email,
        role: "student",
        photo: data.photo || "",
      };

      const res = await fetch("https://course-hub-server-su6k.onrender.com/v1/user/postuser", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const result = await res.json();
      console.log("result before condsition: ",result);
      if (result.data?.insertedId) {
        console.log("result in condition",result.data?.insertedId);
        Swal.fire({
          icon: "success",
          title: "Welcome to CouresHub!",
          text: "Account created successfully 🎉",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#e0e7ff",
          color: "#4f46e5",
        });

        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Signup error:", error);

      let errorMsg = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMsg = "alredy use in email";
      } else if (error.code === "auth/weak-password") {
        errorMsg = "Password is too weak. Use at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Invalid email address.";
      }

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: errorMsg,
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
      navigate("/")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-4 py-8">
      <Helmet>
        <title>Signup | CouresHub</title>
      </Helmet>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Progress */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition ${step >= i
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
                } ${i !== 3 ? "mr-4" : ""}`}
            >
              {i}
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Join CouresHub
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Step {step} of 3
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <p className="text-center text-gray-600 mb-4">Sign up quickly with</p>
                <Social />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
                {errors.name && <p className="text-xs text-red-600 mt-2">{errors.name.message}</p>}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL (Optional)
              </label>
              <input
                {...register("photo")}
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-3">
                Use a direct image link (imgur, GitHub, etc.)
              </p>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
                {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "At least 6 characters" },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[@#$%^&+=!])/,
                        message: "Must have 1 uppercase & 1 special char",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-600 mt-2">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm password",
                      validate: (val) => val === watch("password") || "Passwords do not match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-600 mt-2">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium shadow-md"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 font-bold shadow-lg"
              >
                Create Account
              </button>
            )}
          </div>
        </form>
      </div>

      {/* <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style> */}
    </div>
  );
};

export default Singup;