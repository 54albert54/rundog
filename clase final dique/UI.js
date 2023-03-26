export class UI{
    constructor(game){
        this.game=game;
        this.fontSize=800;
        this.fontFamily='Helves';
        this.liveImage=live
        this.live2Image=live2
        this.touchY=0
        this.touchX=0
 
    }
    
    draw(context){
        window.addEventListener('touchstart', e =>{    
            e.preventDefault()            
            this.touchY=e.changedTouches[0].pageY
           this.touchX=e.changedTouches[0].pageX

           
        })

    
        context.fillRect(this.touchX-25,this.touchY-25,50,50)
        context.save();
        context.shadowOffsetX=1;
        context.shadowOffsetY=1
        context.shadowColor='black';
        context.shadowBlur=0;
      
        context.font ='36px Silkscreen'
       context.textAlign='left';
       context.fillStyle= "white";
       //score     
       context.fillText('score: '+this.game.score,30,50)
       //timer
       context.font ='30px Silkscreen'
       context.fillText('Timer: '+(this.game.time*0.001).toFixed(1),20,80)
        //lives
        for(let i=0; i < this.game.lives; i++){
    
            context.drawImage(this.liveImage,25*i+20,95,25,25)}

            for(let i=0; i < this.game.energy; i++){
    
                context.drawImage(this.live2Image,25*i+20,130,25,25)}    

            //context.font ='30px Silkscreen'
       //context.fillText('energia  '+this.game.energy,40,150)
            
      
       
     
       //game over messege
       if (this.game.time>=this.game.maxTime-50){
        if(this.game.score>5){
            context.font ='90px Silkscreen'
            context.fillText('ganaste :'+this.game.score,150,this.game.height-200 )} 
       
     }
      
     if (this.game.time>=this.game.maxTime-50){
        if(this.game.score<5){
            context.font ='90px Silkscreen'
            context.fillText('perdiste :'+this.game.score,150,this.game.height-200 )} 
       
     }
     context.restore();

    }
}