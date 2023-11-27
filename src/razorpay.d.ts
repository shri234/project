// src/razorpay.d.ts

// Extend this interface according to Razorpay's API and the data you will be using.
interface RazorpayOptions {
    key: string;
    amount: string;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id?: string;
    handler: (response: any) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: {
      address?: string;
      [key: string]: string;
    };
    theme?: {
      color: string;
    };
  }
  
  interface Razorpay {
    open(): void;
  }
  
  declare global {
    interface Window {
      Razorpay: new (options: RazorpayOptions) => Razorpay;
    }
  }
  
  export {RazorpayOptions};
  