let apiKey = '0952d432-a191-4dc9-b2a4-dbf26fb5d46a';
let searchBtn = document.querySelector('#search');
let input = document.querySelector('#input');
let notFound = document.querySelector('#notFound');
let def = document.querySelector('.definition');

searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    let word = input.value;
    if (word === ''){
        alert("input cannot be empty");
        return;
    }
    getData(word);
})

async function getData(word){
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if(!data.length){
        loading.style.display="none";
        notFound.innerText="no results were found.";
        return;
    }

    let definition = data[0].shortdef[0];
    def.innerText = definition;

    //find the correct if statement to access the art object in JSON
    if(data[0].art){
        document.getElementById("wordImg").src = `https://www.merriam-webster.com/assets/mw/static/art/dict/${word}.gif`;
    }
    else{
        document.getElementById("wordImg").src = "noimg.png";
    }
    

}