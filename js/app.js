const board = document.getElementById('board');
const info = document.getElementById('info');
let walletAddress = null;

// สร้างกระดาน 20 ช่องบนวงกลม
const positions = [];
for (let i=0; i<20; i++){
  const angle = (i/20)*2*Math.PI - Math.PI/2;
  const x = 170 + Math.cos(angle)*150;
  const y = 170 + Math.sin(angle)*150;
  positions.push({x,y});
  const sq = document.createElement('div');
  sq.className='square';
  sq.style.left = `${x}px`; sq.style.top = `${y}px`;
  sq.innerText = i+1;
  board.appendChild(sq);
}

// token ผู้เล่น
const token = document.createElement('div');
token.className='token';
board.appendChild(token);
let posIndex = 0;
moveToken(0);

// mock ownership
const plots = Array(20).fill(null);

// Connect MetaMask ปลอม
document.getElementById('connectBtn').onclick = async () => {
  info.innerText = 'เชื่อม MetaMask สำเร็จ (placeholder)';
  walletAddress = '0xUSER';
};

// ทอยลูกเต๋าและเดิน
document.getElementById('rollBtn').onclick = async () => {
  if (!walletAddress) {
    alert('เชื่อม MetaMask ก่อน');
    return;
  }
  const roll = Math.floor(Math.random()*6)+1;
  info.innerText = `ทอยได้ ${roll}`;
  posIndex = (posIndex + roll) % 20;
  moveToken(posIndex);
  await checkPlot();
};

function moveToken(idx) {
  const p = positions[idx];
  token.style.left = `${p.x+20}px`;
  token.style.top = `${p.y+20}px`;
}

async function checkPlot(){
  const owner = plots[posIndex];
  if (!owner) {
    if(confirm('ยังไม่มีเจ้าของ ต้องการซื้อที่ดินหรือไม่?')) {
      plots[posIndex] = walletAddress;
      info.innerText = `คุณซื้อแปลง #${posIndex+1} แล้ว`;
    }
  } else {
    info.innerText = `แปลงนี้เป็นของ ${owner}`;
  }
}
