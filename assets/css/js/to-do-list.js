
let bank = [];
bank = JSON.parse(localStorage.getItem('todoList')) ?? [];
console.log(bank);
//criando uma funcao para os dados ficarem salvos no LocalStorage//
function Getbank(){
    //Se tiver algo no localStorage, pegue isso, senao, array vazio//
     bank = JSON.parse(localStorage.getItem('todoList')) ?? [];
     
}


//Ensinando o JS a inserir uma nova area no todoList//
function CreateItem(object){
    let index = 0;
    
    object.forEach(element => {
        console.log(element)
        let item = document.createElement('label');
    item.classList.add('todo__item');
        item.innerHTML=`<input type="checkbox" ${element.status} data-index=${index}>
    <div>${element.tarefa}</div>
    <input type="button" value="X" data-index=${index}>`
    
    document.getElementById('todoList').appendChild(item);
    index++;
    
    });
    
}
//Limpar textos
function ClearText(){
    const todoList = document.getElementById('todoList');
    //Enquando existir o primeiro filho em todoList, exclua o ultimo filho, fazemos isso para nao ter valores duplicados...//
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild)
    }
}

//Criar a funcao de atualizar a tela//
 function update(){
         ClearText();
           localStorage.clear();
              localStorage.setItem('todoList', JSON.stringify(bank));
              Getbank();
              CreateItem(bank);
        }


//Agora, vamos criar a funcao de atualizar o banco quando alguem add novo item//
function addItem(event){
    let key = event.key;
    let text = event.target.value;
    if (key==='Enter'){
        
        bank.push({'tarefa':text, 'status': ''});
         update();
        //apos digitar o texto, a area de digitar fica limpo//
        event.target.value = '';
        
    }
}
//Agora, vamos criar uma funcao pra identificar em qual parte cliquei, por exemplo, no X, na label ou checkbox

function clickItem(event){
    let element = event.target;
    if(element.type==='button'){
        let index = element.dataset.index;
        removeItem(index);
    }
    else if(element.type==='checkbox'){
        let index = element.dataset.index;
        updateItem(index);
       
    }
}
//Criando funcao de atualiar Item do banco//
function updateItem(index){
    bank[index].status= bank[index].status === '' ? 'checked' : '';
    update();
}

//Criando funcao para removeritem//
function removeItem(index){
    bank.splice(index,1);
    update();
}
//captura qual tcla está sendo digitada//
document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);

 update();



