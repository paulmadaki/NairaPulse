// ================= CONFIG =================

// Supabase (ONLY public anon key here)
const supabase = supabasejs.createClient('rthpqfyeazputmufqkwd','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0aHBxZnllYXpwdXRtdWZxa3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MjU2NDEsImV4cCI6MjA5MDIwMTY0MX0.j0XIfWSqyhnjA3q73hnoLbQOVpVJa_f8xPXb9EsgLGI'); //supabase url, anon key

// Paystack PUBLIC key (safe on frontend)
const paystackKey = 'pk_test_12df58e07e4fab48a969987ffe965bd683792a17'; // 

// Your Supabase Edge Function URL
const VERIFY_URL = 'https://rthpqfyeazputmufqkwd.supabase.co/functions/v1/verify-payment'; //Make sure this is an Edge Function that verifies Paystack payments securely on the server side

// Default exchange rate
let rate = 1500;


// ================= UI HELPERS =================

function showSection(id){
  document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}


// ================= FETCH EXCHANGE RATE =================

async function fetchRate(){
  try{
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();

    rate = data.rates.NGN;

    document.getElementById('rate').innerText =
      '₦' + (rate * 2).toLocaleString();

  }catch{
    document.getElementById('rate').innerText = '₦3200';
  }
}

fetchRate();


// ================= GET FORM ELEMENTS =================

const form = document.getElementById('regForm');

if(form){

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    // Get form values safely
    const email = document.getElementById('email').value.trim();
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const address = document.getElementById('address').value.trim();

    if(!email || !fname || !lname){
      alert("Please fill all required fields");
      return;
    }

    const amount = rate * 2 * 100; // Paystack uses kobo

    PaystackPop.setup({
      key: paystackKey,
      email,
      amount,

      callback: async (response)=>{

        try{

          // Get referral code from URL
          const ref = new URLSearchParams(window.location.search).get('ref');

          const payload = {
            reference: response.reference,
            email,
            fname,
            lname,
            whatsapp,
            address,
            ref
          };

          const res = await fetch(VERIFY_URL,{
            method:'POST',
            headers:{ 'Content-Type':'application/json' },
            body: JSON.stringify(payload)
          });

          const data = await res.json();

          if(data.success){
            alert("Registration successful!");
            showSection('dashboard');
          }else{
            alert("Payment verification failed");
          }

        }catch(err){
          console.error(err);
          alert("Something went wrong");
        }
      }
    }).openIframe();
  });
}


// ================= LOAD GAME =================

function loadGame(){
  const frame = document.getElementById('game');
  frame.src = 'https://your-trivia-site.com';
  frame.classList.remove('hidden');
}


// ================= WITHDRAW =================

function withdraw(){
  alert('Withdrawal system coming next (will be secure)');
}