const canvas = document.getElementById("roulette");
const ctx = canvas.getContext("2d");
const spinButton = document.getElementById("spinButton");

const segments = ["💰 100$", "🍀 +1 попытка", "🔥 0$", "🎁 Сюрприз", "💎 500$", "❌ Пропуск"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#E74C3C"];

let startAngle = 0;
const arc = Math.PI / (segments.length / 2);
let spinAngle = 0;
let spinning = false;

// Рисуем рулетку
function drawRoulette() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;

    for (let i = 0; i < segments.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
        ctx.lineTo(centerX, centerY);
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.save();

        ctx.fillStyle = "black";
        ctx.translate(centerX + Math.cos(angle + arc / 2) * radius * 0.7, centerY + Math.sin(angle + arc / 2) * radius * 0.7);
        ctx.rotate(angle + arc / 2);
        ctx.fillText(segments[i], -ctx.measureText(segments[i]).width / 2, 0);
        ctx.restore();
    }
}

// Функция кручения рулетки
function spin() {
    if (spinning) return;
    spinning = true;
    let spinTime = Math.random() * 3000 + 2000;
    let rotation = Math.random() * 360 + 360 * 5;

    let start = null;
    function animate(time) {
        if (!start) start = time;
        let progress = time - start;
        let angle = rotation * (progress / spinTime);
        spinAngle = angle % 360;
        startAngle = (Math.PI / 180) * spinAngle;
        drawRoulette();

        if (progress < spinTime) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            let segment = Math.floor((segments.length - (spinAngle / 360) * segments.length) % segments.length);
            alert("Ты выиграл: " + segments[segment]);
        }
    }

    requestAnimationFrame(animate);
}

spinButton.addEventListener("click", spin);
drawRoulette();
