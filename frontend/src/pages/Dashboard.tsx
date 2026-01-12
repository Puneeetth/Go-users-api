import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Card, Button } from '../components/ui';
import { userService } from '../services/userService';
import type { User } from '../types/userTypes';
import { format } from 'date-fns';

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getUsers();
                setUsers(data || []);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const stats = [
        {
            label: 'Total Users',
            value: users.length,
            icon: Users,
            color: 'bg-primary-500',
            change: '+12%',
        },
        {
            label: 'New This Month',
            value: Math.min(users.length, 5),
            icon: UserPlus,
            color: 'bg-emerald-500',
            change: '+8%',
        },
        {
            label: 'Average Age',
            value: users.length > 0
                ? Math.round(users.reduce((acc, u) => acc + (u.age || 0), 0) / users.length)
                : 0,
            icon: TrendingUp,
            color: 'bg-amber-500',
            change: '+2%',
        },
    ];

    const recentUsers = users.slice(0, 5);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 p-8 text-white shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
                <div className="relative">
                    <h1 className="text-3xl font-bold mb-2">Welcome to UserHub 👋</h1>
                    <p className="text-primary-100 text-lg max-w-2xl">
                        Manage your users with ease. Create, update, and organize user data in one beautiful dashboard.
                    </p>
                    <div className="mt-6 flex gap-3">
                        <Link to="/users">
                            <Button variant="secondary" className="!bg-white !text-primary-700 hover:!bg-primary-50">
                                <Users className="w-4 h-4" />
                                View All Users
                            </Button>
                        </Link>
                        <Link to="/users?new=true">
                            <Button className="!bg-primary-800 hover:!bg-primary-900 !shadow-lg !shadow-primary-900/30">
                                <UserPlus className="w-4 h-4" />
                                Add New User
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} hover className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {loading ? '—' : stat.value}
                                    </p>
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Recent Users */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Users</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Latest additions to the system</p>
                    </div>
                    <Link to="/users">
                        <Button variant="ghost" size="sm">View All →</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                                    <div className="h-3 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : recentUsers.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-slate-500 dark:text-slate-400">No users yet. Add your first user!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentUsers.map((user, i) => (
                            <div
                                key={user.id}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors animate-slide-up"
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shadow-md">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{format(new Date(user.dob), 'MMM d, yyyy')}</span>
                                        {user.age && (
                                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-xs">
                                                {user.age} years
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Dashboard;
