import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import instance from "../../api/axios";
import { HiBookOpen, HiCurrencyDollar, HiUsers, HiPhotograph, HiPencilAlt, HiUser, HiMail } from "react-icons/hi";

const AddClass = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const { user } = useContext(AuthContex);
  const [charCount, setCharCount] = useState(0);

  const detailsValue = watch("details", "");

  // Update character count
  useState(() => {
    setCharCount(detailsValue.length);
  }, [detailsValue]);

  const onSubmit = async (data) => {
    const {
      name,
      price,
      image,
      availableSeats,
      details,
      instructorName,
      instructorEmail,
    } = data;

    const item = {
      name,
      price: parseFloat(price),
      image,
      availableSeats: parseInt(availableSeats),
      details,
      instructorEmail,
      instructorImage: user?.photoURL || "",
      instructorName,
      status: "pending",
      enrolled: 0,
    };

    try {
      const res = await instance.post("/coures/addNewCoures", item);
      if (res.data?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Awesome! 🎉",
          text: "Your class has been submitted for admin review.",
          timer: 3000,
          showConfirmButton: false,
        });
        reset();
        setCharCount(0);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-teal-50 to-purple-50 py-12 px-4">
      <Helmet>
        <title>Add New Coures | Coures Hub</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        {/* Header with Instructor Info */}
        <div className="card bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-2xl mb-8">
          <div className="card-body text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-white ring-offset-base-100 ring-offset-4">
                  <img src={user?.photoURL || "/default-avatar.png"} alt="Instructor" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold">Create a New Coures</h2>
                <p className="opacity-90">Share your knowledge with the world!</p>
              </div>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <HiUser className="text-xl" /> {user?.displayName}
              </div>
              <div className="flex items-center gap-2">
                <HiMail className="text-xl" /> {user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              {/* Class Basics */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-3 text-indigo-700">
                  <HiBookOpen className="text-3xl" /> Coures Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Coures Title *</span>
                    </label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="e.g., Master React in 30 Days"
                      className="input input-bordered input-primary w-full focus:ring-4 focus:ring-indigo-300 transition"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <HiPhotograph /> Cover Image URL *
                      </span>
                    </label>
                    <input
                      {...register("image", { required: true })}
                      type="url"
                      placeholder="https://example.com/course-cover.jpg"
                      className="input input-bordered input-primary w-full focus:ring-4 focus:ring-indigo-300 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Pricing & Seats */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-3 text-teal-700">
                  <HiCurrencyDollar className="text-3xl" /> Pricing & Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Price (USD) *</span>
                    </label>
                    <input
                      {...register("price", { required: true })}
                      type="number"
                      step="0.01"
                      placeholder="49.99"
                      className="input input-bordered input-success w-full focus:ring-4 focus:ring-teal-300 transition"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <HiUsers /> Available Seats *
                      </span>
                    </label>
                    <input
                      {...register("availableSeats", { required: true })}
                      type="number"
                      placeholder="Unlimited? Enter a large number like 999"
                      className="input input-bordered input-success w-full focus:ring-4 focus:ring-teal-300 transition"
                    />
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Description */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold flex items-center gap-3 text-purple-700">
                  <HiPencilAlt className="text-3xl" /> Description
                </h3>
                <div className="form-control">
                  <textarea
                    {...register("details", { required: true, maxLength: 500 })}
                    className="textarea textarea-bordered textarea-primary h-40 focus:ring-4 focus:ring-indigo-300 transition"
                    placeholder="Describe what students will learn, prerequisites, and why they should enroll..."
                  ></textarea>
                  <label className="label justify-end">
                    <span className={`label-text-alt ${charCount > 450 ? 'text-error' : 'text-base-content/60'}`}>
                      {charCount}/500 characters
                    </span>
                  </label>
                </div>
              </div>

              {/* Hidden/Auto-filled Fields */}
              <input {...register("instructorName", { required: true })} type="hidden" defaultValue={user?.displayName} />
              <input {...register("instructorEmail", { required: true })} type="hidden" defaultValue={user?.email} />

              {/* Submit */}
              <div className="card-actions justify-center pt-6">
                <button
                  type="submit"
                  className="btn btn-wide btn-lg bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-bold text-xl shadow-lg transform hover:scale-105 transition"
                >
                  Submit Coures for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;