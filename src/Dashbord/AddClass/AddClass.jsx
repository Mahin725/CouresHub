import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContex);
  console.log(user);
  const onSubmit = (data) => {
    const {
      name,
      price,
      image,
      availableSeats,
      details,
      instructorName,
      instructorEmail,
    } = data;
    // console.log(name,price,image,availableSeats);
    const item = {
      name: name,
      price: price,
      image: image,
      availableSeats: parseInt(availableSeats),
      details: details,
      instructorEmail: instructorEmail,
      instructorImage: user?.photoURL,
      instructorName: instructorName,
      status: "pending",
      enrolled: parseInt(0),
    };
    console.log(item);
    fetch("http://localhost:5000/newclass", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Your Class Will Reviewed",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
  };
  return (
    <div className="mx-10">
      <Helmet>
        <title>ADD A CLASS || SpeakUp</title>
      </Helmet>
      <h2 className="text-center text-3xl font-semibold my-4">
        Add A New Class
      </h2>

      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Class name*</span>
          </label>
          <input
            {...register("name", { required: true, maxLength: 120 })}
            type="text"
            placeholder="Type Name here"
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Class Image*</span>
          </label>
          <input
            {...register("image", { required: true })}
            type="text"
            placeholder="Image Photo Link"
            className="input input-bordered w-full "
          />
        </div>
        <div className="flex space-x-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Instructor Name*</span>
            </label>
            <input
              {...register("instructorName", {
                required: true,
                maxLength: 120,
              })}
              type="text"
              defaultValue={user?.displayName}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Instructor EMail*</span>
            </label>
            <input
              {...register("instructorEmail", {
                required: true,
                maxLength: 120,
              })}
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
        </div>
        {/* <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">Instructor Image*</span>
                    </label>
                    <input {...register("instructorImage", { required: true, maxLength: 120 })} type="text" placeholder="Image Photo Link" className="input input-bordered w-full " />
                </div> */}
        <div className="flex space-x-5">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <input
              {...register("price", { required: true, maxLength: 120 })}
              type="number"
              placeholder="Class Price"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Available Seats*</span>
            </label>
            <input
              {...register("availableSeats", {
                required: true,
                maxLength: 120,
              })}
              type="number"
              placeholder="Available Seats"
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Details*</span>
          </label>
          <textarea
            {...register("details", { required: true, maxLength: 500 })}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </div>
        <input
          className="btn btn-outline btn-md mt-4"
          type="submit"
          value="Add Class"
        />
      </form>
    </div>
  );
};

export default AddClass;
