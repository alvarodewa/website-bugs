function login() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  const msg = document.getElementById('loginMsg');
  if(u==='alvaro' && p==='andita') {
    document.getElementById('loginDiv').classList.add('hidden');
    document.getElementById('mainDiv').classList.remove('hidden');
  } else {
    msg.textContent = "Username atau password salah!";
  }
}

function logout() {
  document.getElementById('mainDiv').classList.add('hidden');
  document.getElementById('loginDiv').classList.remove('hidden');
  document.getElementById('targets').value = '';
  document.getElementById('simulasi').innerHTML = '';
}

function startSimulasi() {
  const targetsInput = document.getElementById('targets').value.trim();
  const metode = document.getElementById('metode').value;
  const simulasiDiv = document.getElementById('simulasi');
  simulasiDiv.innerHTML = '';

  if(!targetsInput) { alert('Masukkan nomor target!'); return; }

  const targets = targetsInput.split(',').map(t => t.trim());
  for(const t of targets) {
    if(!/^62\d+$/.test(t)) { alert('Nomor harus diawali 62 dan angka!'); return; }
  }

  targets.forEach(target=>{
    const container = document.createElement('div');
    container.textContent = `🔹 Countdown 3 detik...`;
    simulasiDiv.appendChild(container);

    let countdown = 3;
    const countdownInterval = setInterval(()=>{
      container.textContent = `🔹 Countdown ${countdown} detik sebelum mengirim bug ${metode} ke ${target}...`;
      countdown--;
      if(countdown<0){
        clearInterval(countdownInterval);
        startProgress(container,target,metode);
      }
    },1000);
  });
}

function startProgress(container,target,metode){
  container.textContent = `🔹 Mengirim bug metode ${metode} ke nomor ${target}...`;
  const progressContainer = document.createElement('div');
  progressContainer.className='progress-container';
  const progressBar = document.createElement('div');
  progressBar.className='progress-bar';
  progressContainer.appendChild(progressBar);
  container.appendChild(progressContainer);

  let progress = 0;
  const interval = setInterval(()=>{
    progress += Math.floor(Math.random()*10)+5;
    if(progress>100) progress=100;
    progressBar.style.width = progress+'%';

    if(Math.random()<0.1) container.style.transform=`translate(${Math.random()*5}px,${Math.random()*5}px)`;
    if(Math.random()<0.05) document.body.style.background=`rgb(0,${Math.floor(Math.random()*255)},0)`;

    if(progress>=100){
      clearInterval(interval);
      container.style.transform='translate(0,0)';
      document.body.style.background='#000';

      const msg = document.createElement('p');
      msg.className='success-msg';
      msg.textContent = `✅ Sukses kirim bug ke nomor ${target}`;
      container.appendChild(msg);

      const otw = document.createElement('p');
      otw.className='success-otw';
      otw.textContent = "C1 ABANGKU 🔥";
      container.appendChild(otw);

      const flash = document.getElementById('fullscreenFlash');
      flash.style.display='block';
      setTimeout(()=>flash.style.display='none',800);

      if(metode==='wifiLemot') container.innerHTML+=`\n📶 WiFi lemot parah!`;
      if(metode==='wifiHilang') container.innerHTML+=`\n📶 WiFi hilang!`;
      if(metode==='hapusWifi') container.innerHTML+=`\n📶 WiFi dihapus!`;
    }
  },200);
}

@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Share Tech Mono', monospace;
  background: #000;
  color: #00ff00;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: rgba(0,0,0,0.9);
  padding: 25px 35px;
  border-radius: 10px;
  width: 480px;
  border: 2px solid #00ff00;
  box-shadow: 0 0 40px #00ff00, 0 0 80px #0f0;
}

h3 {
  text-align: center;
  color: #0f0;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
}

p.author, p.support {
  text-align: center;
  font-size: 0.9em;
  color: #0f0;
}

input, select, button {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1em;
  font-family: 'Share Tech Mono', monospace;
}

input, select {
  background: #001100;
  color: #00ff00;
  border: 1px solid #0f0;
}

button {
  background: #003300;
  color: #00ff00;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #0f0;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px #0f0;
}

button:hover {
  background: #0f0;
  color: #000;
  box-shadow: 0 0 10px #0f0, 0 0 20px #0f0;
  transform: scale(1.05);
}

#simulasi {
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  font-size: 0.9em;
  line-height: 1.3em;
  white-space: pre-line;
  border: 1px solid #0f0;
  padding: 10px;
  border-radius: 5px;
  background: rgba(0,30,0,0.5);
}

.hidden { display: none; }

.progress-container { width: 100%; background-color: #001100; border-radius: 5px; margin: 5px 0; }
.progress-bar { width: 0%; height: 18px; border-radius: 5px; transition: width 0.2s; background: #0f0; }

#fullscreenFlash {
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,255,0,0.8);
  display: none; z-index: 999;
  font-size: 2.5em; color: #000; text-align: center;
  line-height: 100vh; animation: flashText 0.3s infinite alternate;
}

@keyframes flashText { 0% { opacity: 0.2; } 100% { opacity: 1; } }

.hint { font-size: 0.8em; color: #0f0; margin-top: -5px; margin-bottom: 10px; }
.success-msg { color: #00ff00; font-weight: bold; margin-top: 5px; text-shadow: 0 0 5px #0f0; }
.success-otw { color: #00ff00; font-weight: bold; font-size: 1em; margin-top: 5px; text-align: center; }
.glitch { color: #0f0; animation: glitchAnim 0.1s infinite alternate; text-shadow: 0 0 5px #0f0; }
@keyframes glitchAnim { 0% { transform: translate(0,0) } 50% { transform: translate(2px,-2px) } 100% { transform: translate(-2px,2px) } }

<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ROARSS TREDICT BY ALVARO</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
  <div id="loginDiv">
    <h3>ROARSS TREDICT</h3>
    <p class="author">Author: Alvaro7c</p>
    <p class="support">Support: Andita | Deiry | Best Support: Allah</p>
    <input type="text" id="username" placeholder="Username">
    <input type="password" id="password" placeholder="Password">
    <button onclick="login()">Login</button>
    <p id="loginMsg"></p>
  </div>

  <div id="mainDiv" class="hidden">
    <h3>METODE BUG WA</h3>
    <input type="text" id="targets" placeholder="EXAMPLE 628**">
    <p class="hint">MASUKAN NOMOR TARGET</p>
    <select id="metode">
      <option value="fcClick">FC Click</option>
      <option value="fcHard">FC Hard</option>
      <option value="iPhoneBlank">iPhone Blank</option>
      <option value="uiBlank">UI Blank</option>
      <option value="delay">Delay</option>
      <option value="delayHard">Delay Hard</option>
      <option value="wifiLemot">WiFi Lemot</option>
      <option value="wifiHilang">Hilang Sinyal</option>
      <option value="hapusWifi">Hapus WiFi</option>
    </select>
    <button onclick="startSimulasi()">Start</button>
    <button onclick="logout()">Logout</button>
    <button onclick="window.open('https://wa.me/6285177076149','_blank')">Developer Chat</button>
    <div id="simulasi"></div>
  </div>
</div>

<div id="fullscreenFlash">C1 ABANGKU 🔥</div>

<script src="script.js"></script>
</body>
</html>
