import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Star, 
  TrendingUp, 
  MessageCircle, 
  Mail,
  MoreVertical,
  Search,
  Save,
  Bell,
  Shield,
  CheckCircle,
  Calendar,
  ChevronRight,
  Filter,
  ChevronLeft
} from 'lucide-react';
import { Logo } from './Logo';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState<'dashboard' | 'add-customer' | 'customers' | 'settings'>('dashboard');

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Customer List State
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All time');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mock Data
  const recentActivity = [
    { id: 1, name: "Sarah Jenkins", date: "Today, 9:41 AM", status: "Reviewed", rating: 5 },
    { id: 2, name: "Mike Thompson", date: "Today, 8:15 AM", status: "Clicked", rating: null },
    { id: 3, name: "Jessica Wu", date: "Yesterday, 6:30 PM", status: "Sent", rating: null },
    { id: 4, name: "David Miller", date: "Yesterday, 4:12 PM", status: "Reviewed", rating: 5 },
    { id: 5, name: "Emma Wilson", date: "Yesterday, 2:05 PM", status: "Reviewed", rating: 4 },
    { id: 6, name: "James Rodriguez", date: "Oct 24, 11:30 AM", status: "Sent", rating: null },
    { id: 7, name: "Lisa Anderson", date: "Oct 24, 09:15 AM", status: "Clicked", rating: null },
    { id: 8, name: "Robert Taylor", date: "Oct 23, 5:45 PM", status: "Reviewed", rating: 5 },
    { id: 9, name: "William Brown", date: "Oct 23, 3:20 PM", status: "Sent", rating: null },
    { id: 10, name: "Ashley Garcia", date: "Oct 23, 1:10 PM", status: "Reviewed", rating: 5 },
  ];

  const allCustomers = [
    { id: 1, name: "Sarah Jenkins", phone: "(555) 123-4567", visitDate: "Oct 25, 2023", status: "Reviewed", rating: 5 },
    { id: 2, name: "Mike Thompson", phone: "(555) 234-5678", visitDate: "Oct 25, 2023", status: "Clicked", rating: null },
    { id: 3, name: "Jessica Wu", phone: "(555) 345-6789", visitDate: "Oct 24, 2023", status: "Sent", rating: null },
    { id: 4, name: "David Miller", phone: "(555) 456-7890", visitDate: "Oct 24, 2023", status: "Reviewed", rating: 5 },
    { id: 5, name: "Emma Wilson", phone: "(555) 567-8901", visitDate: "Oct 24, 2023", status: "Reviewed", rating: 4 },
    { id: 6, name: "James Rodriguez", phone: "(555) 678-9012", visitDate: "Oct 23, 2023", status: "Sent", rating: null },
    { id: 7, name: "Lisa Anderson", phone: "(555) 789-0123", visitDate: "Oct 23, 2023", status: "Clicked", rating: null },
    { id: 8, name: "Robert Taylor", phone: "(555) 890-1234", visitDate: "Oct 23, 2023", status: "Reviewed", rating: 5 },
    { id: 9, name: "William Brown", phone: "(555) 901-2345", visitDate: "Oct 22, 2023", status: "Pending", rating: null },
    { id: 10, name: "Ashley Garcia", phone: "(555) 012-3456", visitDate: "Oct 22, 2023", status: "Reviewed", rating: 5 },
    { id: 11, name: "Brian Thomas", phone: "(555) 111-2222", visitDate: "Oct 21, 2023", status: "No Response", rating: null },
    { id: 12, name: "Karen White", phone: "(555) 333-4444", visitDate: "Oct 21, 2023", status: "Reviewed", rating: 3 },
  ];

  const stats = [
    { label: "Requests Sent", value: "127", sub: "this month", icon: <Mail className="w-5 h-5 text-blue-500" />, change: "+12%" },
    { label: "Response Rate", value: "34%", sub: "clicked your link", icon: <TrendingUp className="w-5 h-5 text-green-500" />, change: "+4.5%" },
    { label: "New Reviews", value: "12", sub: "5-star reviews", icon: <Star className="w-5 h-5 text-yellow-500" />, change: "+8" },
    { label: "Avg Rating", value: "4.8", sub: "from 12 reviews", icon: <MessageCircle className="w-5 h-5 text-purple-500" />, change: "+0.2" },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Reviewed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Reviewed</span>;
      case 'Clicked':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Clicked</span>;
      case 'Pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'No Response':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">No Response</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">Sent</span>;
    }
  };

  // Filter Logic
  const filteredCustomers = allCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || customer.status === statusFilter;
    // Mock date filter logic
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1000);
  };

  const NavItem = ({ view, icon: Icon, label }: { view: typeof activeView, icon: any, label: string }) => (
    <button 
      onClick={() => {
        setActiveView(view);
        setIsSidebarOpen(false);
        setShowSuccess(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        activeView === view 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-20 flex items-center px-6 border-b border-gray-800">
           <div className="flex items-center gap-3">
             <div className="bg-gray-800 rounded-full p-1">
                <Logo className="w-8 h-8" />
             </div>
             <span className="font-bold text-lg tracking-tight">Gray Monkey</span>
           </div>
           <button 
             className="ml-auto lg:hidden text-gray-400 hover:text-white"
             onClick={() => setIsSidebarOpen(false)}
           >
             <X className="w-6 h-6" />
           </button>
        </div>

        <nav className="p-4 space-y-2 flex-1">
          <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem view="add-customer" icon={UserPlus} label="Add Customer" />
          <NavItem view="customers" icon={Users} label="Customers" />
          <NavItem view="settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl w-full transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
             <Logo className="w-8 h-8" />
             <span className="font-bold text-gray-900">Gray Monkey</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              {/* Breadcrumbs */}
              {activeView !== 'dashboard' && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                  <button onClick={() => setActiveView('dashboard')} className="hover:text-blue-600 hover:underline">Dashboard</button>
                  <ChevronRight className="w-4 h-4" />
                  <span className="capitalize text-gray-900 font-medium">{activeView.replace('-', ' ')}</span>
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                {activeView.replace('-', ' ')}
              </h1>
              {activeView === 'dashboard' && (
                <p className="text-gray-500 mt-1">Welcome back, Elite Fitness!</p>
              )}
            </div>
            
            {activeView === 'dashboard' && (
              <div className="flex items-center gap-3">
                 <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search customers..." 
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
                    />
                 </div>
                 <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold border-2 border-white shadow-sm">
                    EF
                 </div>
              </div>
            )}
          </div>

          {/* DASHBOARD VIEW */}
          {activeView === 'dashboard' && (
            <>
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => setActiveView('add-customer')}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 group"
                >
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                     <UserPlus className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg">Add Customer</span>
                </button>
                <button 
                  onClick={() => setActiveView('customers')}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 p-4 rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <Users className="w-6 h-6 text-gray-500" />
                  <span className="font-bold text-lg">View All Customers</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        {stat.icon}
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                      <p className="text-sm text-gray-500 font-medium mt-1">{stat.label}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 font-medium">
                      <tr>
                        <th className="px-6 py-3">Customer Name</th>
                        <th className="px-6 py-3">Sent Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Rating</th>
                        <th className="px-6 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {recentActivity.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {item.date}
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(item.status)}
                          </td>
                          <td className="px-6 py-4">
                            {item.rating ? (
                              <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(item.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                              </div>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* ADD CUSTOMER VIEW */}
          {activeView === 'add-customer' && (
            <div className="max-w-2xl mx-auto">
              {!showSuccess ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    <form onSubmit={handleAddCustomer} className="space-y-6">
                      
                      {/* Customer Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Customer Name
                        </label>
                        <input 
                          type="text" 
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                          placeholder="e.g. John Smith" 
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                          placeholder="e.g. +1 (555) 123-4567" 
                        />
                        <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          We'll send them a text 24 hours from now
                        </p>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Email (Optional)
                        </label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                          placeholder="e.g. john@email.com" 
                        />
                      </div>

                      {/* Visit Date & Time */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Visit Date & Time
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input 
                            type="datetime-local" 
                            defaultValue={new Date().toISOString().slice(0, 16)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-600" 
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          When did they visit? We'll send the request 24 hours after this.
                        </p>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          Notes (Optional)
                        </label>
                        <textarea 
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" 
                          placeholder="e.g. Haircut, beard trim..." 
                        />
                      </div>

                      <div className="pt-6 flex flex-col sm:flex-row gap-4">
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-green-600 text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition-all shadow-md shadow-green-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <UserPlus className="w-5 h-5" />
                              Add Customer & Send Request
                            </>
                          )}
                        </button>
                        <button 
                          type="button"
                          onClick={() => setActiveView('dashboard')}
                          className="px-8 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in-up">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Added!</h2>
                  <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    We've scheduled the review request. It will be sent automatically in 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Add Another Customer
                    </button>
                    <button 
                      onClick={() => setActiveView('dashboard')}
                      className="py-3 px-8 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMERS VIEW */}
          {activeView === 'customers' && (
            <div className="space-y-6">
              {/* Filters Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search by name or phone..." 
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none w-full sm:w-40 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="All">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Sent">Sent</option>
                        <option value="Clicked">Clicked</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="No Response">No Response</option>
                      </select>
                      <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="relative">
                      <select 
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="appearance-none w-full sm:w-40 pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        <option value="All time">All Time</option>
                        <option value="Last 7 days">Last 7 Days</option>
                        <option value="Last 30 days">Last 30 Days</option>
                      </select>
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {currentItems.length > 0 ? (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                          <tr>
                            <th className="px-6 py-4">Customer Name</th>
                            <th className="px-6 py-4">Phone Number</th>
                            <th className="px-6 py-4">Visit Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Rating</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {currentItems.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                              <td className="px-6 py-4 font-medium text-gray-900">
                                {customer.name}
                              </td>
                              <td className="px-6 py-4 text-gray-500">
                                {customer.phone}
                              </td>
                              <td className="px-6 py-4 text-gray-500">
                                {customer.visitDate}
                              </td>
                              <td className="px-6 py-4">
                                {getStatusBadge(customer.status)}
                              </td>
                              <td className="px-6 py-4">
                                {customer.rating ? (
                                  <div className="flex items-center gap-0.5 text-yellow-400">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-gray-700 font-medium ml-1.5">{customer.rating}.0</span>
                                  </div>
                                ) : (
                                  <span className="text-gray-300">-</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-sm text-gray-500">
                        Showing <span className="font-medium text-gray-900">{indexOfFirstItem + 1}</span> to <span className="font-medium text-gray-900">{Math.min(indexOfLastItem, filteredCustomers.length)}</span> of <span className="font-medium text-gray-900">{filteredCustomers.length}</span> customers
                      </p>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <div className="flex items-center gap-1">
                          {[...Array(totalPages)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(i + 1)}
                              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                currentPage === i + 1
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                        <button 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Empty State
                  <div className="p-16 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No customers found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                      {searchQuery || statusFilter !== 'All' 
                        ? "Try adjusting your search or filters to find what you're looking for."
                        : "Add your first customer to start collecting reviews on autopilot."}
                    </p>
                    <button 
                      onClick={() => setActiveView('add-customer')}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-sm font-medium"
                    >
                      <UserPlus className="w-5 h-5" />
                      Add New Customer
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS VIEW */}
          {activeView === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Business Profile</h2>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                          <input type="text" defaultValue="Elite Fitness" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Google Place ID</label>
                          <input type="text" defaultValue="ChIJN1t_tDeuEmsRUsoyG83frY4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Bell className="w-5 h-5" /></div>
                          <div>
                             <p className="font-medium text-gray-900">New Review Alert</p>
                             <p className="text-sm text-gray-500">Get notified when a new review is posted</p>
                          </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                       </label>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 text-red-600 rounded-lg"><Shield className="w-5 h-5" /></div>
                          <div>
                             <p className="font-medium text-gray-900">Negative Feedback Alert</p>
                             <p className="text-sm text-gray-500">Instant email when feedback is below 4 stars</p>
                          </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                       </label>
                    </div>
                 </div>
              </div>
              
              <div className="flex justify-end">
                 <button className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                    <Save className="w-4 h-4" /> Save Changes
                 </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;