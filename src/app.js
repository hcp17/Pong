var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,    
    pelota:null,    
    puntuacion1:null,
    puntuacion2:null,
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);

        this.jugador1 =  new cc.DrawNode();
        this.jugador1.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
		//this.jugador1.setAnchorPoint(0,0);
        this.addChild(this.jugador1, 1);

        this.jugador2 =  new cc.DrawNode();
        this.jugador2.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
		//this.jugador2.setAnchorPoint(0,0);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.pelota =  new cc.DrawNode();
        this.pelota.drawCircle(cc.p(0,0),5,0,100,false,10,color);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 1);

        this.puntuacion1 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF("0","Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
		this.iniciarJuego();
		this.schedule(this.colision, 0, Infinity);
        
    },
	
	mover:function(key, event){
		//mueve izq o der
		cc.log("Mover jugador 1");
		var  juego = event.getCurrentTarget();
		if(key.toString()==="38"){
			if(juego.jugador1.getPositionY()!=500){
				juego.jugador1.setPositionY(juego.jugador1.getPositionY()+10);
			}
		}
		if(key.toString()==="40"){
			if(juego.jugador1.getPositionY()!=0){
				juego.jugador1.setPositionY(juego.jugador1.getPositionY()-10);
			}
		}
		if(key.toString()==="87"){
			if(juego.jugador2.getPositionY()!=500){
				juego.jugador2.setPositionY(juego.jugador2.getPositionY()+10);
			}
		}
		if(key.toString()==="83"){
			if(juego.jugador2.getPositionY()!=0){
				juego.jugador2.setPositionY(juego.jugador2.getPositionY()-10);
			}
		}
	},
	
	iniciarJuego:function(){
		var start=cc.moveTo(10, 0,Math.floor(Math.random() * 445));
		this.pelota.runAction(start);
	},
	
	rebote1:function(y){
		var move=cc.moveTo(Math.floor(Math.random()*10), 0,y );
		return move;
	},
	rebote2:function(y){
		var move=cc.moveTo(Math.floor(Math.random()*10), 700,y );
		return move;
	},
	colision:function(){
		if(Math.floor(Math.abs((this.jugador1.getPositionX()-this.pelota.getPositionX())<=10))&& Math.floor(Math.abs(this.jugador1.getPositionY() - this.pelota.getPositionY()) )<=100 ){
			//this.pelota.stopAllActions();
			//this.pelota.setPosition(this.pelota.getPositionX(),this.pelota.getPositionY());
			this.pelota.runAction(this.rebote1(Math.floor(Math.random() * 445)));
		}
		
		if(Math.floor(Math.abs((this.jugador2.getPositionX()-this.pelota.getPositionX())<=10)) && Math.floor(Math.abs(this.jugador1.getPositionY() - this.pelota.getPositionY())) <=100 ){
			//this.pelota.stopAllActions();
			//this.pelota.setPosition(this.pelota.getPositionX(),this.pelota.getPositionY());
			this.pelota.runAction(this.rebote2(Math.floor(Math.random() * 445)));
		}
		
		return true;
	},
	
    ctor:function () {
        this._super();
        this.inicializar();
		
		
		
		//event manager
		//if(cc.sys.capabilities.hasOwnProperty('keyboard')){
		cc.eventManager.addListener({
			event: cc.EventListener.KEYBOARD,
			onKeyPressed:this.mover
			
		}, this);
		//}


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

