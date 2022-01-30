class Gun {
    constructor(type, game) {
        this.count = 0;

        this.type = type;
        this.game = game;
        this.game.gun = this;

        this.facing = "right"; // left or right

        this.mapOffset = 25;
        this.leftGunXMapOffset = 10;
        this.xMap = this.game.camera.startXPlayer + this.mapOffset;
        this.yMap = this.game.camera.startYPlayer + this.mapOffset;

        this.rotation = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/guns.png");
        this.SIZE = 38; // num of pixels wide
        this.SCALE = 3;
        this.spriteSize = this.SIZE * this.SCALE;

        this.barrelX = (this.spriteSize / 2) + 10;
        this.barrelY = 0;

        this.sprites = new Map;
        this.sprites.set("uzi", new Map);
        this.sprites.get("uzi").set("left", new Map);
        this.sprites.get("uzi").set("right", new Map);
        this.sprites.set("laser", new Map);
        this.sprites.get("laser").set("left", new Map);
        this.sprites.get("laser").set("right", new Map);

        this.guncooldown = 20;
        this.uzicooldown = 5;                   

    };

    update() {
        this.rotation = Math.atan2(((this.game.crosshair.yMap+this.game.crosshair.spriteSize/2) - (this.yMap+this.spriteSize /2)), ((this.game.crosshair.xMap+this.game.crosshair.spriteSize/2) - (this.xMap+15+this.spriteSize/2)));

        if (this.rotation < -Math.PI/2 || this.rotation > Math.PI/2) {
            this.facing = "left";
        }
        else {
            this.facing = "right";
        }
    //     // add alpha angle to rotation to aim gun barrel directly at cursor
        
        //this.rotation -= Math.atan2(Math.hypot((this.game.mouseX - this.xMap),(this.game.mouseY - this.yMap)),10);

    //     // update the animation
    //     //console.log(this.facing + this.rotation);
    //     if (this.game.clicked) {
    //         console.log("gun sees pressed");
    //         if(this.type == "gun"){
    //             if(this.guncooldown == 0){
    //                 //console.log("adding gun bullet");
    //                 //this.game.addEntity(new Bullet(this.game));    
    //                 this.guncooldown = 20;
    //             }
    //             this.guncooldown--;  
    //         }
    //         else if(this.type == "uzi") {
    //             if(this.uzicooldown == 0){
    //                 //console.log("adding uzi bullet");
    //                 //this.game.addEntity(new Bullet(this.game)); //TODO: can make this unshift or change order of entityconcat in game update
    //                                                             // BUT GUN MOVES WEIRD
    //                 //this.bullets.push(new Bullet(this.game, this.x, this.y, this.game.mouseX, this.game.mouseY));    
    //                 this.uzicooldown = 10;
    //             }
    //             this.uzicooldown--;  
    //         }

    //     }
    //     else if(!this.game.clicked){
    //          if(this.type == "gun" && this.guncooldown > 0) this.guncooldown--;
    //          else if(this.type == "uzi" && this.uzicooldown > 0) this.uzicooldown--;
    //     }
    //     this.animation = this.animations.get(this.facing);

    //     // this.bullets.forEach(bullet => {
    //     //     bullet.update();
    //     //     if (bullet.removeFromWorld){
    //     //         const index = this.bullets.indexOf(bullet);
    //     //         if (index > -1) {
    //     //             this.bullets.splice(index, 1);
    //     //         }      
    //     //     }
    //     // });
    };

    move(x,y){

        if (this.facing == "left") {
            this.xMap = x + this.mapOffset + this.leftGunXMapOffset;
            this.yMap = y + this.mapOffset;
        } else {
            this.xMap = x + this.mapOffset;
            this.yMap = y + this.mapOffset;
        }
    };

    draw(ctx) {

        let offscreenCanvas = null;
        let degrees = Math.floor(this.rotation * (180/Math.PI));
        
        if (this.facing == "right"){
            if (this.sprites.get("uzi").get("right").has(degrees)) {
                offscreenCanvas = this.sprites.get("uzi").get("right").get(degrees).image;
                //console.log(this.sprites.get("uzi").get("right").get(degrees));
                console.log("x: " + this.sprites.get("uzi").get("right").get(degrees).barrelLocation.x);
                console.log("y: " + this.sprites.get("uzi").get("right").get(degrees).barrelLocation.y);
            } else {
                // create the canvas with the rotated image
                offscreenCanvas = document.createElement('canvas')                                                              
                offscreenCanvas.width = (2*(this.spriteSize / 3)*2);
                offscreenCanvas.height = (2*(this.spriteSize / 3)*2);
                let offscreenCtx = offscreenCanvas.getContext('2d');
                offscreenCtx.imageSmoothingEnabled = false;
                offscreenCtx.save();
                offscreenCtx.translate(2*(this.spriteSize / 3), this.spriteSize / 2);
                offscreenCtx.rotate(this.rotation + Math.PI/2);
                offscreenCtx.translate(-2*(this.spriteSize / 3), -this.spriteSize / 2);     
                    
                                            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, destinationWidth, destinationHeight)
                offscreenCtx.drawImage(this.spritesheet, this.SIZE, 0, this.SIZE, this.SIZE, 10, 10,this.spriteSize,this.spriteSize)
                offscreenCtx.restore();
                //console.log("ROTATION: " + this.rotation);
                //console.log((Math.cos(this.rotation)));
                this.sprites.get("uzi").get("right").set(degrees, { image: offscreenCanvas, barrelLocation : { x : ((Math.cos(this.rotation) * this.spriteSize / 2) + this.xMap), y:  ((Math.sin(this.rotation) * this.spriteSize / 2) + this.yMap) } });

            }
        }
        else if (this.facing == "left"){
            if (this.sprites.get("uzi").get("left").has(degrees)) {
                offscreenCanvas = this.sprites.get("uzi").get("left").get(degrees).image;
            } else {
                // create the canvas with the rotated image
                offscreenCanvas = document.createElement('canvas')                                                              
                offscreenCanvas.width = (2*(this.spriteSize / 3)*2);
                offscreenCanvas.height = (2*(this.spriteSize / 3)*2);
                let offscreenCtx = offscreenCanvas.getContext('2d');
                offscreenCtx.imageSmoothingEnabled = false;
                offscreenCtx.save();
                offscreenCtx.translate(this.spriteSize / 2, this.spriteSize / 2);
                offscreenCtx.rotate(this.rotation + Math.PI/2);
                offscreenCtx.translate(-this.spriteSize / 2, -this.spriteSize / 2);     

                            // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, destinationWidth, destinationHeight)
                offscreenCtx.drawImage(this.spritesheet, 0, 0, this.SIZE, this.SIZE, 10, 10, this.spriteSize, this.spriteSize)
                offscreenCtx.restore();
                this.sprites.get("uzi").get("left").set(degrees, { image: offscreenCanvas, barrelLocation : { x: 0, y: 0 } });
            }
        }

        ctx.drawImage(offscreenCanvas, this.xMap-this.game.camera.x, this.yMap-this.game.camera.y);        

        // this.bullets.forEach(bullet => {
        //     bullet.draw(ctx);
        // });
    };
};