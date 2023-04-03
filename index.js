// import platform from './img/platform.png'
// console.log(platform)
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = innerWidth
    canvas.height = innerHeight


    const gravity = 0.5

    class Player {
        constructor(){
            this.position = {
                x:100,
                y: 100
            }

            this.velocity = {
                x:0,
                y:0
            }
            this.width = 30
            this.height = 30
            
        }


        //drawing out our character
        draw(){
            c.fillStyle = 'red'
            c.fillRect(this.position.x, this.position.y,this.width,this.height)

        }

        update(){
            this.draw()
            this.position.y += this.velocity.y
            this.position.x += this.velocity.x

            if(this.position.y + this.height + this.velocity.y <= canvas.height)
                this.velocity.y += gravity
                else this.velocity.y = 0

            

            // this.velocity.y += gravity
            

        }
        
    }

    //Platform class
    class Platform{
        constructor({x, y}) {
            this.position = {
                x,
                y
            }

            this.width = 200
            this.height = 20

        }

        draw(){
            c.fillStyle = 'blue'
            c.fillRect(this.position.x,this.position.y,this.width,this.height)
        }
    }

    const player = new Player()
    // const platform = new Platform()  
    const platforms = [new Platform({x:200, y:200}), new Platform({x: 500 ,y :100})]    
    //checks if keys are pressed
    const keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }
    
    //lets us know how far we've scrolled
    let scrollOffset = 0

    //loop that changes the position of the player (gravity)

    function animate() {
        requestAnimationFrame(animate)
        c.clearRect(0,0,canvas.width,canvas.height)
        player.update()
        //adds in the platforms
        platforms.forEach(platform => {
            platform.draw()
        })
        

        //if statement for when we have the right and left keys pressed
        if(keys.right.pressed && player.position.x < 400){
            player.velocity.x = 5
        }
        else if(keys.left.pressed && player.position.x > 100){
            player.velocity.x = -5
        }
        else
        {player.velocity.x = 0
        
            if(keys.right.pressed){
                scrollOffset += 5
                platforms.forEach(platform => {
                    platform.position.x -= 5 
                })
                
            }
            else if(keys.left.pressed){
                scrollOffset -= 5
                platforms.forEach(platform => {
                    platform.position.x += 5
                })
                
            }
        }
        

        //adding rectangular platform collision detection
        platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y 
            && player.position.x +player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
        }
    })
    

    //win scenario
    if(scrollOffset > 2000) {
        console.log('you win')
    }
    }
    animate()

    addEventListener('keydown', ({ keyCode }) => {
    //switch statement for when players use the movement keys
    switch (keyCode){
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            // player.velocity.x = 1
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            player.velocity.y -= 15
            break
        
    }})

    addEventListener('keyup', ({ keyCode }) => {
        //switch statement for when players let up on the keypad (the moment they stop pressing the button)
        switch (keyCode){
            case 65:
                console.log('left')
                keys.left.pressed = false
                break
            case 83:
                console.log('down')
                break
            case 68:
                console.log('right')
                // player.velocity.x = 0
                keys.right.pressed = false
                break
            case 87:
                console.log('up')
                player.velocity.y -= 10
                break
            
        }
    
        console.log(keys.right.pressed)
    })

    // canvas.width= 64 * 16
    // canvas.height = 64 * 9
    // c.fillStyle = 'white'
    // c.fillRect(0, 0, canvas.width, canvas.height)
