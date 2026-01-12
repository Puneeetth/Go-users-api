import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, Users as UsersIcon, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Button, Card, Modal, Input, EmptyState, TableSkeleton } from '../components/ui';
import { userService } from '../services/userService';
import type { User, CreateUserRequest } from '../types/userTypes';

const Users = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<CreateUserRequest>({ name: '', dob: '' });
    const [formErrors, setFormErrors] = useState<{ name?: string; dob?: string }>({});
    const [submitting, setSubmitting] = useState(false);
    const [deleteModal, setDeleteModal] = useState<{ open: boolean; user: User | null }>({
        open: false,
        user: null,
    });

    // Check for new=true query param
    useEffect(() => {
        if (searchParams.get('new') === 'true') {
            handleOpenModal();
            setSearchParams({});
        }
    }, [searchParams, setSearchParams]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await userService.getUsers();
            setUsers(data || []);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenModal = (user?: User) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                name: user.name,
                dob: format(new Date(user.dob), 'yyyy-MM-dd'),
            });
        } else {
            setEditingUser(null);
            setFormData({ name: '', dob: '' });
        }
        setFormErrors({});
        setModalOpen(true);
    };

    const validateForm = (): boolean => {
        const errors: { name?: string; dob?: string } = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.dob) {
            errors.dob = 'Date of birth is required';
        } else {
            const date = new Date(formData.dob);
            if (date > new Date()) {
                errors.dob = 'Date of birth cannot be in the future';
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSubmitting(true);
        try {
            if (editingUser) {
                await userService.updateUser(editingUser.id, formData);
                toast.success('User updated successfully');
            } else {
                await userService.createUser(formData);
                toast.success('User created successfully');
            }
            setModalOpen(false);
            fetchUsers();
        } catch (error) {
            toast.error(editingUser ? 'Failed to update user' : 'Failed to create user');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.user) return;

        try {
            await userService.deleteUser(deleteModal.user.id);
            toast.success('User deleted successfully');
            setDeleteModal({ open: false, user: null });
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Manage all users in the system
                    </p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4" />
                    Add User
                </Button>
            </div>

            {/* Search */}
            <Card className="!p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input pl-10"
                    />
                </div>
            </Card>

            {/* Users Table */}
            <Card>
                {loading ? (
                    <TableSkeleton rows={5} />
                ) : filteredUsers.length === 0 ? (
                    <EmptyState
                        icon={<UsersIcon className="w-10 h-10 text-slate-400" />}
                        title={search ? 'No users found' : 'No users yet'}
                        description={
                            search
                                ? 'Try adjusting your search terms'
                                : 'Get started by adding your first user'
                        }
                        action={
                            !search
                                ? {
                                    label: 'Add User',
                                    onClick: () => handleOpenModal(),
                                }
                                : undefined
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        User
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Date of Birth
                                    </th>
                                    <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Age
                                    </th>
                                    <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredUsers.map((user, i) => (
                                    <tr
                                        key={user.id}
                                        className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors animate-slide-up"
                                        style={{ animationDelay: `${i * 30}ms` }}
                                    >
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold shadow-md">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        ID: {user.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                                                <Calendar className="w-4 h-4 text-slate-400" />
                                                {format(new Date(user.dob), 'MMM d, yyyy')}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
                                                {user.age ?? '—'} years
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleOpenModal(user)}
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteModal({ open: true, user })}
                                                    className="!text-rose-600 hover:!bg-rose-50 dark:hover:!bg-rose-900/20"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Create/Edit Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingUser ? 'Edit User' : 'Add New User'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Name"
                        placeholder="Enter user name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={formErrors.name}
                    />
                    <Input
                        label="Date of Birth"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        error={formErrors.dob}
                    />
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={submitting}>
                            {editingUser ? 'Save Changes' : 'Create User'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.open}
                onClose={() => setDeleteModal({ open: false, user: null })}
                title="Delete User"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-300">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-slate-900 dark:text-white">
                            {deleteModal.user?.name}
                        </span>
                        ? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <Button
                            variant="secondary"
                            onClick={() => setDeleteModal({ open: false, user: null })}
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Users;
