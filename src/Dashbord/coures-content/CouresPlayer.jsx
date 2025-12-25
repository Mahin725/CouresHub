import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../api/axios";
import { Helmet } from "react-helmet-async";
import { HiArrowLeft } from "react-icons/hi";

const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [content, setContent] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/coures/${id}`).then((res) => {
      setCourse(res.data.data);
    });

    instance
      .get(`coures/content-collections/${id}`)
      .then((res) => {
        const data = res.data;
        console.log(res.data.data);
        setContent(data.data?.content || []);
        if (data?.content?.length > 0) {
          setSelectedVideo(data.content[0].videoUrl);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Helmet>
        <title>CouresHub Player</title>
      </Helmet>

      {/* Header */}
      <div className="bg-base-100 shadow-md">
        <div className="max-w-7xl mx-auto p-6 flex items-center gap-4">
          <Link to="/dashbord/myclasses" className="btn btn-ghost btn-circle">
            <HiArrowLeft className="text-2xl" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{course?.name}</h1>
            <p className="text-base-content/70">
              {content.length} {content.length === 1 ? "Module" : "Modules"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player - Large */}
          <div className="lg:col-span-3">
            {selectedVideo ? (
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  src={selectedVideo}
                  title="Course Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video bg-base-300 rounded-xl flex items-center justify-center">
                <p className="text-2xl text-base-content/50">
                  No modules added yet. Add your first module!
                </p>
              </div>
            )}
          </div>

          {/* Modules Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Course Modules</h2>
              {content.length === 0 ? (
                <p className="text-center text-base-content/60 py-8">
                  No content yet
                </p>
              ) : (
                <div className="space-y-3">
                  {content.map((module, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVideo(module.videoUrl)}
                      className={`w-full text-left p-4 rounded-lg transition-all ${
                        selectedVideo === module.videoUrl
                          ? "bg-primary text-white shadow-md"
                          : "bg-base-200 hover:bg-base-300"
                      }`}
                    >
                      <div className="font-medium">{module.moduleName}</div>
                      <div className="text-sm opacity-80">Lesson {index + 1}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;