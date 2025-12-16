import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { User } from "./types";
import { createClient } from "@/utils/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = 'https://localhost:3000';

export async function UserFetch(id: string | null):Promise<User | null> {

  const supabase = createClient()

  const { data, error } = await supabase.from('users').select('*').eq('id', id);

  if (error) {
    console.log('Error fetching the user: ' + error.message)
    console.log('Id value: ' + id)
    return null;
  }
  if (data.length <= 0){
    console.log('Data in empty - no user found');
  }
  
  const user: User = data?.[0];
  return user;
}

export async function UserUpdate(
  id: string | null,
  formData: Partial<User>
): Promise<User> {
  if (!id) throw new Error("User ID is required");
  if (!formData || Object.keys(formData).length === 0)
    throw new Error("The form passed to API is empty");

  const supabase = createClient();

  const { error: updateError } = await supabase
    .from('users')
    .update(formData)
    .eq('id', id);

  if (updateError) throw updateError;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}





