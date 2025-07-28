import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Nabvar from "../Components/Nabvar/Nabvar";
import CouresNotAccess from "../Components/Error/CouresNotAccess";
import { AuthContex } from "../Providers/AuthProvider";
import { useContext } from "react";

const CouresPlayerLayout = () => {
  const { user } = useContext(AuthContex);
  const location = useLocation();
  const couresInfo = location.state;
  const [couresContent, setCouresContent] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // ———— Security check state ————
  const [isClubMember, setIsClubMember] = useState(null);
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;

    fetch(`https://speakup-ivory.vercel.app/is-club-member?email=${encodeURIComponent(userEmail)}`)
      .then((res) => res.json())
      .then((data) => setIsClubMember(data.isMember))
      .catch(() => setIsClubMember(false));
  }, [userEmail]);

  useEffect(() => {
    if (!couresInfo?._id) return;
    if (isClubMember === false) return; // Access denied, skip fetching content

    fetch(`https://speakup-ivory.vercel.app/content-collections/${couresInfo._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.content) && data.content.length > 0) {
          const normalized = data.content.map((item, index) => ({
            id: index.toString(),
            title: item.moduleName || `Video ${index + 1}`,
            description: "",
            videoUrl: item.videoUrl,
          }));
          setCouresContent({ ...data, content: normalized });
          setSelectedVideo(normalized[0]);
        }
      })
      .catch((err) => {
        console.error("Error fetching course content:", err);
      });
  }, [couresInfo, isClubMember]);

  if (!couresInfo) return <CouresNotAccess />;
  if (isClubMember === null) return <div className="text-center mt-20">Checking Access...</div>;
  if (isClubMember === false) return <CouresNotAccess />;

  if (!couresContent || !selectedVideo) return <div className="text-center mt-20">Loading...</div>;

  return (
    <>
      <Nabvar />
      <div className="mt-20 flex flex-col md:flex-row h-[calc(100vh-60px)]">
        {/* Left: Video Player */}
        <div className="flex-1 p-4 bg-gray-100">
          <h2 className="text-lg font-semibold mb-2">{selectedVideo.title}</h2>
          <div className="aspect-video rounded overflow-hidden mb-4">
            <iframe
              src={selectedVideo.videoUrl}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          {selectedVideo.description && (
            <p className="text-gray-700">{selectedVideo.description}</p>
          )}
        </div>

        {/* Right: Video List */}
        <div className="w-full md:w-1/3 p-4 border-t md:border-t-0 md:border-l border-gray-200 bg-white">
          <h3 className="text-lg font-bold mb-4">Course Videos</h3>
          <ul className="space-y-3">
            {couresContent.content.map((video) => (
              <li key={video.id}>
                <button
                  onClick={() => setSelectedVideo(video)}
                  className={`w-full text-left p-3 border rounded font-semibold transition ${
                    selectedVideo.id === video.id
                      ? "bg-indigo-100 border-indigo-300"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {video.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CouresPlayerLayout;
