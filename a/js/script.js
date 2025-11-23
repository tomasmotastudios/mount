// Atualiza todos os elementos com a classe 'year'
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

//
// Header
fetch("a/h/index.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header-mount").innerHTML = data;
  

    const script = document.createElement("script");
    script.src = "assets/header/script.js";
    document.body.appendChild(script);
  });
