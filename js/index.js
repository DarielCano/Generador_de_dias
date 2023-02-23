const d = document;

let $btnGenerar = d.querySelector(".btn-generator");
let $btnEliminar = d.querySelector(".btn-delete");
let $btnReiniciar = d.querySelector(".btn-delete-all");
let $verDia = d.querySelector(".dia");
let $mostrarDia = d.querySelector(".day-container");

let dias = [];
let dia = 0;
dias = renderDia();

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

$btnEliminar.addEventListener("click", () => {
  if (dias.length > 0) {
    dias.pop();
    localStorage.setItem("dias", JSON.stringify(dias));
    renderDia();
  }
});

$btnReiniciar.addEventListener("click", () => {
  if (dias.length > 0) {
    dias.length = 0;
    localStorage.setItem("dias", JSON.stringify(dias));
    renderDia();
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
