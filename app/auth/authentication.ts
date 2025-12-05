import { createClient } from "@/utils/supabase/client";

const handleAuth = async() => {
    const supabase = createClient();

    const { data, error } = supabase.auth.getClaims()
}