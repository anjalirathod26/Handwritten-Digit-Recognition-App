// static/script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let painting = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener('mousedown', () => painting = true);
canvas.addEventListener('mouseup', () => painting = false);
canvas.addEventListener('mousemove', draw);

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    document.getElementById("result").textContent = "None";
}

function predict() {
    const image = canvas.toDataURL('image/png');
    fetch('/predict', {
        method: 'POST',
        body: JSON.stringify({ image }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('result').textContent = data.prediction ?? "Error";
    })
    .catch(err => {
        console.error(err);
        document.getElementById('result').textContent = "Error";
    });
}

