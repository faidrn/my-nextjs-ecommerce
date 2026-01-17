"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/Alert";

export const PaymentSupport = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    isSupported: false,
    canMakePayment: null,
    message: "",
  });

  useEffect(() => {
    checkPaymentSupport();
  }, []);

  const checkPaymentSupport = async () => {
    if (!window.PaymentRequest) {
      setPaymentInfo({
        isSupported: false,
        canMakePayment: false,
        message: "Payment Request API is not supported in this browser.",
      });
      return;
    }

    try {
      const testMethods = [
        {
          supportedMethods: "basic-card",
        },
      ];

      const testDetails = {
        total: {
          label: "Test",
          amount: { currency: "USD", value: "0.00" },
        },
      };

      const request = new PaymentRequest(testMethods, testDetails);
      const canMakePayment = await request.canMakePayment();

      setPaymentInfo({
        isSupported: true,
        canMakePayment,
        message: canMakePayment
          ? "Payment methods are available and ready to use."
          : "No payment methods configured. Please add a payment method to your browser.",
      });
    } catch (error) {
      setPaymentInfo({
        isSupported: true,
        canMakePayment: false,
        message: "Unable to determine payment capabilities.",
      });
    }
  };

  return (
    <Alert className="mb-4">
      <div className="flex items-start gap-3">
        {paymentInfo.isSupported ? (
          paymentInfo.canMakePayment ? (
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : (
            <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          )
        ) : (
          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
        )}

        <div className="flex-1">
          <AlertDescription className="text-sm">
            <strong className="font-medium">Payment Status:</strong>{" "}
            {paymentInfo.message}
          </AlertDescription>

          {!paymentInfo.isSupported && (
            <AlertDescription className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Supported browsers: Chrome 60+, Edge 79+, Safari 11.1+
            </AlertDescription>
          )}
        </div>
      </div>
    </Alert>
  );
};

export const PaymentInfoCard = () => {
  return (
    <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950/30">
      <div className="flex items-center gap-2">
        <CreditCard className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
        <div className="flex-1">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            Secure browser payment with saved cards & digital wallets
          </p>
        </div>
      </div>
    </div>
  );
};
