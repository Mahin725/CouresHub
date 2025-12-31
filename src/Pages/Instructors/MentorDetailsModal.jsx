const MentorDetailsModal = ({ mentor, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-xl w-[90%] md:w-[500px] p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-xl"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center">
                    <img
                        src={mentor?.instructorImage}
                        className="w-28 h-28 rounded-full mb-4"
                    />

                    <h2 className="text-2xl font-semibold">
                        {mentor?.instructorName}
                    </h2>
                    <p className="text-gray-500">{mentor?.role}</p>

                    <div className="flex gap-6 mt-4">
                        <div className="text-center">
                            <p className="text-xl font-bold">
                                {mentor?.totalClasses}
                            </p>
                            <p className="text-sm text-gray-400">Classes</p>
                        </div>

                        <div className="text-center">
                            <p className="text-xl font-bold">
                                {mentor?.totalStudents}
                            </p>
                            <p className="text-sm text-gray-400">Students</p>
                        </div>
                    </div>

                    <p className="text-sm text-center mt-4 text-gray-600">
                        {mentor?.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                        {mentor?.expertise?.map((skill, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorDetailsModal;
