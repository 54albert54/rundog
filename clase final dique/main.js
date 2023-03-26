import{ Player } from "./player.js";
import {InputHandler} from "./input.js";
import {Background} from "./background.js";
import {FlyingEnemy,GroundEnemy,ClimbingEnemy} from "./enemies.js";
import {UI} from "./UI.js";


window.addEventListener('load',function(){
    const canvas =document.getElementById("canvas1");
    const ctx =canvas.getContext('2d')
    canvas.width=846;
    canvas.height=390;
    let canasPosition= canvas.getBoundingClientRect()

    
    
function gamerover(){
        this.gameOver=true}


    class Boton{
        constructor (){
            this.x=500;
            this.y=250;
            this.width=50
            this.height=50
        }
        draw(context){
            context.fillStyle='red'
        context.fillRect( this.x,this.y,this.width, this.height)

        }


    }    


    class Game {
        constructor(width,height){
            this.canvasPosition=canasPosition
            this.energy=5
            this.width=width;
            this.height=height;
            this.groundMargin=50;
            this.speed=0;
            this.maxSpeed=3;
            this.background=new Background(this)
            this.player= new Player(this)
            this.input= new InputHandler(this)
            this.UI=new UI(this);
            this.enemies=[]
            this.particles=[]
            this.collisions=[]
            this.enemyTime=0;
            this.enemyInterval=1000;
            this.debug=false;
            this.score=0;
            this.fontColor='black'
            this.time=0;
            this.maxTime=30000;
            this.gameOver=false;
            this.lives=10
            this.player.currentState=this.player.state[0];
            this.player.currentState.enter();
            this.maxParticles=500;
            this.bx=500;
            this.by=250;
            this.bwidth=50
            this.bheight=50
           
           
        }
        update(deltaTime){
            
            
            this.time+=deltaTime;
           
            if (this.time>this.maxTime){gamerover()}
            this.background.update()
            this.player.update(this.input.keys, deltaTime)
            //handleEnemies
            if(this.enemyTime>this.enemyInterval){
                this.addEnemy();
                this.enemyTime=0;
            }else{
                this.enemyTime+=deltaTime;
             
            }
            
            this.enemies.forEach(enemy =>{
                enemy.update(deltaTime);
                if (enemy.markedForDeletion)this.enemies.splice(this.enemies.indexOf(enemy),1);
                });
                //handle particles
               this.particles.forEach((particle,index)=> {
             particle.update();
          
             if(particle.markedForDeletion)this.particles.splice(index,1)
               });
               if (this.particles.length > this.maxParticles){
                this.particles.length = this.maxParticles
               }
               //handle collision sprites
               this.collisions.forEach((collision, index) => {collision.update(deltaTime);
                 if(collision.markedForDeletion)this.collisions.splice(index,1)
                });


        }
        draw(context){
           

            this.background.draw(context)
            this.player.draw(context)
           
           

            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.particles.forEach(particle =>{
                particle.draw(context);
            });

            this.collisions.forEach(collision =>{collision.draw(context);
            });


            this.UI.draw(context)
            
            
          
        }
        addEnemy(){
            if (this.speed > 0 && Math.random()<0.5)this.enemies.push(new GroundEnemy(this))
            else if (this.speed>0)this.enemies.push(new ClimbingEnemy(this))

            this.enemies.push(new FlyingEnemy(this))
          
            

        }
    }
    const boton1= new Boton()
    const boton2= new InputHandler()

    InputHandler

    const game =new Game(canvas.width, canvas.height);
   
        let lastTime=0
    function animate(timeStamp){
        const deltaTime=timeStamp-lastTime;
        lastTime=timeStamp

        ctx.clearRect(0,0,canvas.width,canvas.height)
        game.draw(ctx);
        game.update(deltaTime)
        //boton1.draw(ctx)
        boton2.draw(ctx)
       
        
    
       if(!game.gameOver)requestAnimationFrame(animate)

       
      
    }

    animate(0)
    
});



