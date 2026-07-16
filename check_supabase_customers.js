require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabase() {
  console.log('--- SUPABASE CUSTOMERS ---');
  try {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (error) console.error(error);
    else console.log(JSON.stringify(customers, null, 2));
  } catch(e) {
    console.error(e);
  }
}

checkSupabase();
