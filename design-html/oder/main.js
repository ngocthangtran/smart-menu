const togglee = document.getElementById('header-menu'),
nav = document.getElementById('nav-menu');
togglee.addEventListener('click',()=>{
    nav.classList.toggle('show')
    togglee.classList.toggle('bx-x')
})


const dropdown = document.getElementById('card-info'),
cardDetails = document.getElementById('card-details');
dropdown.addEventListener('click', ()=>{
    cardDetails.classList.toggle("active")
})