"use client";

import { ReactNode } from "react";
import { UserIdContext } from "@/context/UserContext";

export function UserWrapper({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return <UserIdContext.Provider value={id}>{children}</UserIdContext.Provider>;
}
