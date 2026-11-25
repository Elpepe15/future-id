const client = window.futureSupabase;
const msg = document.getElementById("auth-message");
function showMessage(text, error=false){ if(msg){msg.textContent=text;msg.className="message "+(error?"error":"success");}}
if(!client) showMessage("Supabase belum dikonfigurasi. Isi URL dan Publishable Key di assets/config.js.",true);
const loginForm=document.getElementById("login-form");
if(loginForm) loginForm.addEventListener("submit",async e=>{e.preventDefault();if(!client)return;const f=new FormData(loginForm);const {error}=await client.auth.signInWithPassword({email:f.get("email"),password:f.get("password")});if(error)showMessage(error.message,true);else location.href="dashboard.html";});
const registerForm=document.getElementById("register-form");
if(registerForm) registerForm.addEventListener("submit",async e=>{e.preventDefault();if(!client)return;const f=new FormData(registerForm);const {data,error}=await client.auth.signUp({email:f.get("email"),password:f.get("password"),options:{data:{full_name:f.get("full_name"),nis:f.get("nis")||null,role:"student"}}});if(error)showMessage(error.message,true);else if(data.session)location.href="dashboard.html";else showMessage("Pendaftaran berhasil. Periksa email untuk konfirmasi, lalu masuk.");});