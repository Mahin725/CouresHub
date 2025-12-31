import { useContext, useState } from "react";
import { jsPDF } from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContex } from "../../Providers/AuthProvider";
import UseCart from "../../Hooks/UseCart";
import useAddToCart from "../../Hooks/AddCart";

import { Star, Users, Download, ShoppingCart, Clock, Calendar } from "lucide-react";

const CourseDetails = () => {
  const { state: course } = useLocation();
  const { user } = useContext(AuthContex);
  const navigate = useNavigate();

  const [, refetch] = UseCart();
  const [btnDisable, setDisable] = useState(false);

  const addToCart = useAddToCart(refetch, setDisable);

  // Safely parse price as number
  const currentPrice = parseFloat(course?.price);
  const validPrice = !isNaN(currentPrice) && currentPrice > 0;

  // Professional discount logic: 20% off (common on course platforms)
  const discountPercentage = 20;
  const originalPrice = validPrice
    ? (currentPrice / (1 - discountPercentage / 100)).toFixed(2)
    : null;
  const savings = validPrice ? (originalPrice - currentPrice).toFixed(2) : null;

  const handleCart = () => {
    if (!user) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "You need to login first",
        showConfirmButton: false,
        timer: 2000,
      });
      return navigate("/login");
    }

    const selectedItem = {
      cartId: course._id,
      name: course.name,
      image: course.image,
      price: currentPrice,
      email: user.email,
    };

    addToCart(selectedItem);
  };

  // Enhanced PDF with better formatting
  const infoPdf = () => {
    const doc = new jsPDF("portrait", "pt", "a4");
    const margin = 40;
    let y = margin;

    doc.setFontSize(20);
    doc.text(course.name, margin, y);
    y += 40;

    doc.setFontSize(12);
    doc.text(`Instructor: ${course.instructorName}`, margin, y);
    y += 30;
    doc.text(`Enrolled Students: ${course.enrolled}`, margin, y);
    y += 30;
    doc.text(`Available Seats: ${course.availableSeats}`, margin, y);
    y += 30;
    doc.text(`Rating: ${course.ratings} ⭐`, margin, y);
    y += 40;

    doc.setFontSize(16);
    doc.text(`Price: $${currentPrice.toFixed(2)}`, margin, y);
    if (originalPrice) {
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Original: $${originalPrice}`, margin + 150, y);
    }
    y += 50;

    doc.setFontSize(11);
    doc.setTextColor(0);
    const splitDetails = doc.splitTextToSize(course.details, 520);
    doc.text(splitDetails, margin, y);

    doc.save(`${course.name.replace(/\s+/g, "_")}_Brochure.pdf`);
  };

  // Helper to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={
              i < fullStars
                ? "text-yellow-500 fill-yellow-500"
                : i === fullStars && hasHalf
                  ? "text-yellow-500 fill-yellow-500 [stroke-width:1px] [clip-path:inset(0_50%_0_0)]"
                  : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  if (!course) {
    return <div className="text-center py-20 text-2xl">Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Course Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src={course.image}
              alt={course.name}
              className="w-full aspect-video object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-6 left-6 bg-indigo-600 text-white px-5 py-2 rounded-full font-bold shadow-lg">
              Popular Course
            </div>
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                  <p className="text-sm opacity-90">Available Seats</p>
                  <p className="text-3xl font-bold">{course.availableSeats}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Clock size={18} /> Duration
                  </p>
                  <p className="text-2xl font-bold">12 Weeks</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={18} /> Level
                  </p>
                  <p className="text-2xl font-bold">Intermediate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-8">
            {/* Title & Instructor */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {course.name}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Taught by{" "}
                <span className="font-bold text-indigo-700">{course.instructorName}</span>
              </p>
            </div>

            {/* Rating & Enrolled */}
            <div className="flex flex-wrap items-center gap-8 text-lg">
              <div className="flex items-center gap-3">
                {renderStars(course.ratings)}
                <span className="font-semibold text-gray-800">{course.ratings}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users size={24} className="text-indigo-600" />
                <span>{course.enrolled} students enrolled</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <p className="text-lg text-gray-700 leading-relaxed">{course.details}</p>
            </div>

            {/* Info Cards */}


            {/* Price & Action Buttons */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <div className="flex flex-wrap items-end gap-4 mb-8">
                <div>
                  <p className="text-5xl font-extrabold text-indigo-700">
                    ${validPrice ? currentPrice.toFixed(2) : "N/A"}
                  </p>
                  {originalPrice && (
                    <p className="text-2xl text-gray-500 line-through mt-2">
                      ${originalPrice}
                    </p>
                  )}
                </div>
                {savings && (
                  <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-md">
                    {discountPercentage}% OFF • Save ${savings}
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={btnDisable}
                  onClick={handleCart}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={26} />
                  {btnDisable ? "Added to Cart" : "Add to Cart"}
                </button>

                <button
                  onClick={infoPdf}
                  className="flex items-center justify-center gap-3 px-8 py-5 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold text-lg rounded-xl transition-all shadow-md"
                >
                  <Download size={26} />
                  Download Brochure
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;