"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserId } from "@/context/UserContext";
import { UserFetch, UserUpdate } from "@/lib/utils";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AccountRender() {
  const id = useUserId();

  // Loaded user
  const [userData, setUserData] = useState<User | null>(null);

  // Form state (single source of truth)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState<number | "">("");

  /* ---------------- Fetch user ---------------- */
  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const res = await UserFetch(id);
      setUserData(res);
    }

    fetchData();
  }, [id]);

  /* ---------------- Hydrate form ---------------- */
  useEffect(() => {
    if (!userData) return;

    setName(userData.name ?? "");
    setEmail(userData.email ?? "");
    setAddress(userData.address ?? "");
    setPhone(userData.phoneNumber ?? "");
  }, [userData]);

  /* ---------------- Submit ---------------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) return;

    const data: Partial<User> = {
      name,
      email,
      address,
      //phoneNumber: phone === "" ? null : phone,
    };

    await UserUpdate(id, data);
  }

  return (
    <div className="p-8 flex w-full h-full gap-6">
      <div className="flex flex-col w-full max-w-md">
        <h1 className="text-xl mb-4">Account settings</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              placeholder="Street, City, Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+39 339 802 5512"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              id="terms"
              name="terms"
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
            Update account
          </Button>
        </form>
      </div>
    </div>
  );
}
