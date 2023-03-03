//CAPTURANDO ELEMENTOS DO HMTL:

const form = document.querySelector('#form') //<form>.. </form>
const input = document.querySelector('#tarefa') //<input type ="text" id="tarefa">
const listaTarefas = document.querySelector('.lista-tarefas') //<ul class="lista-tarefas">..</ul>

let arrayDeTarefas = []
//ADICIONAR NOVA TAREFA:

form.addEventListener('submit', (ev)=>{
    ev.preventDefault(); // Evitar o envio do formulário

    const novaTarefa = document.createElement('li'); //cria um novo elemento <li> na lista
    novaTarefa.innerHTML = input.value; //define o texto do input como o valor dentro do <li> criado
    

    if(input.value ==''){
        alert('O campo da tarefa está vazio!')
        input.focus()
    }else{
         //criando um botão para marcar a tarefa como concluída
    const btnConcluir = document.createElement('button');
    btnConcluir.innerText = '✅'
    btnConcluir.className = 'btn-concluir'
    btnConcluir.setAttribute('data-txt',input.value)

    //criando um botão para remover tarefas
    const btnRemover = document.createElement('button')
    btnRemover.innerText = '❌'
    btnRemover.className = 'btn-apagar'
    btnRemover.setAttribute('data-txt',input.value)

    //criando uma div para os botoes
    const divBtn = document.createElement('div')
    divBtn.className = 'div-btn'

    arrayDeTarefas.push({
        texto: input.value,
        concluida:false
    })
    divBtn.append(btnConcluir, btnRemover) //adiciona o botão na tarefa criada
    novaTarefa.appendChild(divBtn)
    listaTarefas.appendChild(novaTarefa) //adiciona o item <li> à lista de tarefas <ul>

    localStorage.setItem('tarefas',JSON.stringify(arrayDeTarefas))

    console.log(arrayDeTarefas)
    input.value='' //limpa o texto inserido no input
    }

    
})




// VERIFICAR SE EXISTEM TAREFAS SALVAS ANTERIORMENTE

document.addEventListener('DOMContentLoaded', function(){
   
    if (localStorage.getItem('tarefas')){ //verifica se há valores inseridos com a chave 'tarefas' no localStorage
        arrayDeTarefas = JSON.parse(localStorage.getItem('tarefas'));

        arrayDeTarefas.forEach((tarefa)=>{ //fazendo um loop que percorre o array de tarefas e cria um novo elemento <li> para cada uma tarefa armazenada e depois carrega na página
            const tarefaArmazenada = document.createElement('li');
            tarefaArmazenada.innerText = tarefa.texto

            const btnConcluir = document.createElement('button');
            btnConcluir.innerText = '✅'
            btnConcluir.className = 'btn-concluir'
            btnConcluir.setAttribute('data-txt',tarefa.texto)
            
             //criando um botão para remover tarefas
            const btnRemover = document.createElement('button')
            btnRemover.innerText = '❌'
            btnRemover.className = 'btn-apagar'
            btnRemover.setAttribute('data-txt',tarefa.texto)

            const divBtn = document.createElement('div')
            divBtn.className = 'div-btn'

            if(tarefa.concluida){ //verifica se o atributo 'concluida' do objeto tarefa está settado como 'true'
                tarefaArmazenada.classList.add('concluida')
            }
            divBtn.append(btnConcluir, btnRemover)
            tarefaArmazenada.appendChild(divBtn) //adiciona o botão na tarefa criada
            listaTarefas.appendChild(tarefaArmazenada)
            console.log(`A tarefa (${tarefa.texto}) foi trazida do localStorage!`)
        })
    }
})


// MARCAR TAREFAS COMO CONCLUIDAS:

document.addEventListener('DOMContentLoaded', function() {
    const botoesConcluidos = document.querySelectorAll('.btn-concluir');
    botoesConcluidos.forEach((btn)=>{
        btn.addEventListener('click', (btnEvento)=>{
            btnEvento.preventDefault()

            const tarefaCorrespondente = btnEvento.currentTarget.dataset.txt //Encontrando o texto da tarefa correspondente
            
            const tarefaEncontrada =arrayDeTarefas.find(function(tarefaListada){ //  Encontrando a tarefa correspondente no array de tarefas
                return tarefaListada.texto === tarefaCorrespondente
            })

          let elementoPai =  btnEvento.target.parentNode.parentNode
          elementoPai.classList.toggle('concluida') // Alternando a classe CSS "concluida" no elemento de lista correspondente 
        
        
           tarefaEncontrada.concluida =!tarefa.concluida //Atualizando a propriedade "concluida" da tarefa correspondente no array de tarefas e no Local Storage
           localStorage.setItem('tarefas', JSON.stringify(arrayDeTarefas));
            
        })
      
       
    })
  });


  //REMOVER TAREFAS:

  document.addEventListener('DOMContentLoaded', function() {
    const botoesRemover = document.querySelectorAll('.btn-apagar');
    botoesRemover.forEach((btnR)=>{
        btnR.addEventListener('click', (btnREvento)=>{
           
            const tarefaCorrespondente = btnREvento.currentTarget.dataset.txt//Encontrando o texto da tarefa correspondente
            console.log(tarefaCorrespondente)
            const tarefaEncontrada =arrayDeTarefas.find(function(tarefaListada){ //  Encontrando a tarefa correspondente no array de tarefas
                return tarefaListada.texto === tarefaCorrespondente
            })

           if(tarefaEncontrada){
            const confirmarExclusão = window.confirm('Tem certeza que deseja excluir a tarefa "' + tarefaCorrespondente + '" ?')
                if(confirmarExclusão){
                    const indexEncontrado= arrayDeTarefas.findIndex(function(tarefa){ // encontrando o índice da tarefa correspondente
                        return tarefa.texto === tarefaCorrespondente
                    })
                    arrayDeTarefas.splice(indexEncontrado,1)// removendo a tarefa do array
                    const elementoPai = btnREvento.target.parentNode //removendo elemento <li> 
                    elementoPai.parentNode.remove()
                    localStorage.setItem('tarefas', JSON.stringify(arrayDeTarefas)); // atualizando a lista de tarefas na página
                    
                }else{
                    alert('tarefa não excluída')
                }
            }else{
                alert('tarefa não encontrada')
            }
            
        })
    })
  });

 /*TROCAR TEMA*/

 const trocarBtn = document.getElementById('trocarBtn')
 trocarBtn.addEventListener('click',()=>{
    const body = document.body
    const h1 = document.querySelector('h1')
    const ul = document.querySelector('ul')
    const footer = document.querySelector('footer')
    body.classList.toggle('claro')
    h1.classList.toggle('titulo-claro')
    h1.classList.toggle('titulo-escuro')
    form.classList.toggle('form-escuro')
    form.classList.toggle('form-claro')
    ul.classList.toggle('lista-escura')
    ul.classList.toggle('lista-clara')
    footer.classList.toggle('footer-claro')
 })