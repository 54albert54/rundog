import {Sitting,Running,Jumping, Falling,Rolling,Diving, Hit} from "./playerStates.js";
import {CollisionAnimation} from "./collisionAnimation.js";

export class Player {
    constructor(game){
this.game=game;
this.width=100;
this.height=91.3;
this.x=0;
this.y=this.game.height-this.height-40

this.vy=0;
this.gravety=1
this.image=player;
this.groundMargin=40;
this.frameX=0;
this.frameY=0;
this.maxFrame=4;
this.fps=25;
this.frameInterval=1000/this.fps;
this.frameTime=0;
this.speed =0;
this.maxSpeed=10;
this.lives=3
this.state=[new Sitting(this.game),new Running(this.game),new Jumping(this.game),new Falling(this.game),new Rolling(this.game),new Diving(this.game), new Hit(this.game)];


}
update(input, deltaTime){
    this.checkCollision()
    this.currentState.handleInput(input)

    // horrizontal movement
    this.x+=this.speed;
    if (input.includes('ArrowRight') || input.includes('swipe right') && this.currentState !==this.state[6]) this.speed =this.maxSpeed;
    else if (input.includes('ArrowLeft') ||input.includes('swipe left') && this.currentState !==this.state[6]) this.speed =-this.maxSpeed;
    else this.speed=0;
    //horizontal boundaries
    if (this.x < 0) this.x=0;
    if (this.x>this.game.width-this.width)this.x=this.game.width-this.width
    // vertical movement    
    this.y+=this.vy;
    if (!this.onGround())this.vy+=this.gravety;
    else this.vy=0;
    //vertical boundaries
    if(this.y> this.game.height-this.height-this.groundMargin)this.y= this.game.height-this.height-this.groundMargin

    //sprrite animation
    if(this.frameTime > this.frameInterval){
        this.frameTime=0;
        if (this.frameX<this.maxFrame)this.frameX++;
     else this.frameX=0
    
  
    }else this.frameTime+=deltaTime;

}
draw(context){
    //context.fillStyle='red'
    if (this.game.debug)context.strokeRect(this.x, this.y, this.width,this.height)
    context.drawImage(this.image,this.frameX *this.width,this.height*this.frameY,this.width,this.height,this.x, this.y, this.width,this.height)
    
}
onGround(){
    return this.y>=this.game.height-this.height-40;
   
}



setState(state,speed){
    this.currentState=this.state[state];
    this.game.speed=this.maxSpeed*speed;
    this.currentState.enter();

}
checkCollision(){
    this.game.enemies.forEach(enemy => {
        if(
            enemy.x <this.x+this.width     &&
            enemy.x +enemy.width > this.x  &&
            enemy.y < this.y + this.height &&
            enemy.y +enemy.height > this.y 
        ){ enemy.markedForDeletion=true;  
            this.game.collisions.push(new CollisionAnimation(this.game,enemy.x,enemy.y,enemy.width/2,enemy.height/2))
            if (this.currentState===this.state[4] ||
                this.currentState===this.state[5])
                { this.game.score++;              
                
            }else {this.setState(6,0,)
                
                this.game.lives--;
                if (this.game.lives===0) this.game.gamerover()
                
            }
            
        }
    });
}

}