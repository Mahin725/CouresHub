import { HiCurrencyDollar, HiDocumentText, HiUserGroup, HiOutlineClock, HiOutlineCollection, HiOutlineUserAdd } from 'react-icons/hi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data - replace with real fetches (e.g., from admin API endpoints)
const mockData = {
  totalUsers: 1248,
  totalStudents: 1105,
  totalInstructors: 132,
  totalAdmins: 11,
  totalCourses: 256,
  approvedCourses: 220,
  pendingCourses: 36,
  totalRevenue: 45290,
  monthlyRevenue: [
    { month: 'Jan', revenue: 5200 },
    { month: 'Feb', revenue: 6800 },
    { month: 'Mar', revenue: 7500 },
    { month: 'Apr', revenue: 8200 },
    { month: 'May', revenue: 9100 },
    { month: 'Jun', revenue: 10500 },
  ],
  userRoles: [
    { name: 'Students', value: 1105, color: '#3b82f6' },
    { name: 'Instructors', value: 132, color: '#10b981' },
    { name: 'Admins', value: 11, color: '#f59e0b' },
  ],
  recentActivity: [
    { action: 'New course submitted', details: 'Advanced JavaScript by John Doe', time: '2 hours ago' },
    { action: 'User registered', details: 'Student: alice@example.com', time: '4 hours ago' },
    { action: 'Payment received', details: '$99 for React Mastery', time: '6 hours ago' },
    { action: 'Course approved', details: 'Node.js Basics', time: '1 day ago' },
  ]
};

const AdminHome = () => {
  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard 👋</h1>
      <p className="text-base-content/70 mb-8">Overview of SpeakUp platform performance and activity.</p>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Users</p>
                <p className="text-3xl font-bold">{mockData.totalUsers}</p>
              </div>
              <HiUserGroup className="text-4xl text-primary opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Courses</p>
                <p className="text-3xl font-bold">{mockData.totalCourses}</p>
              </div>
              <HiOutlineCollection className="text-4xl text-success opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Pending Approvals</p>
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
                <p className="text-sm opacity-70">Total Revenue</p>
                <p className="text-3xl font-bold">${mockData.totalRevenue.toLocaleString()}</p>
              </div>
              <HiCurrencyDollar className="text-4xl text-info opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Revenue Trend Line Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Revenue Trend (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Roles Pie Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">User Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={mockData.userRoles} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {mockData.userRoles.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Recent Platform Activity</h2>
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
          <div className="card-actions justify-end mt-6">
            <button className="btn btn-primary">View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;