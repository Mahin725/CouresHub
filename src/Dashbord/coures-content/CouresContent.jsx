import { useEffect, useState } from 'react';
import './content.css';
import MilestoneInfo from './milestoneInfo/MilestoneInfo';
import { useLocation } from 'react-router-dom';

const CouresContent = () => {
  const location = useLocation();
  const couresInfo = location.state?.item;
  const [data, setData] = useState([]);
    console.log(couresInfo);    
    console.log(data);
  useEffect(() => {
    if (!couresInfo?._id) return;

    fetch(`http://localhost:5000/content-collections/${couresInfo._id}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result.content || []);
      })
      .catch((err) => {
        console.error("Failed to load modules:", err);
      });
  }, [couresInfo?._id]);

  return (
    <div className="main h-screen bg-black text-white">
      <div className="milestoneDetails">
        <img className="milestoneImage" src={couresInfo.image} alt="" />
        <h1 className="title text-2xl">{couresInfo.name || "Testing"}</h1>
        <p className="details">{couresInfo.details} </p>
      </div>

      <div>
        <div className="milestones">
          {data.length === 0 ? (
            <p className="text-center mt-4 text-gray-400">No modules found.</p>
          ) : (
            data.map((milestone) => (
              <MilestoneInfo key={milestone.id} content={milestone} />
            ))
          )}
        </div>
        <div className="doneList">{/* future progress list */}</div>
      </div>
    </div>
  );
};

export default CouresContent;
