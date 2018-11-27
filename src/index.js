const API = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const dogFilter = document.getElementById('good-dog-filter')
let dogeArray = []

fetch(API)
    .then((resp) => resp.json())
    .then(function (data) {
        dogeArray = data
            renderDogBar(dogeArray)
    })

dogFilter.addEventListener('click', function() {
    if (dogFilter.innerHTML == 'Filter good dogs: OFF') {
        newDogArray = dogeArray.filter((doge) => doge.isGoodDog)
        dogFilter.innerHTML = 'Filter good dogs: ON'
        renderDogBar(newDogArray)
    } else {
        dogFilter.innerHTML = 'Filter good dogs: OFF'
        renderDogBar(dogeArray)
    }
})

function renderDogBar(paramArray) {
    dogBar.innerHTML = ''
    paramArray.forEach(function(doge){
        let dogeJect = document.createElement('span')
        dogeJect.innerHTML = doge.name
        dogBar.append(dogeJect)
        dogeJect.addEventListener('click', function () {
            renderDogInfo(doge)
        })
    })
}

function renderDogInfo(dog) {
    dogInfo.innerHTML = ''
    let dogePic = document.createElement('img')
    dogePic.setAttribute('src', dog.image)
    
    let dogeName = document.createElement('h2')
    dogeName.innerHTML = dog.name

    let dogeGood = document.createElement('button')
    if (dog.isGoodDog) {
        dogeGood.innerText = 'Good Dog!'
    } else {
        dogeGood.innerText = 'Bad Dog!'
    }
    dogeGood.addEventListener('click', function (){
        if (dog.isGoodDog) {
            dog.isGoodDog = false
        }else{
            dog.isGoodDog = true
        }
        updateDog(dog)
    })

    dogInfo.append(dogePic, dogeName, dogeGood)
}

function updateDog(dog) {
    fetch(API + `/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dog)
    }).then(function() {
        renderDogInfo(dog)
    })
}