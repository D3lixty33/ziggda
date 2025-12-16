"use client";

import { createContext, useContext } from "react";

export const UserIdContext = createContext<string | null>(null);

export const useUserId = () => useContext(UserIdContext);
