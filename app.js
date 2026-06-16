// app.js — interactivity: theme toggle, send logic, card tilt and confetti

const jokes = [
  'Tu legend hai... bas tera WiFi slow hai 😭',
  'Life set hoti... agar tu thoda serious hota 🤡',
  'Crush tujhe dekh ke offline ho jati hai 😂',
  'Tu developer hai ya bug generator? 🐛',
  'Salary nahi, sirf experience mil raha hai 😭',
  'Tera code chal gaya? Screenshot bhej warna jhooth hai 😏',
  'Tu gym gaya tha ya attendance mark karke aa gaya? 😆',
  'Tera future bright hai... bas light ka bill bhar de 💡',
  'Error 404: Teri motivation not found 🤡',
  'Tu smart hai... bas system hang ho jata hai kabhi kabhi 😭',
  'Tera luck bhi buffering me chal raha hai ⏳',
  'Tu plan banata achha hai... execute kab karega? 😂',
  'Teri life ek open tab jaisi hai — kabhi close hi nahi hoti 😆',
  'Tu padhai karta hai ya sirf highlighter use karta hai? 🤓',
  'Tera crush tujhe dekh ke airplane mode laga deta hai ✈️😂'
];

const el = (sel) => document.querySelector(sel);
const sendBtn = el('#sendBtn');
const input = el('#userInput');
const result = el('#result');
const cards = document.querySelectorAll('.card');
const themeToggle = el('#themeToggle');
const confettiCanvas = el('#confetti');

// Theme toggle
function setTheme(isLight){
  if(isLight){
    document.documentElement.classList.add('light');
    localStorage.setItem('light', '1');
  } else {
    document.documentElement.classList.remove('light');
    localStorage.removeItem('light');
  }
}

themeToggle.addEventListener('click', ()=>{
  const isLight = document.documentElement.classList.toggle('light');
  setTheme(isLight);
});

// restore theme
if(localStorage.getItem('light')) setTheme(true);

// Send handler
function pickReply(text){
  // simple mapping: if user mentions "sad" get motivational
  const lowered = text.toLowerCase();
  if(/sad|depressed|alone|tired/.test(lowered)) return 'Keep going — even small steps matter. 🔥';
  if(/love|crush|date|heart/.test(lowered)) return 'Keep it cool — send a funny meme first. 😏';
  if(/bug|error|fix/.test(lowered)) return 'Have you tried turning it off and on again? 🤖';
  // otherwise random
  return jokes[Math.floor(Math.random()*jokes.length)];
}

function showResult(text){
  result.innerHTML = `<div class="res-text">${text}</div>`;
  result.classList.add('show');
  pop()
}

function pop(){
  // tiny scale pop
  result.animate([{transform:'scale(.98)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:320,easing:'cubic-bezier(.2,.86,.2,1)'});
}

sendBtn.addEventListener('click', ()=>{
  const v = input.value.trim();
  if(!v) {
    // subtle shake
    input.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:360});
    return;
  }
  const reply = pickReply(v);
  showResult(`<strong>TL:</strong> ${reply}`);
  triggerConfetti();
});

input.addEventListener('keydown',(e)=>{ if(e.key==='Enter') sendBtn.click(); });

// Card tilt effect
cards.forEach(card=>{
  card.addEventListener('mousemove', (ev)=>{
    const rect = card.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${ -y * 6 }deg) rotateY(${ x * 10 }deg)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform=''; });
  card.addEventListener('click', ()=>{
    const emoji = card.dataset.emoji || '✨';
    showResult(`${emoji} ${pickReply(card.querySelector('h3').innerText)} `);
    triggerConfetti();
  });
});

// simple confetti
function triggerConfetti(){
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = innerWidth; confettiCanvas.height = innerHeight;
  const pieces = [];
  const colors = ['#7c5cff','#00d4ff','#ffd166','#ff6b6b','#6bcB77'.toLowerCase()];
  for(let i=0;i<80;i++){
    pieces.push({x:Math.random()*confettiCanvas.width,y:Math.random()*-confettiCanvas.height,vy:2+Math.random()*4, size:4+Math.random()*8, color:colors[Math.floor(Math.random()*colors.length)], r:Math.random()*360});
  }
  let t=0;
  function loop(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    pieces.forEach(p=>{
      p.y += p.vy; p.r += 6;
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.r*Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size*0.6);
      ctx.restore();
    });
    t+=1;
    if(t<120) requestAnimationFrame(loop);
    else ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  }
  loop();
}

// small accessibility: focus send on load
input.focus();
