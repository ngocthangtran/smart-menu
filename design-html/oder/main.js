const togglee = document.getElementById('header-menu'),
nav = document.getElementById('nav-menu');
togglee.addEventListener('click',()=>{
    nav.classList.toggle('show')
    togglee.classList.toggle('bx-x')
})