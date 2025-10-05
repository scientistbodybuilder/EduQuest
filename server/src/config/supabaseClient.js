import { createClient } from "@supabase/supabase-js";

// Use service key for full access (backend)
console.log('url: ',process.env.SUPABASE_URL)
console.log('key: ',process.env.SUPABASE_SERVICE_KEY)
export const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_KEY
);

// export default supabase;