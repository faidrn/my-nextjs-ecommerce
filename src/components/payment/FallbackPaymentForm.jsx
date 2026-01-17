import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';


export const FallbackPaymentForm = ({
  totalAmount,
  onSubmit,
  onCancel,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    email: '',
  });

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ').substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formatted });
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 4);
    setFormData({ ...formData, cvv: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.cardNumber.replace(/\s/g, '').length === 16 &&
      formData.cardName.length > 0 &&
      formData.expiryDate.length === 5 &&
      formData.cvv.length >= 3 &&
      formData.email.includes('@')
    );
  };

  return (
    <div className="space-y-4">
      {/* Security Notice */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-green-600 dark:text-green-400" />
          <p className="text-xs text-green-800 dark:text-green-200">
            Secure checkout - Your payment info is encrypted
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm dark:text-white">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Card Number */}
        <div className="space-y-2">
          <Label htmlFor="cardNumber" className="text-sm dark:text-white">
            Card Number
          </Label>
          <div className="relative">
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              required
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white pr-10"
            />
            <CreditCard className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Card Name */}
        <div className="space-y-2">
          <Label htmlFor="cardName" className="text-sm dark:text-white">
            Cardholder Name
          </Label>
          <Input
            id="cardName"
            type="text"
            placeholder="John Doe"
            value={formData.cardName}
            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            required
            className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Expiry and CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry" className="text-sm dark:text-white">
              Expiry Date
            </Label>
            <Input
              id="expiry"
              type="text"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleExpiryChange}
              required
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv" className="text-sm dark:text-white">
              CVV
            </Label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={formData.cvv}
              onChange={handleCvvChange}
              required
              className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Total */}
        <div className="rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <span className="font-semibold dark:text-white">Total Amount:</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={!isFormValid() || isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Pay ${totalAmount.toFixed(2)}
              </>
            )}
          </Button>
        </div>

        {/* Demo Notice */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          🔒 This is a demo. No real charges will be made.
        </p>
      </form>
    </div>
  );
};
