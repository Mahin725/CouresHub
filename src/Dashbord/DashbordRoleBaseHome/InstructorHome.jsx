import { HiBookOpen, HiCurrencyDollar, HiOutlineClock, HiOutlineStar, HiUserGroup, HiOutlineDocumentAdd } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data - replace with real API fetches later
const mockData = {
  myCourses: 8,
  totalStudents: 342,
  pendingCourses: 2,
  averageRating: 4.7,
  totalEarnings: 12850,
  enrollmentsData: [
    { course: 'React Mastery', students: 120 },
    { course: 'Node.js Pro', students: 85 },
    { course: 'UI/UX Design', students: 62 },
    { course: 'Python Basics', students: 45 },
    { course: 'Others', students: 30 },
  ],
  earningsTrend: [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 1800 },
    { month: 'Mar', earnings: 2100 },
    { month: 'Apr', earnings: 2500 },
    { month: 'May', earnings: 3200 },
    { month: 'Jun', earnings: 4050 },
  ],
  recentActivity: [
    { action: 'New enrollment', details: 'React Mastery by Sarah K.', time: '1 hour ago' },
    { action: 'Course review', details: '5 stars on Node.js Pro', time: '3 hours ago' },
    { action: 'Course approved', details: 'Python Basics', time: 'Yesterday' },
    { action: 'Payment received', details: '$199', time: '2 days ago' },
  ]
};

const InstructorHome = () => {
  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Instructor Dashboard 👋</h1>
          <p className="text-base-content/70">Track your courses, students, and earnings.</p>
        </div>
        <Link to="/dashbord/addnew" className="btn btn-primary mt-4 sm:mt-0">
          <HiOutlineDocumentAdd className="text-xl" /> Add New Coures
        </Link>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">My Courses</p>
                <p className="text-3xl font-bold">{mockData.myCourses}</p>
              </div>
              <HiBookOpen className="text-4xl text-primary opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Students</p>
                <p className="text-3xl font-bold">{mockData.totalStudents}</p>
              </div>
              <HiUserGroup className="text-4xl text-success opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Pending Approval</p>
                <p className="text-3xl font-bold">{mockData.pendingCourses}</p>
              </div>
              <HiOutlineClock className="text-4xl text-warning opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Earnings</p>
                <p className="text-3xl font-bold">${mockData.totalEarnings.toLocaleString()}</p>
              </div>
              <HiCurrencyDollar className="text-4xl text-info opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Enrollments per Course Bar Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Enrollments by Course</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.enrollmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Trend Line Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Earnings Trend (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.earningsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity + Average Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              {mockData.recentActivity.map((activity, idx) => (
                <li key={idx} className="flex items-center justify-between p-4 rounded-lg bg-base-200">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm opacity-70">{activity.details}</p>
                  </div>
                  <p className="text-sm opacity-60">{activity.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title">Average Rating</h2>
            <div className="flex items-center justify-center gap-2 my-4">
              <HiOutlineStar className="text-5xl text-yellow-500" />
              <span className="text-5xl font-bold">{mockData.averageRating}</span>
            </div>
            <p className="text-lg opacity-70">Across all your courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHome;