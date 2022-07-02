$(document).ready(() => {
    const openItem = item => {
        const container = item.closest(".team__card");
        const contentBlock = container.find(".team__desc");
        const textBlock = contentBlock.find(".team__content");
        //const reqHeight = textBlock.height();

        container.addClass("active").siblings().removeClass("active");
        //contentBlock.height(reqHeight);

    }

    const closeEveryItem = container => {
        const items = container.find(".team__desc");
        const itemContainer = container.find(".team__card");
        itemContainer.removeClass("active");
        //items.height(0);
    }

    $(".team__name").click(e => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const container = $this.closest(".team");
        const elemContainer = $this.closest(".team__card");

        if (elemContainer.hasClass("active")) {
            closeEveryItem (container);

        } else {
            closeEveryItem (container);
            openItem($this);
        }

        
    })
});