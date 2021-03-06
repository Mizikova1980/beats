(function() {

    const mesureWidth = item => {
        let reqItemWidth = 0;
        const screenWidth = $(window).width();
        const container = item.closest(".colors__list");
        const titlesBlocks = container.find(".color__title");
        const titlesWidth = titlesBlocks.width() * titlesBlocks.length;
        const textContainer = item.find(".color__container");
        const paddingLeft = parseInt(textContainer.css("padding-left"));
        const paddingRight = parseInt(textContainer.css("padding-right"));
    
        const isTablet = window.matchMedia("(max-width: 768px)").matches;
        const isMobile = window.matchMedia("(max-width: 480px)").matches;
    
        if (isTablet) {
            reqItemWidth = screenWidth - titlesWidth;
        }
        
        if (isMobile) {
            reqItemWidth = screenWidth - titlesBlocks.width();
        } 
        
        if(!isTablet && !isMobile) {
            reqItemWidth =500;
        }
        
        return {
            container: reqItemWidth,
            textContainer: reqItemWidth - paddingLeft - paddingRight,
        }
        
    }
    
    const closeEveryItemInContainer = container => {
        const items = container.find(".color");
        const content = container.find(".color__content");
    
        content.width(0);
        items.removeClass("active");
    }
    
    const openItem = item => {
        
        const hiddenContent = item.find(".color__content");
        const reqWidth = mesureWidth(item);
       
        item.addClass("active").siblings().addClass("passive");
        hiddenContent.width(reqWidth.container);
       
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


})()






