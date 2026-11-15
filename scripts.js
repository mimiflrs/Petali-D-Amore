// Fechas especiales del restaurante. Cada fecha se escribe como "mes-día".
const eventos = [
  { fecha: "01-01", tipo: "evento", titulo: "Año Nuevo", descripcion: "Comienza el año compartiendo una comida especial.", promocion: "Bebida sin alcohol de cortesía al ordenar dos platillos." },
  { fecha: "01-06", tipo: "evento", titulo: "Día de Reyes", descripcion: "Celebra esta fecha con un momento dulce.", promocion: "Pequeño postre de cortesía." },
  { fecha: "02-14", tipo: "promo", titulo: "San Valentín", descripcion: "Una cena especial para compartir en pareja.", promocion: "10% de descuento en la cuenta para dos personas." },
  { fecha: "03-08", tipo: "evento", titulo: "Día Internacional de la Mujer", descripcion: "Un día para celebrar y compartir.", promocion: "Bebida sin alcohol de cortesía." },
  { fecha: "03-21", tipo: "evento", titulo: "Bienvenida a la primavera", descripcion: "Disfruta los nuevos sabores de la temporada.", promocion: "Detalle dulce de la casa." },
  { fecha: "04-30", tipo: "evento", titulo: "Día del Niño", descripcion: "Una fecha para disfrutar en familia.", promocion: "Postre pequeño de cortesía para niñas y niños." },
  { fecha: "05-10", tipo: "promo", titulo: "Día de las Madres", descripcion: "Celebra a mamá con una comida especial.", promocion: "15% de descuento en el platillo de mamá." },
  { fecha: "05-15", tipo: "promo", titulo: "Día del Maestro", descripcion: "Un reconocimiento a quienes enseñan.", promocion: "Postre de cortesía mostrando credencial." },
  { fecha: "06-21", tipo: "evento", titulo: "Día del Padre", descripcion: "Comparte una mesa especial para celebrar a papá.", promocion: "10% de descuento en la cuenta familiar." },
  { fecha: "07-07", tipo: "evento", titulo: "Día del Chocolate", descripcion: "Un día para disfrutar algo dulce.", promocion: "Precio especial en postres seleccionados." },
  { fecha: "07-20", tipo: "evento", titulo: "Día de la Amistad", descripcion: "Reúne a tus amistades y disfruta el momento.", promocion: "Entrada para compartir en mesas de cuatro." },
  { fecha: "08-15", tipo: "evento", titulo: "Ferragosto italiano", descripcion: "Celebramos una tradición italiana con sabores de temporada.", promocion: "Platillo especial disponible por ese día." },
  { fecha: "09-16", tipo: "evento", titulo: "Fiestas patrias", descripcion: "Una celebración con ambiente festivo y sabor italiano.", promocion: "Entrada de cortesía al ordenar una pizza grande." },
  { fecha: "09-29", tipo: "promo", titulo: "Día para compartir", descripcion: "Disfruta una comida especial con alguien importante.", promocion: "10% de descuento en mesas para dos." },
  { fecha: "10-01", tipo: "evento", titulo: "Mes de la pasta", descripcion: "Comienza nuestro mes dedicado a uno de los clásicos italianos.", promocion: "Pasta del mes a precio especial." },
  { fecha: "10-31", tipo: "promo", titulo: "Halloween dolce", descripcion: "Una tarde divertida con un toque dulce.", promocion: "2x1 en postres seleccionados." },
  { fecha: "11-18", tipo: "evento", titulo: "Aniversario de Petali d'Amore", descripcion: "Celebramos un año más compartiendo buenos momentos.", promocion: "Descuento especial en platillos seleccionados." },
  { fecha: "11-28", tipo: "evento", titulo: "Día de amigos", descripcion: "Una buena ocasión para reunirse alrededor de la mesa.", promocion: "Entrada para compartir en grupos de cuatro." },
  { fecha: "12-24", tipo: "evento", titulo: "Nochebuena", descripcion: "Una velada para compartir con familia y amigos.", promocion: "Menú especial de temporada con reservación." },
  { fecha: "12-31", tipo: "evento", titulo: "Despedida de año", descripcion: "Despidamos el año con una cena deliciosa.", promocion: "Bebida sin alcohol de cortesía con el menú especial." }
];

const nombresMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const hoy = new Date();
let mesVisible = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
let fechaSeleccionada = "";

const rejilla = document.getElementById("rejilla-calendario");
const tituloMes = document.getElementById("mes-anio");
const tituloDetalle = document.getElementById("titulo-detalle");
const textoDetalle = document.getElementById("texto-detalle");
const listaEventos = document.getElementById("lista-eventos");

function formatoFecha(fecha) {
  return `${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

function dibujarCalendario() {
  const anio = mesVisible.getFullYear();
  const mes = mesVisible.getMonth();
  const primerDia = new Date(anio, mes, 1);
  const diasDelMes = new Date(anio, mes + 1, 0).getDate();
  const espaciosIniciales = (primerDia.getDay() + 6) % 7;

  tituloMes.textContent = `${nombresMeses[mes]} ${anio}`;
  rejilla.innerHTML = "";

  for (let i = 0; i < espaciosIniciales; i++) {
    const espacio = document.createElement("div");
    espacio.className = "dia-vacio";
    rejilla.appendChild(espacio);
  }

  for (let numeroDia = 1; numeroDia <= diasDelMes; numeroDia++) {
    const fecha = new Date(anio, mes, numeroDia);
    const clave = formatoFecha(fecha);
    const delDia = eventos.filter(evento => evento.fecha === clave);
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "dia";
    boton.textContent = numeroDia;
    boton.setAttribute("aria-label", `${numeroDia} de ${nombresMeses[mes]}`);

    if (fecha.toDateString() === hoy.toDateString()) boton.classList.add("hoy");
    if (clave === fechaSeleccionada) boton.classList.add("seleccionado");

    const marcas = document.createElement("span");
    marcas.className = "marcas";
    delDia.forEach(evento => {
      const marca = document.createElement("i");
      marca.className = `marca-dia ${evento.tipo === "promo" ? "promo" : ""}`;
      marcas.appendChild(marca);
    });
    boton.appendChild(marcas);

    boton.addEventListener("click", () => {
      fechaSeleccionada = clave;
      dibujarCalendario();
      mostrarDetalle(clave, numeroDia, mes);
    });
    rejilla.appendChild(boton);
  }
}

function mostrarDetalle(clave, dia, mes) {
  const delDia = eventos.filter(evento => evento.fecha === clave);
  tituloDetalle.textContent = `${dia} de ${nombresMeses[mes]}`;
  textoDetalle.textContent = delDia.length
    ? "Esto es lo que tenemos preparado para esta fecha:"
    : "No tenemos un evento especial registrado para este día, pero será un gusto recibirte.";
  listaEventos.innerHTML = "";

  if (delDia.length === 0) {
    const vacio = document.createElement("div");
    vacio.className = "estado-vacio";
    vacio.textContent = "No hay promociones especiales para esta fecha.";
    listaEventos.appendChild(vacio);
    return;
  }

  delDia.forEach(evento => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "evento-detalle";
    const etiqueta = document.createElement("span");
    etiqueta.className = `etiqueta ${evento.tipo === "promo" ? "promo" : ""}`;
    etiqueta.textContent = evento.tipo === "promo" ? "Promoción especial" : "Evento especial";
    const titulo = document.createElement("h3");
    titulo.textContent = evento.titulo;
    const descripcion = document.createElement("p");
    descripcion.textContent = evento.descripcion;
    const promocion = document.createElement("p");
    promocion.className = "texto-promocion";
    promocion.textContent = evento.promocion;
    tarjeta.append(etiqueta, titulo, descripcion, promocion);
    listaEventos.appendChild(tarjeta);
  });
}

document.getElementById("mes-anterior").addEventListener("click", () => {
  mesVisible.setMonth(mesVisible.getMonth() - 1);
  dibujarCalendario();
});

document.getElementById("mes-siguiente").addEventListener("click", () => {
  mesVisible.setMonth(mesVisible.getMonth() + 1);
  dibujarCalendario();
});

dibujarCalendario();
