const form = document.getElementById('contactForm');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const subjectEl = document.getElementById('subject');
const msgEl = document.getElementById('message');


const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const charCount = document.getElementById('charCount');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const formFeedback = document.getElementById('formFeedback');


// Email regex (practical client-side check)
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const forbidden = /[<>\\\"\'\$\{\}]/; // simple forbidden pattern for demonstration


// helpers
function showError(el, messageEl, text){
el.classList.add('input-invalid');
messageEl.textContent = text;
messageEl.style.display = 'block';
}
function clearError(el, messageEl){
el.classList.remove('input-invalid');
messageEl.style.display = 'none';
}


// live counters and small validations
msgEl.addEventListener('input', ()=>{
charCount.textContent = msgEl.value.length + ' / ' + msgEl.maxLength;
if(msgEl.value.trim().length >= 10) clearError(msgEl, messageError);
});


nameEl.addEventListener('input', ()=>{
if(nameEl.value.trim().length > 1 && !forbidden.test(nameEl.value)) clearError(nameEl, nameError);
});
emailEl.addEventListener('input', ()=>{
if(emailRegex.test(emailEl.value.trim())) clearError(emailEl, emailError);
});


// Reset behavior
resetBtn.addEventListener('click', ()=>{
form.reset();
[nameError,emailError,messageError].forEach(el=>el.style.display='none');
[nameEl,emailEl,msgEl].forEach(el=>el.classList.remove('input-invalid'));
charCount.textContent = '0 / ' + msgEl.maxLength;
formFeedback.classList.remove('show');
});


// Validate function
function validate(){
let ok = true;
const name = nameEl.value.trim();
const email = emailEl.value.trim();
const msg = msgEl.value.trim();


if(name === ''){ showError(nameEl, nameError, 'Name is required.'); ok = false; }
else if(name.length < 2){ showError(nameEl, nameError, 'Enter at least 2 characters.'); ok = false; }
else if(forbidden.test(name)){ showError(nameEl, nameError, 'Name contains invalid characters.'); ok = false; }
else clearError(nameEl, nameError);


if(email === ''){ showError(emailEl, emailError, 'Email is required.'); ok = false; }
else if(!emailRegex.test(email)){ showError(emailEl, emailError, 'Invalid email format.'); ok = false; }
else clearError(emailEl, emailError);


if(msg === ''){ showError(msgEl, messageError, 'Message is required.'); ok = false; }
else if(msg.length < 10){ showError(msgEl, messageError, 'Message must be at least 10 characters.'); ok = false; }
else if(forbidden.test(msg)){ showError(msgEl, messageError,