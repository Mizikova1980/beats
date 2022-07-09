

const mesureWidth = () => {
    return 500;
}

const closeEveryItemInContainer = container => {
    const items = container.find(".color");
    const content = container.find(".color__content");

    content.width(0);
    items.removeClass("active");
}

const openItem = item => {
    
    const hiddenContent = item.find(".color__content");
    const reqWidth = mesureWidth();
    item.addClass("active");
    
    hiddenContent.width(reqWidth);
    
}
    




$(".color__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".color");
    const itemOpen = item.hasClass("active");
    const container = $this.closest(".colors__list");

    if(itemOpen) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        openItem(item);
    }

    

});