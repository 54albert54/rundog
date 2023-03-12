
export class InputHandler {
    
    
    constructor(game){
        this.touchY='';
        this.touchTreshold=20;
      
        
        this.game=game
        
        this.keys=[];
        
        this.objetos = {
            x: 790+300, y: 300+40,
            width: 50, height: 50,
           
          }
          this.image=live2
         
        window.addEventListener('keydown',e=>{

            if ((e.key=== 'ArrowDown'  ||
                e.key=== 'ArrowUp'     ||
                e.key=== 'ArrowLeft'   ||
                e.key=== 'ArrowRight'  ||
                e.key=== 'Enter'            
            )
            && this.keys.indexOf(e.key)===-1){
                this.keys.push(e.key)
                console.log( this.keys)
            }  else if (e.key==='d') this.game.debug=!this.game.debug;
            
        });
        window.addEventListener('keyup', e=>{
            if (e.key=== 'ArrowDown'  ||
            e.key=== 'ArrowUp'        ||
            e.key=== 'ArrowLeft'      ||
            e.key=== 'ArrowRight'     ||
            e.key=== 'Enter'           ){
                this.keys.splice(this.keys.indexOf(e.keys),1);
                console.log( this.keys)
            }
            
        });
        window.addEventListener('touchstart', e =>{                
            this.touchY=e.changedTouches[0].pageY
           this.touchX=e.changedTouches[0].pageX
      
          
           if  (
           ""

            )
            this.keys.push('Enter' )
   
       
           
       });

       console.log(this.objetos.x)
       
           window.addEventListener('touchmove', e =>{
              
              const swipeDistancey = e.changedTouches[0].pageY - this.touchY;
            if (swipeDistancey <-this.touchTreshold && this.keys.indexOf('ArrowUp')===-1) this.keys.push('ArrowUp');
           else if  (swipeDistancey > this.touchTreshold && this.keys.indexOf('ArrowDown')===-1) this.keys.push('ArrowDown' )
                

           const swipeDistancex = e.changedTouches[0].pageX - this.touchX;
             if (swipeDistancex <-this.touchTreshold && this.keys.indexOf('ArrowLeft')===-1) this.keys.push('ArrowLeft');
           else   if  (swipeDistancex > this.touchTreshold && this.keys.indexOf('ArrowRight')===-1) this.keys.push('ArrowRight')
           
             
                   
             
             
             
        
                             
                   
          
              
          });
           window.addEventListener('touchend', e =>{
              
              this.keys.splice(this.keys.indexOf('ArrowUp'),1)
              this.keys.splice(this.keys.indexOf('ArrowDown'),1)
             this.keys.splice(this.keys.indexOf('ArrowLeft'),1)
              this.keys.splice(this.keys.indexOf('ArrowRight'),1)
              this.keys.splice(this.keys.indexOf('Enter'),1)
              
              
           });
           
           
       
    
       
    
       
    
    }
    draw(context){
        context.fillStyle="red"
        //context.fillRect(this.objetos.x,this.objetos.y, this.objetos.width, this.objetos.height)
        context.drawImage(this.image, this.objetos.x,this.objetos.y, this.objetos.width, this.objetos.height)
     }

       

 

    
        };
      





        