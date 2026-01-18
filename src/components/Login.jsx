import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { Loader, LogIn } from 'lucide-react';
import { toast } from 'sonner';


export const Login = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Login successful!');
      //toast.success(language === 'en' ? 'Login successful!' : '¡Inicio de sesión exitoso!');
      onClose();
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {'Admin Login'}
          </DialogTitle>
          <DialogDescription>
            {'Enter your admin credentials to access the admin panel.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              {'Email'}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={'admin@example.com'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {'Password'}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="rounded-lg bg-blue-50 p-3 text-sm dark:bg-blue-950">
            <p className="font-semibold text-blue-900 dark:text-blue-100">
              {'Demo Credentials:'}
            </p>
            <p className="text-blue-700 dark:text-blue-300">Email: admin@mail.com</p>
            <p className="text-blue-700 dark:text-blue-300">Password: admin123</p>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {'Logging in...'}
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  {'Login'}
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              {'Cancel'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};