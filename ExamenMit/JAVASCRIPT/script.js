
const form = document.getElementById("taskForm");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");


document.addEventListener("DOMContentLoaded", mostrarTareas);

form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const titulo = document.getElementById("titulo").value;
    const fecha = document.getElementById("fecha").value;
    const prioridad = document.getElementById("prioridad").value;

    const nuevaTarea = {
        id: Date.now(), 
        titulo: titulo,
        fecha: fecha,
        prioridad: prioridad,
        completada: false
    };


    guardarTarea(nuevaTarea);
    mostrarTareas();
    form.reset();
    mostrarMensaje(" ¡Tarea añadida con éxito!");
});

function mostrarMensaje(texto) {
    mensaje.textContent = texto;
    setTimeout(() => mensaje.textContent = "", 1500);
}

function guardarTarea(tarea) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push(tarea); 
    localStorage.setItem("tareas", JSON.stringify(tareas)); 
}

function mostrarTareas() {
    lista.innerHTML = "";
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((t) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${t.titulo} - ${t.fecha} - <strong>${t.prioridad}</strong></span>
        `;
        lista.appendChild(li); 
    })
    ;
}

