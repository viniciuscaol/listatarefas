// const inputBox = document.getElementById("input_box");
// const containerLista = document.getElementById('container_lista');
// const btn = document.getElementById('btn');

// const updateLocalStorage = () => {
//     localStorage.setItem('data',containerLista.innerHTML);
// }

// const exibirTarefa = () => {
//     containerLista.innerHTML = localStorage.getItem('data');
// }

// btn.addEventListener('click', () => {
//     if (inputBox.value === '') {
//         alert('Campo não pode ser em branco');
//     } else {
//         const li = document.createElement('li');
//         li.innerText = inputBox.value;
//         containerLista.appendChild(li);
//         const span = document.createElement('span');
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//         updateLocalStorage();
//     }
//     inputBox.value='';
 
// })

// containerLista.addEventListener('click',(e) => {
//     if(e.target.tagName === 'LI') {
//         e.target.classList.toggle('marcada');
//     } else if(e.target.tagName === 'SPAN') {
//         e.target.parentElement.remove();
//     }
// })

// exibirTarefa();
const inputBox = document.getElementById("input_box");
const containerLista = document.getElementById('container_lista');
const btn = document.getElementById('btn');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

const updateLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

const exibirTarefas = () => {
    containerLista.innerHTML = '';
    tarefas.forEach(({ id, texto, concluida }) => {
        const li = document.createElement('li');
        li.dataset.id = id;
        li.innerText = texto;
        if (concluida) {
            li.classList.add('marcada');
        }
        containerLista.appendChild(li);
        const span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
}

const adicionarTarefa = (texto) => {
    const id = Date.now().toString();
    tarefas.push({ id, texto, concluida: false });
    updateLocalStorage();
    exibirTarefas();
}

const atualizarEstadoTarefa = (li) => {
    const id = li.dataset.id;
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    if (index !== -1) {
        tarefas[index].concluida = li.classList.contains('marcada');
        updateLocalStorage();
    }
}

const removerTarefa = (id) => {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    updateLocalStorage();
}

btn.addEventListener('click', () => {
    if (inputBox.value === '') {
        alert('Campo não pode ser em branco');
    } else {
        adicionarTarefa(inputBox.value);
    }
    inputBox.value='';
});

containerLista.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('marcada');
        atualizarEstadoTarefa(e.target);
    } else if (e.target.tagName === 'SPAN') {
        const li = e.target.parentElement;
        li.remove();
        removerTarefa(li.dataset.id);
    }
});

exibirTarefas();