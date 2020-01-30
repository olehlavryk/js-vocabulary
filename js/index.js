'use strict';

const engWord = document.getElementById('eng'),
    uaWord    = document.getElementById('ua'),
    inputs    = document.getElementsByClassName('input'),
    addButton = document.getElementById('add-word-btn'),
    tableBody = document.querySelector('#table tbody');

let words,
    btnDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
    tableBody.innerHTML += `
        <tr>
            <td class="eng-word">${words[index].english}</td>
            <td class="eng-word">${words[index].ukrainian}</td>
            <td>
                <i class="far fa-trash-alt btn-delete"></i>
            </td>
        </tr>
    `;
};

words.forEach((element, i) => {
    addWordToTable(i);
});

function CreateWord(english, ukrainian) {
    this.english   = english;
    this.ukrainian = ukrainian;
}


addButton.addEventListener('click', () => {

    if(
        engWord.value.length < 1 ||
        uaWord.value.length < 1 ||
        !isNaN(engWord.value) ||
        !isNaN(uaWord.value)
    ) {
        for(let key of inputs) {
            key.classList.add('error');
        }
    } else {
        // input is valid, remove data errors
        for(let key of inputs) {
            key.classList.remove('error');
        }

        words.push(new CreateWord(engWord.value, uaWord.value));
        
        // set words in localStorege
        localStorage.setItem('words', JSON.stringify(words));

        // set last word to table
        addWordToTable(words.length - 1);

        // clear inputs
        engWord.value = null;
        uaWord.value = null;

        addEventDelete();
    }
});

const deleteWord = e => {
    const rowIndex = e.target.parentNode.parentNode.rowIndex - 1;
    e.target.parentNode.parentNode.remove();
    
    // remove current word from arr
    words.splice(rowIndex, 1);

    // update localStorage
    localStorage.removeItem('words');
    localStorage.setItem('words', JSON.stringify(words));
    
};

const addEventDelete = () => {
    if(words.length > 0) {
        btnDelete = document.querySelectorAll('.btn-delete');
        
        for(let btn of btnDelete) {
            btn.addEventListener('click', e => {
                
                deleteWord(e);
            });
        }
    }
    
};

// init addEventDelete
addEventDelete();