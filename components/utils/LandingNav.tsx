"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingNav = () => {
  return (
    <>
      <div className="flex items-center gap-3">
        <Link href={"/sign-in"}>
          <Button variant="ghost" size="sm">
            Log in
          </Button>
        </Link>
        <Button
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Get Started
        </Button>
      </div>
    </>
  );
};

export default LandingNav;
