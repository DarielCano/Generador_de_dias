const d = document;

let $btnGenerar = d.querySelector(".btn-generator");
let $verDia = d.querySelector(".dia");
let $mostrarDia = d.querySelector(".day-container");

let dias = [];
let dia = 0;
dias = renderDia();
console.log(console.log(new Date()));

$btnGenerar.addEventListener("click", (e) => {
  dia = Math.floor(Math.random() * 365);

  if (dias.findIndex((d) => d == dia) == -1) {
    dias.push(dia);
    $verDia.textContent = dia;
    localStorage.setItem("dias", JSON.stringify(dias));
    renderDia();
  } else {
    $verDia.textContent = `ya salió el ${dia}. Volver a generar`;
  }
});

function renderDia() {
  let string = ``;
  let diasGenerados = !localStorage.getItem("dias")
    ? []
    : JSON.parse(localStorage.getItem("dias"));

  diasGenerados.forEach((dia) => {
    string += `<div class="dia-seleccionado">
          <h2>${dia}</h2>
          </div>`;
  });
  $mostrarDia.innerHTML = string;
  $verDia.textContent = diasGenerados[diasGenerados.length - 1];

  return diasGenerados;
}
