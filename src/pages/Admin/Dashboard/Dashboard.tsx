import { useState } from 'react';
import { ThumbsUp, StickyNote, MessageSquareText, BanknoteArrowUp, ChevronDown, User, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('7 day');

  const stats = [
    {
      title: 'Total Posts',
      value: '1,284',
      description: '+12.5% from last month',
      icon: <StickyNote className="w-5 h-5 text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Total Likes',
      value: '42.5k',
      description: '+8.2% from last month',
      icon: <ThumbsUp className="w-5 h-5 text-rose-600" />,
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
    },
    {
      title: 'Total Comments',
      value: '842',
      description: '+2.4% from last month',
      icon: <MessageSquareText className="w-5 h-5 text-amber-600" />,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      title: 'Monthly Growth',
      value: '+18.2%',
      description: 'Active user retention',
      icon: <BanknoteArrowUp className="w-5 h-5 text-emerald-600" />,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
  ];

  const activities = [
    { id: 1, user: 'Admin', action: 'published', target: 'Top 10 React Tips', time: '2 mins ago', icon: <StickyNote className="w-3.5 h-3.5 text-blue-600" />, iconBg: 'bg-blue-100' },
    { id: 2, user: 'Sarah J.', action: 'liked', target: 'Modern UI Trends', time: '15 mins ago', icon: <ThumbsUp className="w-3.5 h-3.5 text-rose-600" />, iconBg: 'bg-rose-100' },
    { id: 3, user: 'Mike Ross', action: 'commented on', target: 'Tailwind v4 Guide', time: '1 hour ago', icon: <MessageSquareText className="w-3.5 h-3.5 text-amber-600" />, iconBg: 'bg-amber-100' },
    { id: 4, user: 'System', action: 'reached', target: '1k Subscribers', time: '3 hours ago', icon: <BanknoteArrowUp className="w-3.5 h-3.5 text-emerald-600" />, iconBg: 'bg-emerald-100' },
    { id: 5, user: 'Admin', action: 'updated', target: 'Privacy Policy', time: '5 hours ago', icon: <StickyNote className="w-3.5 h-3.5 text-blue-600" />, iconBg: 'bg-blue-100' },
    { id: 6, user: 'Emma W.', action: 'liked', target: 'Top 10 React Tips', time: '6 hours ago', icon: <ThumbsUp className="w-3.5 h-3.5 text-rose-600" />, iconBg: 'bg-rose-100' },
    { id: 7, user: 'John Doe', action: 'commented on', target: 'Getting Started', time: 'Yesterday', icon: <MessageSquareText className="w-3.5 h-3.5 text-amber-600" />, iconBg: 'bg-amber-100' },
  ];

  const getChartData = () => {
    if (timeframe === '7 day') {
      return [
        { name: 'Mon', engagements: 400 },
        { name: 'Tue', engagements: 300 },
        { name: 'Wed', engagements: 550 },
        { name: 'Thu', engagements: 450 },
        { name: 'Fri', engagements: 700 },
        { name: 'Sat', engagements: 600 },
        { name: 'Sun', engagements: 800 },
      ];
    } else if (timeframe === '15 day') {
      return Array.from({ length: 15 }, (_, i) => ({
        name: `D${i + 1}`,
        engagements: Math.floor(Math.random() * 500) + 200 + i * 20,
      }));
    } else {
      return Array.from({ length: 30 }, (_, i) => ({
        name: `${i + 1}`,
        engagements: Math.floor(Math.random() * 800) + 300 + i * 15,
      }));
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Platform overview</h2>
        <p className="text-muted-foreground text-lg font-medium">
          Real-time engagement and growth metrics for your blog.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${stat.borderColor} group`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${stat.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                  {stat.icon}
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Metrics
                  </span>
                  <div className="h-1 w-8 bg-foreground/10 rounded-full mt-1" />
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-3xl font-bold tracking-tighter">{stat.value}</h3>
                <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 mt-8">
        {/* Analytics Chart Section */}
        <Card className="md:col-span-4 border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl">Engagement Analytics</CardTitle>
              <CardDescription>Daily active interaction volume</CardDescription>
            </div>
            <div className="relative inline-block text-left">
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="appearance-none bg-background border rounded-lg px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer hover:bg-accent transition-colors"
              >
                <option value="7 day">7 days</option>
                <option value="15 day">15 days</option>
                <option value="1 month">1 month</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full pt-4 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getChartData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEngagements" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" strokeOpacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="engagements" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEngagements)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Section */}
        <Card className="md:col-span-3 border shadow-sm flex flex-col h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              Recent Activity
            </CardTitle>
            <CardDescription>Latest interactions across your platform</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-[320px] overflow-y-auto px-6 pb-6 space-y-4 scrollbar-thin scrollbar-thumb-accent">
              {activities.map((activity) => (
                <div key={activity.id} className="flex gap-4 group cursor-pointer hover:bg-accent/50 p-2 -mx-2 rounded-xl transition-colors">
                  <div className={`mt-1 h-9 w-9 shrink-0 rounded-full flex items-center justify-center ${activity.iconBg} border border-white shadow-sm`}>
                    {activity.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm leading-tight">
                      <span className="font-bold text-foreground">{activity.user}</span>
                      <span className="text-muted-foreground"> {activity.action} </span>
                      <span className="font-medium text-foreground underline decoration-muted/30 underline-offset-2">
                        {activity.target}
                      </span>
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest pt-2">
                View All Activity
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;