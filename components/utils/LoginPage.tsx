"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { BASE_URL } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------------------
  // EMAIL + PASSWORD LOGIN
  // ------------------------------
  async function handleEmailLogin(e: any) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // The user is now authenticated
    const user = data.user;

//    await fetch(`/api/users/${user.id}`, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: JSON.stringify({
//        // whatever user data you want to insert
//      }),
//    });

    router.push(`${user.id}/dashboard`);
  }

  // ------------------------------
  // GOOGLE LOGIN
  // ------------------------------
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  // ------------------------------
  // GITHUB LOGIN
  // ------------------------------
  async function handleGitHubLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  // ------------------------------
  // UI
  // ------------------------------

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <BarChart3 className="size-8 text-accent" />
              <span className="text-xl font-semibold text-foreground">
                DashMetrics
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Don&apos;t have an account?
              </span>
              <Link href={"/sign-up"}>
                <Button variant="outline" size="sm">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 bg-card">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground text-balance">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground text-pretty">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-6">
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                className="bg-background border-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm text-accent">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-background border-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-accent-foreground"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* OAuth login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleGoogleLogin}>
                Google
              </Button>
              <Button variant="outline" onClick={handleGitHubLogin}>
                GitHub
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 DashMetrics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
