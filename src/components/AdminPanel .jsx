import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
//import { ProductsManagement } from './admin/ProductsManagement';
//import { CategoriesManagement } from './admin/CategoriesManagement';
//import { UsersManagement } from './admin/UsersManagement';
import { Shield, X, LogOut } from 'lucide-react';


export const AdminPanel = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 flex w-full flex-col bg-white shadow-xl dark:bg-gray-900 sm:max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-linear-to-r from-blue-600 to-purple-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-xl font-semibold text-white">
                {'Admin Panel'}
              </h2>
              <p className="text-sm text-blue-100">
                {'Welcome, '} {user?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {'Logout'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="products">
                {'Products'}
              </TabsTrigger>
              <TabsTrigger value="categories">
                {'Categories'}
              </TabsTrigger>
              <TabsTrigger value="users">
                {'Users'}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="mt-6">
              {/*<ProductsManagement />*/}
              {'Aqui va el products management'}
            </TabsContent>

            <TabsContent value="categories" className="mt-6">
              {/*<CategoriesManagement />*/}
              {'Aqui va el categories management'}
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              {/*<UsersManagement />*/}
              {'Aqui va el users management'}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};