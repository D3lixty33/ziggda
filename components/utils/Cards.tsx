"use client";

import React, { useState } from "react";

type CreditCardProps = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv?: string;
  cardType?: "visa" | "mastercard" | "amex";
  retro?: boolean;
};

export default function CreditCard({
  cardNumber,
  cardHolder,
  expiry,
  cvv = "123",
  cardType = "visa",
  retro = false, // mobbin-style default
}: CreditCardProps) {
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => setFlipped(!flipped);

  const frontBg = retro
    ? "bg-[#2d2d2d] text-[#f2f0e6]"
    : "bg-gradient-to-r from-[#6b5b95] to-[#feb236] text-white"; // subtle mobbin-style gradient
  const backBg = retro
    ? frontBg
    : "bg-gradient-to-r from-[#feb236] to-[#d64161] text-white"; // slight color difference

  return (
    <div
      className="w-85 h-48 cursor-pointer perspective"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""
          }`}
      >
        {/* Front */}
        <div
          className={`absolute w-full h-full rounded-xl shadow-lg p-6 ${frontBg} backface-hidden border border-white/10`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex justify-between items-start">
            <div className="text-sm opacity-60 uppercase tracking-wider">
              {cardType.toUpperCase()}
            </div>
            {/* subtle glow circle */}
            <div className="w-8 h-8 bg-white/20 rounded-full" />
          </div>

          <div className="mt-10 text-xl font-mono tracking-widest drop-shadow-sm">
            {cardNumber.replace(/(.{4})/g, "$1 ")}
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex justify-between text-sm">
            <div>
              <div className="uppercase text-xs opacity-70">Card Holder</div>
              <div className="font-medium">{cardHolder}</div>
            </div>
            <div className="text-right">
              <div className="uppercase text-xs opacity-70">Expires</div>
              <div className="font-medium">{expiry}</div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute w-full h-full rounded-xl shadow-lg p-6 ${backBg} rotate-y-180 backface-hidden border border-white/10`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Magnetic strip */}
          <div className="bg-black h-10 w-full mt-4 mb-6 rounded-sm opacity-80"></div>

          {/* Signature + CVV */}
          <div className="flex justify-end items-center gap-4 pr-4">
            <div className="bg-white h-6 w-24 flex justify-center items-center text-black text-sm font-mono rounded-sm">
              {cvv}
            </div>
          </div>

          {/* Branding / subtle logo */}
          <div className="absolute bottom-4 right-6 text-xs opacity-50">
            {cardType.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
}
