"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserId } from "@/context/UserContext";
import { UserFetch, UserUpdate } from "@/lib/utils";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";
import CardForm from "@/components/utils/CardsForm";

export default function AccountRender() {
  const id = useUserId();

  // Loaded user
  const [userData, setUserData] = useState<User | null>(null);

  // Form state (single source of truth)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState<number | "">("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  /* ---------------- Fetch user ---------------- */
  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      const res = await UserFetch(id);
      setUserData(res);
    }

    if (userData) {
      return;
    } else {
      fetchData();
    }
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
    try {
      await UserUpdate(id, data);
      setSuccess(true);
    } catch (e: any) {
      console.log("Error calling the UserUpdate" + e.message);
      setError(true);
    }
  }

  return (
    <div className="p-8 flex w-full h-full gap-32 max-[1281px]:flex-col max-[1281px]:ml-28">
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

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSuccess(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-background p-6 shadow-xl animate-in fade-in zoom-in">
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                ✓
              </div>

              <h2 className="text-lg font-semibold">Account updated</h2>
              <p className="text-sm text-muted-foreground">
                Your account information has been saved successfully.
              </p>

              <Button className="mt-2 w-full" onClick={() => setSuccess(false)}>
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setError(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm rounded-xl bg-background p-6 shadow-xl animate-in fade-in zoom-in">
            <div className="flex flex-col items-center gap-4 text-center">
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                !
              </div>

              <h2 className="text-lg font-semibold">Update failed</h2>

              <p className="text-sm text-muted-foreground">{error}</p>

              <Button
                variant="destructive"
                className="mt-2 w-full"
                onClick={() => setError(false)}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-auto">
        <CardForm />
      </div>
    </div>
  );
}
