const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbar')
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
navLinks.forEach((l) => {
    l.addEventListener('click', ()=>{ 
        if (menuToggle.classList.contains('show')){
            bsCollapse.toggle();
        }
    })
})


