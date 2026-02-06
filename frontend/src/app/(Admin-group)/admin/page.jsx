"use client";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Eye,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {

  // --- DUMMY DATA: Inquiries ---
  const inquiries = [
    {
      id: "INQ-1001",
      customer: "John Deo",
      email: "johndoe@gmail.com",
      company: "ABCD Corp",
      date: "Feb 5, 2026",
      items: 12,
      status: "Pending",
      totalValue: "₹15,000 (Est)",
    },
    {
      id: "INQ-1002",
      customer: "Sarah Smith",
      email: "sarah.s@designstudio.com",
      company: "Studio S",
      date: "Feb 4, 2026",
      items: 450,
      status: "Replied",
      totalValue: "₹65,000 (Est)",
    },
    {
      id: "INQ-1003",
      customer: "Michael Ross",
      email: "mross@retail.au",
      company: "Ross Retail",
      date: "Feb 4, 2026",
      items: 50,
      status: "Pending",
      totalValue: "₹8,500 (Est)",
    },
    {
      id: "INQ-1004",
      customer: "Priya Patel",
      email: "priya@events.in",
      company: "Elite Events",
      date: "Feb 3, 2026",
      items: 200,
      status: "Replied",
      totalValue: "₹28,000 (Est)",
    },
    {
      id: "INQ-1005",
      customer: "David Chen",
      email: "david@hotel.sg",
      company: "Green Hotels",
      date: "Feb 2, 2026",
      items: 1000,
      status: "Closed",
      totalValue: "₹1,50,000 (Est)",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-normal text-[#666141]">Dashboard</h1>
           <p className="text-sm text-gray-500 mt-1">Snapshot of your business performance</p>
        </div>
        
        <button className="bg-[#666141] text-[#FFFEF5] px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#5a563d] transition-colors shadow-sm">
           Download Report
        </button>
      </div>

      {/* --- KPI Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inquiries" 
          value="1,240" 
          trend="+12%" 
          icon={<MessageSquare size={24} />} 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Pending Requests" 
          value="45" 
          trend="Action Needed" 
          icon={<Clock size={24} />} 
          color="bg-yellow-50 text-yellow-600"
          trendColor="text-yellow-600"
        />
        <StatCard 
          title="Replied / Closed" 
          value="1,195" 
          trend="+5%" 
          icon={<CheckCircle size={24} />} 
          color="bg-green-50 text-green-600"
        />
        <StatCard 
          title="Active Products" 
          value="340" 
          trend="In Catalog" 
          icon={<ShoppingBag size={24} />} 
          color="bg-[#666141]/10 text-[#666141]"
          trendColor="text-[#666141]"
        />
      </div>

      {/* --- Recent Inquiries Table --- */}
      <div className="bg-white border border-[#666141]/10 rounded-xl shadow-sm overflow-hidden">
        
        {/* Table Header Section */}
        <div className="flex items-center justify-between p-6 border-b border-[#666141]/10">
           <h2 className="text-lg font-medium text-[#666141]">Recent Inquiries</h2>
           <Link href="/admin/inquiries" className="text-sm text-[#666141] hover:underline font-medium">
              View All
           </Link>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFEF5]/50 text-[#666141]/80 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Inquiry ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Items</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#666141]/5">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#FFFEF5] transition-colors group">
                  
                  <td className="px-6 py-4 text-sm font-medium text-[#666141]">
                    {inq.id}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                       <span className="text-sm font-medium text-gray-900">{inq.customer}</span>
                       <span className="text-xs text-gray-500">{inq.company || inq.email}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {inq.date}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {inq.items} units
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inq.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      inq.status === 'Replied' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {inq.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-gray-400 hover:text-[#666141] transition-colors" title="View Details">
                           <Eye size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

// --- Helper Component: Stat Card ---
const StatCard = ({ title, value, trend, icon, color, trendColor = "text-green-600" }) => (
  <div className="bg-white p-6 rounded-xl border border-[#666141]/10 shadow-sm flex items-start justify-between">
     <div className="space-y-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
           {icon}
        </div>
        <div>
           <p className="text-sm text-gray-500 font-medium">{title}</p>
           <h3 className="text-2xl font-semibold text-[#666141] mt-1">{value}</h3>
        </div>
     </div>
     <div className={`text-xs font-medium ${trendColor} bg-gray-50 px-2 py-1 rounded-full`}>
        {trend}
     </div>
  </div>
);