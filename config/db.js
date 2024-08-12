import dotenv from 'dotenv';

dotenv.config();

// supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPA_URL;
const supabaseKey = process.env.SUPA_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
;

