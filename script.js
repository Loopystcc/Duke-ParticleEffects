const particleArray = [];
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined,
}

addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
addEventListener('mousemove',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<10;i++){
        particleArray.push(new Particle());
    }
})
addEventListener('touchmove', function(event) {
    if (event.touches.length > 0) {
        // Prevent default behavior to avoid page scrolling when drawing on the canvas
        event.preventDefault();

        // Get the touch coordinates
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
        
        for (let i = 0; i < 10; i++) {
            particleArray.push(new Particle());
        }
    }
}, { passive: false }); // Set passive to false to enable preventDefault

addEventListener('click',function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0;i<20;i++){
        particleArray.push(new Particle());
    }
})


class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 8 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ',100%,50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2){
            this.size -= 0.1;
        }
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill();
    }
}

function handleParticles(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update();
        particleArray[i].draw();
        for(let j=i;j<particleArray.length;j++){
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particleArray[i].x,particleArray[i].y);
                ctx.lineTo(particleArray[j].x,particleArray[j].y);
                ctx.stroke();
            }
        }
        if(particleArray[i].size < 0.3){
            particleArray.splice(i,1);
            i--;
        }
    }
}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
    hue++;
}

animate();