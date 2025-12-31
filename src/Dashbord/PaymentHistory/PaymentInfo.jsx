import jsPDF from "jspdf";
import { FaFileInvoiceDollar, FaCalendarAlt, FaIdCard, FaEnvelope } from "react-icons/fa";

const PaymentInfo = ({ item, index }) => {
  const createInvoice = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Payment Invoice", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`Order ID: ${item._id}`, 20, 40);
    doc.text(`Transaction ID: ${item.transaction}`, 20, 50);
    doc.text(`Course ID: ${item.couresId || "N/A"}`, 20, 60);
    doc.text(`Date: ${new Date(item.date).toLocaleDateString()}`, 20, 70);
    doc.text(`Email: ${item.email}`, 20, 80);
    doc.text(`Amount: ${item.price ? `$${item.price}` : "N/A"}`, 20, 90);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for choosing SpeakUp!", 105, 130, { align: "center" });
    doc.text("For support: support@speakup.com", 105, 140, { align: "center" });

    doc.save(`Invoice_${item.transaction}.pdf`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Payment #{index}</h3>
          <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
            {new Date(item.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-3">
            <FaIdCard className="text-indigo-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Transaction ID</p>
              <p className="font-mono font-semibold">{item.transaction}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaFileInvoiceDollar className="text-purple-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Course ID</p>
              <p className="font-semibold">{item.couresId || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-green-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Payment Date</p>
              <p className="font-semibold">
                {new Date(item.date).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold truncate">{item.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={createInvoice}
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            <FaFileInvoiceDollar className="inline mr-2" />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;