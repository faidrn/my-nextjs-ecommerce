import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { Loader, Plus, Edit, Search, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';


export const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [emailCheckResult, setEmailCheckResult] = useState(null);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    avatar: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const checkEmailAvailability = async (email) => {
    if (!email) return;

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/is-available', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setEmailCheckResult(data.isAvailable);

      if (data.isAvailable) {
        toast.success('Email is available!');
      } else {
        toast.error('Email already exists!');
      }
    } catch (error) {
      toast.error('Failed to check email');
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          avatar: formData.avatar || 'https://api.lorem.space/image/face?w=640&h=480',
        }),
      });

      if (!response.ok) throw new Error('Failed to create user');

      const newUser = await response.json();
      setUsers([...users, newUser]);
      toast.success('User created!');
      closeForm();
      fetchUsers();
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdate = async () => {
    if (!editingUser) return;

    try {
      const updateData = {
        email: formData.email,
        name: formData.name,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      if (formData.avatar) {
        updateData.avatar = formData.avatar;
      }

      const response = await fetch(`https://api.escuelajs.co/api/v1/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('Failed to update user');

      toast.success('User updated!');
      closeForm();
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const openCreateForm = () => {
    setEditingUser(null);
    setFormData({ email: '', name: '', password: '', avatar: '' });
    setEmailCheckResult(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      name: user.name,
      password: '',
      avatar: user.avatar,
    });
    setEmailCheckResult(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
    setEmailCheckResult(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={'Search users...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          {'Create User'}
        </Button>
      </div>

      <div className="rounded-lg border bg-white dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  {'User'}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  {'Role'}
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  {'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 dark:text-white">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEditForm(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={closeForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser
                ? 'Edit User'
                : 'Create User'}
            </DialogTitle>
            <DialogDescription>
              {'Fill in the user information below.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setEmailCheckResult(null);
                  }}
                  placeholder="user@example.com"
                  className="flex-1"
                />
                {!editingUser && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => checkEmailAvailability(formData.email)}
                  >
                    {'Check'}
                  </Button>
                )}
              </div>
              {emailCheckResult !== null && (
                <div
                  className={`mt-2 flex items-center gap-2 text-sm ${
                    emailCheckResult ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {emailCheckResult ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      {'Email available'}
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4" />
                      {'Email already exists'}
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="name">{'Name'}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={'User name'}
              />
            </div>

            <div>
              <Label htmlFor="password">
                {'Password'}
                {editingUser && (
                  <span className="ml-2 text-xs text-gray-500">
                    ({'leave empty to keep current'})
                  </span>
                )}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div>
              <Label htmlFor="avatar">
                {'Avatar URL'}
              </Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            {formData.avatar && (
              <div className="flex justify-center">
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={editingUser ? handleUpdate : handleCreate}
                className="flex-1"
                disabled={!editingUser && emailCheckResult === false}
              >
                {editingUser
                  ? 'Update'
                  : 'Create'}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                {'Cancel'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};