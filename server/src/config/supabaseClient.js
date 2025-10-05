import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";

// Use service key for full access (backend)
const supabase = createClient(
    process.env.SUPABASE_URL, 
    process.env.SUPABASE_SERVICE_KEY
);

export default supabase;
