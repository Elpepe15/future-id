// Isi dengan Project URL dan Publishable/anon key dari Supabase.
// Jangan pernah memasukkan service_role key ke file frontend.
window.FUTURE_SUPABASE_URL = "https://ngslnwmigmlenjjvyigs.supabase.co";
window.FUTURE_SUPABASE_ANON_KEY = "sb_publishable_YZ8z2uPb3DZoaUHVO1rG5Q_7fpTDClz";
window.futureSupabase = (window.supabase && window.FUTURE_SUPABASE_URL.startsWith("https://") && !window.FUTURE_SUPABASE_URL.includes("YOUR_"))
  ? window.supabase.createClient(window.FUTURE_SUPABASE_URL, window.FUTURE_SUPABASE_ANON_KEY)
  : null;
