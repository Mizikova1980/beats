(function() {

    const openMenu = document.querySelector("#openOverlay");
    const body = document.body;
    const create = createModal();
    const sections = $(".section");
    
    
    openMenu.addEventListener ("click", e => {
        e.preventDefault();
        body.appendChild(create);
        body.classList.add("locked");
    })
    
    function createModal () {
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");
    
        const template = document.querySelector("#overlayTemplate");
    
        overlayElement.innerHTML = template.innerHTML;
    
        const closeElement = overlayElement.querySelector("#close");
    
        closeElement.addEventListener("click", e => {
            e.preventDefault();
            body.removeChild(overlayElement);
            body.classList.remove("locked");
        })

        overlayElement.addEventListener('click', e => {
            e.preventDefault();
            if(e.target.classList.contains("menu__link")) {
                body.removeChild(overlayElement);
                body.classList.remove('locked');
            }

        })
    
        return overlayElement;
    }
    
})()


