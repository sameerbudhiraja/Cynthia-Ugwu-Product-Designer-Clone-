const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});  

var timeout;
// animation using GSAP 
function FirstPageAnime() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundedelem" , {
        y: 0,
        duration: 1.5,
        ease: Expo.easeInOut,
        stagger : .2,
        delay: -1,
    })

    .from("#landing-footer" , {
        y: -10,
        opacity : 0,
        duration: 1.5,
        ease:Expo.easeInOut,
        delay:  -1,
    })
}

// circle following the mouse coursor code 

function circlemousefollower(xscale , yscale) {
    window.addEventListener("mousemove",function (dets) {
    document.querySelector("#circle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale})`;
    })
}

// While moving the cursor (slow - fast) the circle pointed to curser changes its shape cirle to ----> oval like. 
// This change in circle shape achived by changing the scale of circle while moving
// maximum and minimum scale value goes between .8 to 1.2 for both x and y scale..

function pointedCircleShapeChange() {
    var xscale = 1; // original scale value
    var yscale = 1; // original scale value

    var xprev = 0; // previous location of cursor for x axis 
    var yprev = 0; // previous location of cursor for y axis 
    window.addEventListener("mousemove" , function(dets) {
        clearTimeout(timeout);

        // calculating the diffrence between new location after moving the coursor and the previous location

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        //clamp (min , max , your value) = it gives the nearst value if the you given values does not lie between the max and min values.. example = clamp ( .8 , 1.2 , your value). if your value is 1 it returns the one , if you value is less than min value (.8) like -12 it return the min value (.0).. and same for maximum value 

        xscale = gsap.utils.clamp(.8 , 1.2 , xdiff);
        yscale = gsap.utils.clamp(.8 , 1.2 , ydiff);


        circlemousefollower(xscale , yscale);

        timeout = setTimeout(function() {    document.querySelector("#circle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1 , 1)`;
        } , 100);
    })
    
}

document.querySelectorAll(" .elem ").forEach(function(elem ){

    
    elem.addEventListener("mouseleave",function (dets) { 

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,

        });
    });
});

document.querySelectorAll(" .elem ").forEach(function(elem ){

    var rotate = 0;
    var diffrotation = 0;
    elem.addEventListener("mousemove",function (dets) { 
       
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrotation = dets.clientX -rotate;
        rotate = dets.clientX;
        var gsaprotate = gsap.utils.clamp(-20 , 20 , diffrotation);
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power1,
            top: diff,
            left: dets.clientX,
            rotate: gsaprotate,
        });
    });
});

circlemousefollower();
FirstPageAnime();
pointedCircleShapeChange();