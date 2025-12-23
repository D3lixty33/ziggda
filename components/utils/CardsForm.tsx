"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { Button } from "../ui/button";
import { useUserId } from "@/context/UserContext";
import { CreditCardProp } from "@/lib/types";
import { CardFetch, CardUpdate } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";

export default function CardForm() {
  const user_id = useUserId();

  // Loaded user
  const [cardData, setCardData] = useState<CreditCardProp | null>(null);

  const [user, setUser] = useState("");
  const [cvv, setCvv] = useState(0);
  const [main_cd, setMainCd] = useState(0);
  const [exp_date, setExpDate] = useState<Date>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user_id) return;
    async function fetchData() {
      const res = await CardFetch(user_id);
      setCardData(res);
    }

    if (cardData) {
      return;
    } else {
      fetchData();
    }
  });

  useEffect(() => {
    if (!cardData) return;

    setUser(cardData.user ?? "");
    setCvv(cardData.cvv ?? "");
    setMainCd(cardData.main_cd ?? "");
    setExpDate(cardData.exp_date ?? "");
  }, [cardData]);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: Partial<CreditCardProp> = {
      user,
      cvv,
      main_cd,
      exp_date,
    };

    if (!formData) return;

    console.log(formData);
    // submit logic here

    try {
      await CardUpdate(user_id, formData);
      setSuccess(true);
    } catch (e: any) {
      console.log("Error calling the UserUpdate " + e.message);
      setError(true);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-md">
      <h1 className="text-xl mb-4">Card Settings</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>

        {/* CVV */}
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="text"
            placeholder="288"
            value={cvv}
            onChange={(e) => setCvv(e.target.valueAsNumber)}
            required
          />
        </div>

        {/* Main CD */}
        <div className="space-y-2">
          <Label htmlFor="address">Main Code</Label>
          <Input
            id="main_cd"
            type="text"
            placeholder="5888 2489 2870"
            value={main_cd}
            onChange={(e) => setMainCd(e.target.valueAsNumber)}
            required
          />
        </div>

        {/* Expiary Date */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Expiary Date</Label>
          <Input
            id="exp_date"
            type="datetime-local"
            placeholder="08/22"
            //value={exp_date}
            //onChange={(e) => setExpDate(e.target.valueAsDate)}
            required
          />
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            id="terms"
            type="checkbox"
            className="size-4 rounded border-input accent-accent"
            required
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{" "}
            <Link href="#" className="text-accent hover:text-accent/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-accent hover:text-accent/80">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button type="submit" className="w-full">
          Update card
        </Button>
      </form>
    </div>
  );
}
