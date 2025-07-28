import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddModule = () => {
    const { register, handleSubmit, reset } = useForm();
    const [courses, setCourses] = useState([]);
    console.log(courses);
    useEffect(() => {
        fetch("https://speakup-ivory.vercel.app/allclasses")
            .then((res) => res.json())
            .then((data) => setCourses(data));
    }, []);


    const onSubmit = async (data) => {
        const moduleData = {
            moduleName: data.moduleName,
            videoUrl: data.videoUrl,
        };

        const response = await fetch(`https://speakup-ivory.vercel.app/content-collections/${data.courseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(moduleData),
        });

        const result = await response.json();
        if (result.success) {
            Swal.fire({
                icon: "success",
                title: "Module Added",
                text: "New module has been added to the course.",
                timer: 2000,
                showConfirmButton: false,
            });
            reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message || "Failed to add module.",
            });
        }
    };

    return (
        <div className="mx-10 my-6">
            <h2 className="text-3xl font-semibold text-center mb-4">
                Add Module to Course
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Select Course*</span>
                    </label>
                    <select
                        {...register("courseId", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Module Name*</span>
                    </label>
                    <input
                        {...register("moduleName", { required: true })}
                        type="text"
                        placeholder="Module Title"
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text">Video URL*</span>
                    </label>
                    <input
                        {...register("videoUrl", { required: true })}
                        type="url"
                        placeholder="https://..."
                        className="input input-bordered w-full"
                    />
                </div>
                <input className="btn btn-outline btn-md" type="submit" value="Add Module" />
            </form>
        </div>
    );
};

export default AddModule;
