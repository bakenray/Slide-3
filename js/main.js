let $buttons = $("#btnBox>button")
let $slides = $("#slides")
let $images = $slides.children("img")
let current = 0

makeFakeSlides()
$slides.css({transform:'translateX(-1200px)'})
bindEvents()

$(next).on('click',function(){
    goToSlide(current-1)
})
$(pre).on('click',function(){
    goToSlide(current+1)
})

let timer = setInterval(function(){
    goToSlide(current+1)
},4000)

$('.container').on('mouseenter',function(){
    window.clearInterval(timer)
})
    .on('mouseleave',function(){
        timer = setInterval(function(){
            goToSlide(current+1)
        },4000)
    })

function bindEvents(){
    $('#btnBox').on('click','button',function(e){
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}

function goToSlide(index){
    if(index>$buttons.length-1){
        index = 0
    }
    else if(index<0){
        index = $buttons.length -1 
    }
    if(current === $buttons.length-1 && index===0){
        $slides.css({transform:`translateX(${-($buttons.length +1)*1200}px)`})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*1200}px)`}).show()
        }) 
        btnMove(index)
    }
    else if( current ===0 && index === $buttons.length-1){
        $slides.css({transform:`translateX(0px)`})
        .one('transitionend',function(){
            $slides.hide().offset()
            $slides.css({transform:`translateX(${-(index+1)*1200}px)`}).show()
        })
        btnMove(index)  
    }
    else{
        $slides.css({transform:`translateX(${-(index+1)*1200}px)`}).show()
        btnMove(index)
    }
    current = index
}
function btnMove(index){
    $($buttons[index]).addClass('active').siblings().removeClass('active')
}
function makeFakeSlides(){
    let $firstCopy  = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length-1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}