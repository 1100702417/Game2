const mockLandMetadata = {
  1: { building: 'House', trees: 2, water: false },
  2: { building: 'Building', trees: 1, water: false },
  3: { building: null, trees: 3, water: true },
  4: { building: 'House', trees: 0, water: false },
  5: { building: 'Skyscraper', trees: 2, water: false },
};

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('walletAddress').innerText = '👜 ' + accounts[0];
    } catch (err) {
      alert('⛔ การเชื่อมต่อถูกปฏิเสธ');
    }
  } else {
    alert('❗ กรุณาติดตั้ง MetaMask');
  }
}

function getBuildingIcon(type) {
  switch (type) {
    case 'House': return '🏠';
    case 'Building': return '🏢';
    case 'Skyscraper': return '🏙️';
    default: return '';
  }
}

function createGrid(count) {
  const grid = document.getElementById('mapGrid');
  grid.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';

    const meta = mockLandMetadata[i] || {};

    const content = document.createElement('div');
    content.className = 'tile-content';

    content.innerHTML = `
      <div class="tile-label">#${i}</div>
      ${meta.building ? `<div class="building">${getBuildingIcon(meta.building)}</div>` : ''}
      ${meta.trees ? `<div class="trees">${'🌳'.repeat(meta.trees)}</div>` : ''}
      ${meta.water ? `<div class="water">🌊</div>` : ''}
    `;

    tile.appendChild(content);
    tile.onclick = () => onTileClick(i, meta);
    grid.appendChild(tile);
  }
}

function onTileClick(index, meta) {
  alert(`แปลงที่ดิน #${index}\n🏗 สิ่งปลูกสร้าง: ${meta.building || 'ไม่มี'}\n🌳 จำนวนต้นไม้: ${meta.trees || 0}\n💧 น้ำ: ${meta.water ? 'มี' : 'ไม่มี'}`);
}

document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
createGrid(25);
