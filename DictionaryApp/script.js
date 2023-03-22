const input = document.querySelector('input')
const btn = document.querySelector('button')
const dictionary_application = document.querySelector('.dictionary-application')

async function dictionaryApp(word){
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(res => res.json())

  return res[0]


}

btn.addEventListener('click', fetchAndCreateCard)

async function fetchAndCreateCard(){
  const data = await dictionaryApp(input.value)

  console.log(data)

  let partOfSpeechArray = []
  for(let i=0; i<data.meanings.length-1; i++){
    partOfSpeechArray.push(data.meanings[i].partOfSpeech)
  }


  dictionary_application.innerHTML = `      
  <div class ="card">
                  <div class = "property">
                    <span>Word:</span>
                    <span>${data.word}</span>
                  </div>

                  <div class = "property">
                    <span>Phonetics:</span>
                    <span>${data.phonetic}</span>
                  </div>

                  <div class = "property">
                    <span>
                    <audio controls src = "${data.phonetics[0].audio}"></audio>
                    </span>
        
                  </div>

                  <div class = "property">
                    <span>Definition:</span>
                    <span>${data.meanings[0].definitions[0].definition}</span>
                  </div>

                  <div class = "property">
                    <span>Example:</span>
                    <span>${data.meanings[0].definitions[0].example}</span>
                  </div>

                  <div class = "property">
                    <span>${partOfSpeechArray.map(e => e).join(', ' ) }</span>
                  </div>
 
</div>`

}

dictionaryApp('chair')



