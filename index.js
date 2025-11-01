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
