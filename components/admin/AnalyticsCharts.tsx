"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

interface AnalyticsData {
  userStats: { name: string; value: number }[];
  verificationStats: { name: string; value: number }[];
  growthData: { month: string; users: number; projects: number }[];
}

export function AnalyticsCharts({ data }: { data: AnalyticsData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Users Breakdown Pie Chart */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">User Demographics</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.userStats}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {data.userStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Verification Status Bar Chart */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">Project Verifications</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.verificationStats}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: '#f5f5f5' }} />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]}>
                {data.verificationStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Growth Line Chart */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-neutral-800">Platform Growth (Simulated)</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.growthData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="projects" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
