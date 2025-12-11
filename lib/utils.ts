import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "./types";
import { createClient } from "@/utils/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = 'https://localhost:3000';

export async function UserFetch(id: string):Promise<User | null> {

  const supabase = createClient()

  const { data, error } = await supabase.from('user').select('*').eq('id', id);

  if (error) {
    console.log('Error fetching the user: ' + error.message)
    return null;
  }
  if (data.length <= 0){
    console.log('Data in empty - no user found');
  }
  
  const user: User = data?.[0];
  return user;
}
