// ================= SHARED CONFIG =================
// Centralized configuration for production readiness

// Supabase Configuration
const SUPABASE_URL = 'https://rthpqfyeazputmufqkwd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aHBxZnllYXpwdXRtdWZxa3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MjU2NDEsImV4cCI6MjA5MDIwMTY0MX0.j0XIfWSqyhnjA3q73hnoLbQOVpVJa_f8xPXb9EsgLGI';

// Paystack Configuration
const PAYSTACK_PUBLIC_KEY = 'pk_test_12df58e07e4fab48a969987ffe965bd683792a17';

// API Endpoints
const VERIFY_PAYMENT_URL = 'https://rthpqfyeazputmufqkwd.supabase.co/functions/v1/verify-payment';
const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';

// Initialize Supabase client (singleton pattern)
let supabaseClientInstance = null;

function getSupabaseClient() {
  if (!supabaseClientInstance) {
    supabaseClientInstance = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseClientInstance;
}

// Export for use in other files
window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.PAYSTACK_PUBLIC_KEY = PAYSTACK_PUBLIC_KEY;
window.VERIFY_PAYMENT_URL = VERIFY_PAYMENT_URL;
window.EXCHANGE_RATE_API = EXCHANGE_RATE_API;
window.getSupabaseClient = getSupabaseClient;

// For backward compatibility
window.supabaseClient = getSupabaseClient();
window.paystackKey = PAYSTACK_PUBLIC_KEY;
window.VERIFY_URL = VERIFY_PAYMENT_URL;