const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const buttonsWrapper = document.querySelector(".buttons");

let noClicks = 0;

// กันไม่ให้กด No ด้วยคีย์บอร์ด / เมาส์ / ทัช
function blockNoClick(e) {
  e.preventDefault();
  e.stopPropagation();
}

noBtn.addEventListener("click", blockNoClick);
noBtn.addEventListener("mousedown", blockNoClick);
noBtn.addEventListener("touchstart", blockNoClick, { passive: false });
noBtn.addEventListener("keydown", blockNoClick);

function moveNoButtonFromPoint(x, y) {
  const rect = noBtn.getBoundingClientRect();

  const distance = Math.hypot(
    x - (rect.left + rect.width / 2),
    y - (rect.top + rect.height / 2)
  );

  // ถ้าเคอร์เซอร์/นิ้วเข้าใกล้เกิน 80px ให้กระโดดหนี
  if (distance < 80) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const maxLeft = viewportWidth - rect.width - 16;
    const maxTop = viewportHeight - rect.height - 16;

    const randomLeft = Math.random() * maxLeft;
    const randomTop = Math.random() * maxTop;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomLeft}px`;
    noBtn.style.top = `${randomTop}px`;

    noClicks++;
    if (noClicks === 1) {
      message.textContent = "ห้ามกด No น้าา พี่เสียใจจริงๆ 😭";
    } else if (noClicks === 2) {
      message.textContent = "ใจอ่อนให้พี่หน่อยนะค้าบ 💘";
    } else if (noClicks > 2) {
      message.textContent = "เอ้าาาา กด Yes เถอะ 😳";
    }
  }
}

function handleMouseMove(ev) {
  moveNoButtonFromPoint(ev.clientX, ev.clientY);
}

function handleTouchMove(ev) {
  // ใช้นิ้วจุดแรกสุดในการเช็กระยะ
  const touch = ev.touches[0];
  if (!touch) return;
  moveNoButtonFromPoint(touch.clientX, touch.clientY);
}

// ฟังการขยับเมาส์รอบ ๆ ปุ่ม (คอมพ์)
document.addEventListener("mousemove", handleMouseMove);
// ฟังการเลื่อนนิ้วรอบ ๆ ปุ่ม (มือถือ/แท็บเล็ต)
document.addEventListener("touchmove", handleTouchMove, { passive: false });

yesBtn.addEventListener("click", () => {
  message.textContent = "เย้! ขอบคุณที่ยกโทษให้พี่นะ 💖";
  yesBtn.textContent = "กอดดด 🤗";
  noBtn.style.display = "none";
});

