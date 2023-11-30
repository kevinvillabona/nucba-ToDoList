const input = document.querySelector(".input-text")
const addForm = document.querySelector(".add-form")
const listaTareas = document.querySelector(".tasks-list")
const btnBorrar = document.querySelector(".deleteAll-btn")

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const guardarLS = (listaTareas) => {
    localStorage.setItem("tareas", JSON.stringify(listaTareas))
}

const crearTarea = (tarea) => {
    let agregarClase = ""
    tarea.checked == "checked" ? agregarClase = "checked-color" : "";
    return `<li class="${agregarClase}"><span>${tarea.name}</span><div><input type="checkbox" class="checkbox" ${tarea.checked} data-name="${tarea.name}"/><img class="delete-btn" src="./img/trash-can-danger.svg" alt="Botón de eliminación" data-name="${tarea.name}"></li></div>`
}

const renderlistaTareas = (todoList) => {
    listaTareas.innerHTML = todoList.map((tarea) => crearTarea(tarea)).join("")
}

const ocultarBtnBorrar = (listaTareas)=> {
    if(!listaTareas.length) {
        btnBorrar.classList.add("hidden");
        return;
    }
    btnBorrar.classList.remove("hidden")
}

const acciones = (listadoTareas) => {
    renderlistaTareas(listadoTareas)
    guardarLS(listadoTareas)
    ocultarBtnBorrar(listadoTareas)
}

const agregarTarea = (e) => {
    e.preventDefault();
    const tareaName = input.value.trim();

    if(!tareaName.length){
        alert("Es necesario ingresar una tarea.")
        return
    } else if (
        tareas.some((tarea) => {
            return tarea.name.toLowerCase() === tareaName.toLowerCase();
        })
    ) {
        alert("Esa tarea ya existe.")
        return
    }

    tareas = [...tareas, {name: tareaName, checked: ""}];
    input.value = "";
    acciones(tareas)
}

// const borrarTarea = (e) => {
//     if(!e.target.classList.contains("delete-btn")){
//         return;
//     }
//     const filterName = e.target.dataset.name;
//     tareas = tareas.filter((tarea) => tarea.name !== filterName)
//     acciones(tareas)
// }

const borrarTarea = (e) => {
    if (e.target.classList.contains("delete-btn")) {
        // Eliminar tarea
        const filterName = e.target.dataset.name;
        tareas = tareas.filter((tarea) => tarea.name !== filterName);
    } else if (e.target.type === "checkbox") {
        // Cambiar estado del checkbox
        const filterName = e.target.dataset.name;
        const tarea = tareas.find((tarea) => tarea.name === filterName);
        tarea.checked = e.target.checked ? "checked" : "";
    }
    acciones(tareas);
};

const borrarTodos = () => {
    tareas = [];
    acciones(tareas)
}

const finalizarTarea = (e) => {
    console.log(e)
}

const init = () => {
    ocultarBtnBorrar(tareas)
    renderlistaTareas(tareas)
    addForm.addEventListener("submit", agregarTarea)
    listaTareas.addEventListener("click", borrarTarea)
    btnBorrar.addEventListener("click", borrarTodos)
}

//Inicializar
init()