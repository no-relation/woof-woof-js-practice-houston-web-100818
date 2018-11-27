const API = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')

let dogeArray = []

fetch(API)
    .then((resp) => resp.json())
    .then(function (data) {
        dogeArray = data
            renderDogBar(dogeArray)
    })

function renderDogBar(paramArray) {
    paramArray.forEach(function(doge){
        let dogeJect = document.createElement('span')
        dogeJect.innerHTML = doge.name
        dogBar.append(dogeJect)
        dogeJect.addEventListener('click',renderDogInfo(doge))
    })
}

function renderDogInfo(dog) {
    
}