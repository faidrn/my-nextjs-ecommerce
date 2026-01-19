import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { Loader, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';


export const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create category');

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      toast.success('Category created!');
      closeForm();
      fetchCategories();
    } catch (error) {
      toast.error('Failed to create category');
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${editingCategory.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error('Failed to update category');

      toast.success('Category updated!');
      closeForm();
      fetchCategories();
    } catch (error) {
      toast.error(
        'Failed to update category'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?'))
      return;

    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete category');

      setCategories(categories.filter((c) => c.id !== id));
      toast.success('Category deleted!');
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const openCreateForm = () => {
    setEditingCategory(null);
    setFormData({ name: '', image: '' });
    setIsFormOpen(true);
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      image: category.image,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

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
        <h3 className="text-lg font-semibold dark:text-white">
          {'Categories List'}
        </h3>
        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          {'Create Category'}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group relative overflow-hidden rounded-lg border bg-white p-4 transition-shadow hover:shadow-lg dark:bg-gray-950"
          >
            <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-gray-100">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h4 className="mb-2 font-semibold dark:text-white">{category.name}</h4>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">ID: {category.id}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => openEditForm(category)}
              >
                <Edit className="mr-2 h-3 w-3" />
                {'Edit'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(category.id)}
                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={closeForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory
                ? 'Edit Category'
                : 'Create Category'
            }
            </DialogTitle>
            <DialogDescription>
              {'Fill in the category information below.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">{'Name'}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={'Category name'}
              />
            </div>

            <div>
              <Label htmlFor="image">{'Image URL'}</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {formData.image && (
              <div className="rounded-lg border p-2">
                <p className="mb-2 text-sm font-medium dark:text-white">
                  {'Preview:'}
                </p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="h-32 w-full rounded object-cover"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={editingCategory ? handleUpdate : handleCreate}
                className="flex-1"
              >
                {editingCategory
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