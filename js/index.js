const d = document;

const day = new Date();
let $btnGenerar = d.querySelector(".btn-generator");
let $btnEliminar = d.querySelector(".btn-delete");
let $btnReiniciar = d.querySelector(".btn-delete-all");
let $verDia = d.querySelector(".dia");
let $mostrarDia = d.querySelector(".day-container");
let $dineroTotal = d.querySelector(".totalDias");
let $dineroAhorrado = d.querySelector(".totalDinero");

let dias = [];
let dia = 0;
$dineroTotal.textContent = !localStorage.getItem("total")
  ? ""
  : localStorage.getItem("total");
dias = renderDia();

$btnGenerar.addEventListener("click", (e) => {
  if (day.getDate() == localStorage.getItem("getDay")) {
    Swal.fire({
      title: "Error",
      text: "Ya se generó el dia de hoy, espera a manana. GRACIAS",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    dia = Math.floor(Math.random() * 365);

    if (dias.findIndex((d) => d == dia) == -1) {
      dias.push(dia);
      $verDia.textContent = dia;
      localStorage.setItem("dias", JSON.stringify(dias));
      localStorage.setItem("getDay", day.getDate());

      renderDia();
    } else {
      $verDia.textContent = `ya salió el ${dia}. Volver a generar`;
    }
  }
});

$btnEliminar.addEventListener("click", () => {
  if (dias.length > 0) {
    dias.pop();
    localStorage.setItem("dias", JSON.stringify(dias));
    localStorage.removeItem("getDay");
    renderDia();
  }
});

$btnReiniciar.addEventListener("click", () => {
  if (dias.length > 0) {
    dias.length = 0;
    localStorage.setItem("dias", JSON.stringify(dias));
    localStorage.removeItem("getDay");
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
  comprobarDia();
  $mostrarDia.innerHTML = string;
  $verDia.textContent = diasGenerados[diasGenerados.length - 1];

  const initialValue = 0;
  const sumWithInitial = diasGenerados.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  );
  $dineroAhorrado.textContent = sumWithInitial;

  return diasGenerados;
}

/* total de dinero recolectado */
function total() {
  let total = 0;
  for (let i = 1; i <= 365; i++) {
    total += i;
  }
  localStorage.setItem("total", total);
}
total();

function comprobarDia() {
  /* comprobar si ya el dia actual se genero dia */
  const day = new Date();
  if (
    !localStorage.getItem("getDay") ||
    day.getDate() != localStorage.getItem("getDay")
  ) {
    Swal.fire({
      text: "No ha generado el dia de hoy",
      title: "Información",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  }
}

function diaGenerado(e) {
  const day = new Date();
  if (
    localStorage.getItem("getDay") &&
    day.getDate() === localStorage.getItem("getDay")
  ) {
    e.preventDefault();
    Swal.fire({
      title: "Error",
      text: "Ya se generó el dia de hoy, espera a manana. GRACIAS",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}
