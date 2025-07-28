import { useEffect, useState } from "react";
import { FaRegStar, FaSearch, FaStar } from "react-icons/fa";
import { HiOutlineBookOpen } from "react-icons/hi2";
import Rating from "react-rating";
import CouresCart from "../../Components/CouresCart/CouresCart";
import { Helmet } from "react-helmet-async";
import Pagination from "../../Components/paginaition/Pagination"; // Make sure the import path is correct
import Footer from "../../Components/Footer/Footer";
import Mentor from "../../Components/mentor/Mentor";
import CourseCard from "../../Components/UpdatedCouresCart/UpdatedCouresCart";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const classesPerPage = 16;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchHandle = async () => {
    setCurrentPage(1);
    setIsSearchClicked(true);
    const classesMatchingSearch = classes.filter((cls) =>
      cls?.Title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClasses(classesMatchingSearch);
  };

  useEffect(() => {
    fetch("https://speakup-ivory.vercel.app/allclasses")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  // Calculate the index range for classes to display based on the current page
  const startIndex = (currentPage - 1) * classesPerPage;
  const endIndex = startIndex + classesPerPage;

  // Determine which classes to display based on whether a search query is active
  const classesToDisplay = isSearchClicked
    ? filteredClasses
    : classes.slice(startIndex, endIndex);

  return (
    <div>
      <Helmet>
        <title>CLASSES || SpeakUp</title>
      </Helmet>
      <p className="text-4xl text-center font-sans font-semibold my-5">
        We Provide Best Courses For Students
      </p>
      <div className="flex items-center gap-3 justify-center py-2">
        <input
          type="search"
          className="rounded-full px-3 py-3 w-[80%] md:w-[50%] lg:w-[30%] bg-base-300"
          placeholder="Search Classes"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <FaSearch
          size={22}
          onClick={searchHandle}
          className="text-cyred cursor-pointer"
        />
      </div>
      <div className="grid md:grid-cols-4 gap-2 mb-5">
        {classesToDisplay.map((cls) => (
          <CourseCard key={cls._id} course={cls}></CourseCard>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(
          (isSearchClicked ? filteredClasses.length : classes.length) /
            classesPerPage
        )}
        onPageChange={handlePageChange}
        onNumberClick={handleNumberClick}
      />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Classes;
