import { HiBadgeCheck, HiBookOpen, HiClock, HiShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const mockData = {
  enrolled: 12,
  completed: 5,
  inProgress: 7,
  totalSpent: 599,
  progressData: [
    { name: 'Completed', value: 5, color: '#10b981' },
    { name: 'In Progress', value: 7, color: '#f59e0b' },
    { name: 'Not Started', value: 3, color: '#ef4444' },
  ],
  recentCourses: [
    { title: 'Advanced React', progress: 75, instructor: 'John Doe' },
    { title: 'Node.js Masterclass', progress: 40, instructor: 'Jane Smith' },
    { title: 'UI/UX Design Basics', progress: 100, instructor: 'Alex Lee' },
  ]
};

const StudentHome = () => {
  return (
    <div className="p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
      <p className="text-base-content/70 mb-8">Continue your learning journey today.</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Enrolled Courses</p>
                <p className="text-3xl font-bold">{mockData.enrolled}</p>
              </div>
              <HiBookOpen className="text-4xl text-primary opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Completed</p>
                <p className="text-3xl font-bold">{mockData.completed}</p>
              </div>
              <HiBadgeCheck className="text-4xl text-success opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">In Progress</p>
                <p className="text-3xl font-bold">{mockData.inProgress}</p>
              </div>
              <HiClock className="text-4xl text-warning opacity-80" />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Spent</p>
                <p className="text-3xl font-bold">${mockData.totalSpent}</p>
              </div>
              <HiShoppingCart className="text-4xl text-info opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Pie Chart */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Learning Progress Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={mockData.progressData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {mockData.progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Enrolled Courses */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Recently Enrolled</h2>
            <ul className="space-y-4">
              {mockData.recentCourses.map((course, idx) => (
                <li key={idx} className="flex items-center justify-between p-4 rounded-lg bg-base-200">
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm opacity-70">by {course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{course.progress}%</p>
                    <progress className="progress progress-primary w-20" value={course.progress} max="100"></progress>
                  </div>
                </li>
              ))}
            </ul>
            <Link to={'/dashbord/enrolled-class'} className="btn btn-primary mt-4 ">Continue Learning →</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;