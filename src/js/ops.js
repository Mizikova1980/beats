(function() {
    const sections = $(".section");
    const display = $(".wrapper__content");
    const sideMenu = $(".fixed-menu");
    const menuItems =sideMenu.find(".fixed-menu__item");
    
    const mobileDetect = new MobileDetect(window.navigator.userAgent);
    const isMobile = mobileDetect.mobile();
    
    let inScroll = false;
    
    sections.first().addClass("active");
    
    const countSectionPosition =sectionEq => {
        const position = sectionEq * - 100;
    
        if(isNaN(position)) {
            console.error("передано неверное значение в countSectionPosition");
            return 0;
        }
    
        return position;
    };
    
    const changeMenuThemeForSection = sectionEq => {
        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr("data-fixedmenu-theme");
        const activeClass = "fixed-menu--shadowed";
        
        if(menuTheme==="white") {
            sideMenu.addClass(activeClass);
        } else {
            sideMenu.removeClass(activeClass);
        }
    };
    
    const reserActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
    };
    
    
    const performTransition = sectionEq => {
        
        if (inScroll) return;
    
        const transitionOver = 1000;
        const mouseInertiaOver = 300;
               
        inScroll = true;
    
        const position = countSectionPosition(sectionEq);
    
        changeMenuThemeForSection(sectionEq);
    
        display.css({
            transform: `translateY(${position}%)`
        });
        
        reserActiveClassForItem(sections, sectionEq, "active");
            
    
        setTimeout(() => {
            inScroll = false;
            reserActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
        
        }, transitionOver + mouseInertiaOver);
    }
        
        
        
    
    
    const scrollViewport = () => {
        const activeSection = sections.filter(".active");
        const nextSection = activeSection.next();
        const prevSection = activeSection.prev();
    
        return {
            next() {
                if(nextSection.length) {
                    performTransition(nextSection.index());
            
                }
            },
            prev() {
                if(prevSection.length) {
                    performTransition(prevSection.index());
                }
            }
        };
        
        
        
    
        
    };
    
    $(window).on("wheel", e => {
        const deltaY = e.originalEvent.deltaY;
        const scrolller = scrollViewport();
        
    
        if (deltaY >0) {
            scrolller.next();
        }
    
        if(deltaY <0) {
            scrolller.prev();
        }
    });
    
    $(window).on("keydown", e => {
        
        const tagName = e.target.tagName.toLowerCase();
        const userTapyingInputs = tagName == "input" || tagName == "textarea";
        const scrolller = scrollViewport();
        
    
        if(userTapyingInputs) return;
        
        
        switch(e.keyCode) {
            case 38:
                scrolller.prev();
                break;
            case 40:
                scrolller.next();
                break;
        
        }
        
    
        
    });
    
    $(".wrapper").on("touchmove", e => e.preventDefault());
    
    $("[data-scroll-to]").click( e => {
        e.preventDefault();
    
        const $this = $(e.currentTarget);
        const target = $this.attr("data-scroll-to");
        const reqSection = $(`[data-section-id = ${target}]`);
    
        performTransition(reqSection.index());
    });
    
    if(isMobile) {
        $("body").swipe( {
            swipe:function(
                event, 
                direction,
            ) {
             
                const scrolller = scrollViewport();
                let scrollDirection = "";
        
                if(direction == "up") scrollDirection = "next";
                if(direction == "down") scrollDirection = "prev";
        
                scrolller[scrollDirection]();
            }
        });
        
    }
    
    
})()




