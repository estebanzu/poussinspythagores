const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or ANON KEY not set – telemetry will be disabled');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
