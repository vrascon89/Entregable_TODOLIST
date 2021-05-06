let tareas = document.querySelector('#tareas');
let dataIdTarea = 0;

const printTareas = function (pListaTareas) { 
    
    tareas.innerHTML = '';
    

    for (let tarea of pListaTareas) {    

        dataIdTarea++;
        tareas.innerHTML +=
        `<article class="${tarea.prioridad}" data-id='${dataIdTarea}'>
        
        <h1>${tarea.titulo}</h1>   <button id="btn-eliminar">ELIMINAR</button>
    
        </article>` ;
        llamarBotones()
  
    };
    
};

printTareas(listaTareas);





//FILTRAR TAREAS POR PRIORIDAD//


function filtrarPorPrioridad(pPrioridad, pListaTareas) {

    const listaFiltrada = pListaTareas.filter((tarea) => {return tarea.prioridad == pPrioridad})

    return listaFiltrada;
};



let selectPrioridad = document.querySelector('#filtrar-prioridad');
selectPrioridad.addEventListener('change', getPrioridad);

function getPrioridad(event) { 

    let prioridad = event.target.value;
  

    if (prioridad != "") {

        let lista = filtrarPorPrioridad(prioridad, listaTareas);
        printTareas(lista);     
        
    } else {

        printTareas(listaTareas)
        
    }
};


//MOSTRAR TAREA ESCRIBIENDO//

let inputBuscarTarea = document.querySelector('#buscar-tarea');
inputBuscarTarea.addEventListener('keyup', getBuscarData);

function getBuscarData(event) { 

    if (event.type == 'keyup') {

        let palabraBuscar = inputBuscarTarea.value;

        let listaPorTeclado = searchByWord(palabraBuscar, listaTareas)
        printTareas(listaPorTeclado);
        
    }
};



function searchByWord(pLetra, pListaTareas) { 

    const filtrarPorTeclado = pListaTareas.filter(tarea => {
        return tarea.titulo.toLowerCase().includes(pLetra.toLowerCase());
    })

    return filtrarPorTeclado;
};





//ANADIR TAREAS//


const inputIntroduceTarea = document.querySelector('#introduce-tarea');
const btnGuardar = document.querySelector('#btn-guardar');
const alert = document.querySelector('#alert');
let SelectSeleccionarPrioridad = document.querySelector('#seleccionar-prioridad')


btnGuardar.addEventListener('click', getDataForm);

function getDataForm(event) {
    
    event.preventDefault();

    const tituloTarea = inputIntroduceTarea.value;
    const prioridadTarea = SelectSeleccionarPrioridad.value;

    if (tituloTarea != "" && prioridadTarea != "") {

        let color = '';
        alert.style.display = 'none';


        switch (prioridadTarea) {

            case 'urgente':
                color = ' rgb(209, 28, 28)';
    
                
                break;
            
            case 'diaria':
                color = 'rgb(35, 35, 209)';
                    
                break;
            
            case 'optativo':
                color = 'rgb(18, 131, 18)';
                    
                break;
        }

        dataIdTarea++;
        tareas.innerHTML +=
        `<article style="color:${color}" data-id='${dataIdTarea}'>
        
        <h1>${tituloTarea}</h1>  <button id="btn-eliminar">ELIMINAR</button>
       
    
        </article>` ;

        llamarBotones()

        const json = {

            idTarea: dataIdTarea,
            titulo: tituloTarea,
            prioridad: prioridadTarea,
        };

        listaTareas.push(json);          

    } else {
        
        alert.style.display = 'block';
    }


}

// Borrar tareas

function llamarBotones() {
 
    let borrar = document.querySelectorAll('#btn-eliminar');

    for (let buton of borrar) {

        buton.addEventListener('click', borrarElementos);
    }
    
};



function borrarElementos(event) {

    let article = event.target.parentNode;   
    let id = parseInt(article.dataset.id);
   

    article.parentNode.removeChild(article);

    let position = listaTareas.findIndex(tarea => tarea.idTarea == id);

    listaTareas.splice(position, 1);
    
}  

