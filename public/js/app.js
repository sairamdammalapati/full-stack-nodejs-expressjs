      

const wform = document.querySelector('form')
const serch = document.querySelector('input')
const message = document.querySelector('#message')
const message1 = document.querySelector('#message1')
wform.addEventListener('submit',(e)=>{
    e.preventDefault()
    message.textContent = 'loading....'
message1.textContent = ''
console.log('callling toweather')
    fetch('/weather?address='+serch.value).then((response)=>{
        console.log('after calling weather',response)
    response.json().then((data)=>{
        console.log(data)
        if(data.error) {
            console.log(data)
            message.textContent = data.error
          
        } else {

            message.textContent = data.name
            message1.textContent = data.title
        }
       
    })
})
})