// Loading
window.addEventListener("load", () => {
  document.getElementById("loading").style.display = "none";
});

// Navbar toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Typed.js
new Typed("#typing", {
  strings: ["Welcome to Zerone Script", "Free Bot Script Update", "Join Grup & Subscribe ❤️"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true
});

// Load scripts.json
let allScripts = [];
fetch("/scripts.json")
  .then(res => res.json())
  .then(data => {
    allScripts = data;
    renderScripts(data);

    // Cek URL query
    const params = new URLSearchParams(window.location.search);
    if(params.has("id")){
      showDetail(params.get("id"));
    }
  });

function renderScripts(data){
  const container = document.getElementById("script-list");
  container.innerHTML = "";
  data.forEach(script => {
    const card = document.createElement("div");
    card.className = "script-card";
    card.innerHTML = `
      <img src="${script.thumbnail}" alt="script">
      <h3>${script.name}</h3>
      <p>${script.desc}</p>
      <button onclick="showDetail('${script.id}')">Lihat Detail</button>
    `;
    container.appendChild(card);
  });
}

// Show detail
function showDetail(id){
  const script = allScripts.find(s => s.id == id);
  if(!script) return;

  document.getElementById("scripts").classList.add("hidden");
  document.getElementById("script-detail").classList.remove("hidden");
  document.getElementById("detail-content").innerHTML = `
    <h2>${script.name}</h2>
    <img src="${script.thumbnail}" alt="">
    <p>${script.desc}</p>
    <button onclick="verifyDownload('${script.link}')">Download</button>
  `;

  // Update URL tanpa reload
  history.pushState({id:id}, "", "?id=" + id);
}

// Back
function goBack(){
  document.getElementById("scripts").classList.remove("hidden");
  document.getElementById("script-detail").classList.add("hidden");
  history.pushState({}, "", "/");
}

// Verify join
function verifyDownload(link){
  let confirmJoin = confirm("Sudah Join Grup & Subscribe Channel YT?");
  if(confirmJoin){
    window.open(link, "_blank");
  }else{
    alert("Harap join grup & subscribe dulu!");
  }
}

// Handle back/forward browser
window.onpopstate = function(e){
  if(e.state && e.state.id){
    showDetail(e.state.id);
  } else {
    goBack();
  }
}
