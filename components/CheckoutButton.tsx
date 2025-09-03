// "use client";

// import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

// export default function CheckoutButton({ amount, customer }:{amount: number, customer: {email: string, phone: string, name: string}}) {
//   const config = {
//     public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY, // set in .env.local
//     tx_ref: Date.now().toString(),
//     amount: amount,
//     currency: "USD", // or "SLL" for Sierra Leone
//     payment_options: "card,mobilemoney",
//     customer: {
//       email: customer.email,
//       phonenumber: customer.phone,
//       name: customer.name,
//     },
//     customizations: {
//       title: "My Printing Press",
//       description: "Payment for items in cart",
//       logo: "/logo.png",
//     },
//   };

//   const fwConfig = {
//     ...config,
//     text: "Pay Now",
//     callback: async(response) => {
//       console.log(response);
//       // Verify payment on backend (very important!)
//       const res = await fetch('/api/verify-payment', {
//         method: 'POST',
//         body: {transaction_id: response.id},
//       });
//       if(res.ok){
        
//       }else {}
//       closePaymentModal();
//     },
//     onClose: () => {},
//   };

//   return <FlutterWaveButton {...fwConfig} />;
// }


"use client";
import { CartItem } from "@/lib/contexts/CartContext";

type FlutterwaveCustomer = {
  email?: string;
  phonenumber?: string;
  name?: string;
};

type FlutterwaveCustomizations = {
  title?: string;
  description?: string;
  logo?: string;
};

type FlutterwaveCheckoutOptions = {
  public_key?: string;
  tx_ref: string;
  amount: number;
  currency?: string;
  payment_options?: string;
  customer?: FlutterwaveCustomer;
  customizations?: FlutterwaveCustomizations;
  callback: (response: FlutterwaveResponse) => void;
  onclose?: () => void;
};

type FlutterwaveResponse = {
  status?: string;
  transaction_id?: string;
  tx_ref?: string;
};

declare global {
  interface Window {
    FlutterwaveCheckout: (options: FlutterwaveCheckoutOptions) => void;
  }
}

type Customer = {
  email: string;
  phone: string;
  name: string;
};

// type CartItem = {
//   // Define the properties of a single cart item based on your application
//   id: string;
//   name: string;
//   price: number;
// };

type CheckoutButtonProps = {
  amount: number;
  customer: Customer;
  cartItems: CartItem[];
  isDisabled: boolean
};

export default function CheckoutButton({ amount, customer, cartItems, isDisabled }:CheckoutButtonProps) {
  const payWithFlutterwave = () => {
    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY,
      tx_ref: Date.now().toString(),
      amount: amount,
      currency: "USD",
      payment_options: "card,mobilemoney",
      customer: {
        email: customer.email,
        phonenumber: customer.phone,
        name: customer.name,
      },
      customizations: {
        title: "My Printing Press",
        description: "Payment for cart items",
        logo: "/logo.png",
      },
      callback: async function (response: FlutterwaveResponse) {
        // Send transaction ID to your backend for verification
        await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transaction_id: response.transaction_id,
            cartItems,
            customer,
          }),
        });
      },
      onclose: function () {
        console.log("Payment modal closed");
      },
    });
  };

  return (
    <>
      <button
        onClick={payWithFlutterwave}
        disabled={!isDisabled}
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
      >
        {!isDisabled ? "Pay Now" : "Loading..."}
      </button>
    </>
  );
}
