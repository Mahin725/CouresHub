import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Nabvar from "../Components/Nabvar/Nabvar";
import CouresNotAccess from "../Components/Error/CouresNotAccess";

// example backend dummy data
const couresContent = {
    courseId: "12345",
    content: [
        {
            ID: "1",
            title: "Introduction to the Course",
            description: "An overview of what the course will cover.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            ID: "2",
            title: "Course Rules",
            description: "Course rules and expectations.",
            videoUrl: "https://www.youtube.com/embed/3GwjfUFyY6M"
        },
        {
            ID: "3",
            title: "Environment Setup",
            description: "Setting up your development environment.",
            videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU"
        }
    ]
};

const CouresPlayerLayout = () => {
    const location = useLocation();
    const couresInfo = location.state;
    const [selectedVideo, setSelectedVideo] = useState(couresContent.content[0]);

    // Optional: Fetch from backend using couresInfo.courseId
    useEffect(() => {
        if (couresInfo?.courseId !== couresContent.courseId) {
            // Ideally: fetch actual data here.
            console.warn("Different courseId. Replace this with API call.");
        }
    }, [couresInfo]);

    if (!couresInfo) {
        return <CouresNotAccess />;
    }

    return (
        <>
            <Nabvar />
            <div className="mt-20" style={{ display: "flex", height: "calc(100vh - 60px)" }}>
                {/* Left: Video Player */}
                <div style={{ flex: 2, padding: "24px", background: "#f9f9f9" }}>
                    <h2>{selectedVideo.title}</h2>
                    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px" }}>
                        <iframe
                            src={selectedVideo.videoUrl}
                            title={selectedVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "8px"
                            }}
                        ></iframe>
                    </div>
                    <p style={{ marginTop: "16px" }}>{selectedVideo.description}</p>
                </div>

                {/* Right: Video List */}
                <div style={{ flex: 1, padding: "24px", borderLeft: "1px solid #eee", background: "#fff" }}>
                    <h3>Course Videos</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {couresContent.content.map((video) => (
                            <li key={video.ID} style={{ marginBottom: "12px" }}>
                                <button
                                    onClick={() => setSelectedVideo(video)}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "12px",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        background: selectedVideo.ID === video.ID ? "#e0e7ff" : "#f5f5f5",
                                        cursor: "pointer",
                                        fontWeight: "bold"
                                    }}
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
