// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
});

// Toggle menu
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
toggle.onclick = () => nav.classList.toggle('active');

// Auto typing hanya di Home
const typingDiv = document.querySelector('.typing');
if (typingDiv) {
  const text = ["Script Bot WhatsApp 🚀", "Script Bot Telegram ⚡", "Free & Open Source 💚"];
  let idx = 0, char = 0;
  function typing() {
    if(char < text[idx].length) {
      typingDiv.innerHTML = text[idx].substring(0, char+1);
      char++;
      setTimeout(typing, 100);
    } else {
      setTimeout(() => {
        char = 0;
        idx = (idx+1) % text.length;
        typing();
      }, 2000);
    }
  }
  typing();
}
