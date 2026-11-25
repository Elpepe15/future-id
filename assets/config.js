// Isi dengan Project URL dan Publishable/anon key dari Supabase.
// Jangan pernah memasukkan service_role key ke file frontend.
window.FUTURE_SUPABASE_URL = "https://fxlpathsaquicvtyojzi.supabase.co";
window.FUTURE_SUPABASE_ANON_KEY = "sb_publishable_CH6dp4KU_-t7fYDqqg2Fuw_Qt61H2sZ";
window.futureSupabase = (window.supabase && window.FUTURE_SUPABASE_URL.startsWith("https://") && !window.FUTURE_SUPABASE_URL.includes("YOUR_"))
  ? window.supabase.createClient(window.FUTURE_SUPABASE_URL, window.FUTURE_SUPABASE_ANON_KEY)
  : null;
