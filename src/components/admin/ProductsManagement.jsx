import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/Dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Loader, Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';


export const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: [''],
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=50');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          price: parseInt(formData.price),
          description: formData.description,
          categoryId: parseInt(formData.categoryId),
          images: formData.images.filter((img) => img.trim() !== ''),
        }),
      });

      if (!response.ok) throw new Error('Failed to create product');

      const newProduct = await response.json();
      setProducts([newProduct, ...products]);
      toast.success('Product created!');
      closeForm();
      fetchProducts();
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products/${editingProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            price: parseInt(formData.price),
            description: formData.description,
            categoryId: parseInt(formData.categoryId),
            images: formData.images.filter((img) => img.trim() !== ''),
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to update product');

      toast.success('Product updated!');
      closeForm();
      fetchProducts();
    } catch (error) {
      toast.error(
        'Failed to update product'
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;

    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(products.filter((p) => p.id !== id));
      toast.success('Product deleted!');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      price: '',
      description: '',
      categoryId: '',
      images: [''],
    });
    setIsFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      categoryId: product.category.id.toString(),
      images: product.images.length > 0 ? product.images : [''],
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder={'Search products...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={openCreateForm}>
          <Plus className="mr-2 h-4 w-4" />
          {'Create Product'}
        </Button>
      </div>

      <div className="rounded-lg border bg-white dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  {'Product'}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  {'Price'}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  {'Category'}
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  {'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium dark:text-white">{product.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ID: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 dark:text-white">${product.price}</td>
                  <td className="px-4 py-3 dark:text-white">{product.category.name}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditForm(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={closeForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct
                ? 'Edit Product'
                : 'Create Product'
            }
            </DialogTitle>
            <DialogDescription>
              {'Fill in the product information below.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">{'Title'}</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={'Product title'}
              />
            </div>

            <div>
              <Label htmlFor="price">{'Price'}</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="99"
              />
            </div>

            <div>
              <Label htmlFor="description">
                {'Description'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={
                  'Product description'
                }
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="category">{'Category'}</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{'Images (URLs)'}</Label>
              {formData.images.map((img, index) => (
                <div key={index} className="mt-2 flex gap-2">
                  <Input
                    value={img}
                    onChange={(e) => {
                      const newImages = [...formData.images];
                      newImages[index] = e.target.value;
                      setFormData({ ...formData, images: newImages });
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  {index === formData.images.length - 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({ ...formData, images: [...formData.images, ''] })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={editingProduct ? handleUpdate : handleCreate}
                className="flex-1"
              >
                {editingProduct
                  ? 'Update'
                  : 'Create'
                }
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