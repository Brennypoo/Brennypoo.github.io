
//------------------------------------------------------------------
//
// This namespace holds the game model.
//
//------------------------------------------------------------------
Brickout.model = (function(components, graphics, input,renderer) {
    'use strict';

    var paddle,
        ball,
        centipede,
        centipedeRender,
        centipedeHead,
        centipedeHeadRender,
        flea,
        fleaRender,
        spider,
        spiderRender,
        squid,
        squidRender,
        shroom,
        shroomRender,
        scorpion,
        scorpionRender,
        bricks,
        sound1,
        sound2,
        sound3,
        score,
        paddlesRemaining = 3,
        elapsedCountdown = 3000,
        internalUpdate,
        internalRender,
        keyboard = input.Keyboard(),
        particleSystem = ParticleSystem(graphics),
        textGameOver = {
            font: '128px Arial, sans-serif',
            fill: 'rgba(100, 0, 255, 1)',
            stroke: 'rgba(0, 0, 0, 1)',
            text: 'Game Over'
        };

    //------------------------------------------------------------------
    //
    // Create default settings for the paddle and ball.
    //
    //------------------------------------------------------------------
    function initializePaddleAndBall() {
        
        

        paddle = components.Paddle({
            color: 'rgba(255, 255, 255, 1)',
            view: { width: 800, height: 600 },
            moveRate: 350 / 1000    // pixels per millisecond
        });

        ball = components.Ball({
            color: 'rgba(255, 0, 0, 1)',
            view: { width: 800, height: 600 },
            direction : { x: 0.0, y: 0.0},
            moveRate: 300 / 1000 // pixels per millisecond
        });

        scorpion = components.Scorpion({
            size: { x: 50, y: 37 },       // Size in pixels
            center: { x: 300, y: 300 },
            rotation: 0,
            moveRate: 125 / 1000,         // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        spider = components.Spider({
            size: { x: 75, y: 50 },       // Size in pixels
            center: { x: 500, y: 500 },
            rotation: 0,
            moveRate: 75 / 1000,          // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        squid = components.Squid({
            size: { x: 75, y: 50 },       // Size in pixels
            center: { x: 50, y: 50 },
            rotation: 0,
            moveRate: 75 / 1000,          // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        flea = components.Flea({
            size: { x: 50, y: 25 },       // Size in pixels
            center: { x: 150, y: 150 },
            rotation: 0,
            moveRate: 75 / 1000,          // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        shroom = components.Shroom({
            size: { x: 25, y: 25 },       // Size in pixels
            center: { x: 200, y: 200 },
            rotation: 0,
            moveRate: 75 / 1000,          // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        centipede = components.Shroom({
            size: { x: 25, y: 25 },       // Size in pixels
            center: { x: 250, y: 250 },
            rotation: 0,
            moveRate: 75 / 1000,          // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
        centipedeHead = components.Shroom({
            size: { x: 25, y: 25 },       // Size in pixels
            center: { x: 140, y: 500 },
            rotation: 0,
            moveRate: 75 / 1000,          // Pixels per second
            rotateRate: Math.PI / 1000    // Radians per second
        });
    
        spiderRender = renderer.AnimatedModel({
            spriteSheet: 'assets/spider.png',
            spriteCount: 4,
            spriteTime: [60, 60, 60, 60],   // ms per frame
        }, graphics);
        centipedeRender = renderer.AnimatedModel({
            spriteSheet: 'assets/centipede.png',
            spriteCount: 4,
            spriteTime: [65, 65, 65, 65],   // ms per frame
        }, graphics);
        centipedeHeadRender = renderer.AnimatedModel({
            spriteSheet: 'assets/centipedeHead.png',
            spriteCount: 4,
            spriteTime: [65, 65, 65, 65],   // ms per frame
        }, graphics);
        scorpionRender = renderer.AnimatedModel({
            spriteSheet: 'assets/scorpion.png',
            spriteCount: 4,
            spriteTime: [80, 80, 80, 80],   // ms per frame
        }, graphics);
        fleaRender = renderer.AnimatedModel({
            spriteSheet: 'assets/flea.png',
            spriteCount: 4,
            spriteTime: [70, 70, 70, 70],   // ms per frame
        }, graphics);
        shroomRender = renderer.AnimatedModel({
            spriteSheet: 'assets/shroom.png',
            spriteCount: 4,
            spriteTime: [200, 200, 200, 200],   // ms per frame
        }, graphics);
        squidRender = renderer.AnimatedModel({
            spriteSheet: 'assets/squid.png',
            spriteCount: 2,
            spriteTime: [100, 100],   // ms per frame
        }, graphics);

        
        
        keyboard.registerCommand(Brickout.UserKeys.get().up, paddle.moveUp)
        keyboard.registerCommand(Brickout.UserKeys.get().down, paddle.moveDown)
        keyboard.registerCommand(Brickout.UserKeys.get().left, paddle.moveLeft);
        keyboard.registerCommand(Brickout.UserKeys.get().right, paddle.moveRight);
        keyboard.registerCommand(Brickout.UserKeys.get().fire, ball.fire)
        keyboard.registerCommand(KeyEvent.DOM_VK_L, ball.die )
        // keyboard.registerCommand(Brickout.UserKeys.get().up, littleBird.moveForward);
        // keyboard.registerCommand(Brickout.UserKeys.get().left, littleBird.rotateLeft);
        // keyboard.registerCommand(Brickout.UserKeys.get().right, littleBird.rotateRight);
        // keyboard.registerCommand('ArrowUp', bigBird.moveForward);
        // keyboard.registerCommand('ArrowLeft', bigBird.rotateLeft);
        // keyboard.registerCommand('ArrowRight', bigBird.rotateRight);
    }
    
    //------------------------------------------------------------------
    //
    // Prepares a newly initialized game model, ready for the start of
    // the game.
    //
    //------------------------------------------------------------------
    function initialize() {
        //
        // Prepare the game over rendering position
        

        var textWidth = graphics.measureTextWidth(textGameOver),
            textHeight = graphics.measureTextHeight(textGameOver);
        textGameOver.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

        paddlesRemaining = 3;
        // let sound1 = new Audio();
        // sound1.src = 'audio/344310__musiclegends__laser-shoot.wav'
        // let sound2 = new Audio();
        // sound2.src = 'audio/344312__musiclegends__laser-shoot7.wav'
        // let sound3 = new Audio();
        // sound3.src = 'audio/450616__breviceps__8-bit-error.wav'
        
        initializePaddleAndBall();
        

        // bricks = components.Bricks({
        //     view: { width: 800, height: 600 }
        // });

        score = {
            total: 0,
            position: {x: 10, y: 10 },
            font: '32px Arial, sans-serif',
            fill: 'rgba(0, 0, 0, 1)',
            text: ''
        };

        //
        // Start in the countdown state
        elapsedCountdown = 3000;
        internalUpdate = updateCountdown;
        internalRender = renderCountdown;
    }

    //------------------------------------------------------------------
    //
    // Draw how many paddles remain
    //
    //------------------------------------------------------------------
    function renderPaddlesRemaining() {
        var item,
            left = 800 - ((paddle.width + 10) * 3);

        for (var item = 0; item < paddlesRemaining; item += 1) {
            graphics.drawRectangle({
                x: left,
                y: components.Constants.PaddleOffset,
                width: paddle.width,
                height: components.Constants.PaddleHeight,
                fill: 'rgba(255, 255, 255, 1)',
                stroke: 'rgba(0, 0, 0, 1)'
            });

            left += (paddle.width + 10);
        }
    }

    //------------------------------------------------------------------
    //
    // Draw the current score
    //
    //------------------------------------------------------------------
    function renderScore() {
        score.text = 'Score: ' + score.total;
        score.fill = 'rgba(255, 255, 255, 1)';
        graphics.drawText(score);
    }

    //------------------------------------------------------------------
    //
    // Update the state of the game while in countdown
    //
    //------------------------------------------------------------------
    function updateCountdown(elapsedTime) {
        elapsedCountdown -= elapsedTime;
        paddle.update(elapsedTime);
        //
        // Keep the ball centered on the paddle
        ball.centerX = paddle.center.x;
        //
        // Could be leftover particles
        particleSystem.update(elapsedTime);

        //
        // Once the countdown timer is down, switch to the playing state
        if (elapsedCountdown <= 0) {
            internalUpdate = updatePlaying;
            internalRender = renderPlaying;
        }
    }

    //------------------------------------------------------------------
    //
    // Render the state of the game while in countdown
    //
    //------------------------------------------------------------------
    function renderCountdown() {
        var number = Math.ceil(elapsedCountdown / 1000),
            countDown = {
                font: '128px Arial, sans-serif',
                fill: 'rgba(255, 255, 255, 1)',
                stroke: 'rgba(255, 0, 0, 1)',
                text: number.toString()
            },
            textWidth = graphics.measureTextWidth(countDown),
            textHeight = graphics.measureTextHeight(countDown);

        countDown.position = { x: 800 / 2 - textWidth / 2, y: 600 / 2 - textHeight };

        renderPlaying();
        //
        // Could be leftover particles, but draw them before the countdown text
        particleSystem.render();
        //
        // Draw the countdown numbers
        graphics.drawText(countDown);
    }

    //------------------------------------------------------------------
    //
    // Let the play know the game is over.
    //
    //------------------------------------------------------------------
    function renderGameOver() {
        renderPlaying();
        //
        // Could be leftover particles, but draw them before the game over text
        particleSystem.render();
        graphics.drawText(textGameOver);
    }

    //------------------------------------------------------------------
    //
    // Handle any keyboard input
    //
    //------------------------------------------------------------------
    function processInput(elapsedTime) {
        keyboard.update(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // Perform an update on the ball.  Check if it fell through the bottom,
    // and start a new one or game over based upon that change.
    //
    //------------------------------------------------------------------
    function updateBall(elapsedTime) {
        
        var arr = ball.update(elapsedTime)
        if (arr[0]) {
            //
            // This means the ball fell through the bottom, reduce number
            // of paddles remaining, reposition the paddle & ball and change states.
            paddlesRemaining -= 1;
            elapsedCountdown = 3000;
            initializePaddleAndBall();
            if (paddlesRemaining === 0) {
                //
                // Update the high scores
                Brickout.HighScores.add(score.total);
                internalUpdate = function() { particleSystem.update(elapsedTime);  }; // Could be leftover particles
                internalRender = renderGameOver;
            } else {
                internalUpdate = updateCountdown;
                internalRender = renderCountdown;
            }
        }
        if (arr[1]){
            ball.centerX = paddle.center.x
            ball.centerY = paddle.center.y - 20
        }
    }

    //------------------------------------------------------------------
    //
    // Update the state of the game while playing
    //
    //------------------------------------------------------------------
    function updatePlaying(elapsedTime) {
        // var bricksHit = [],
        //     brick;

        paddle.update(elapsedTime);
        updateBall(elapsedTime);
        // bricks.update(elapsedTime);
        particleSystem.update(elapsedTime);
        spiderRender.update(elapsedTime);
        squidRender.update(elapsedTime);
        centipedeRender.update(elapsedTime);
        centipedeHeadRender.update(elapsedTime);
        scorpionRender.update(elapsedTime);
        shroomRender.update(elapsedTime);
        fleaRender.update(elapsedTime);

        if(spider.intersectBall(ball)){
            spider.moveForward(elapsedTime);
            score.total += 400;
        }
        if(shroom.intersectBall(ball)){
            shroom.moveForward(elapsedTime);
            score.total += 4;
        }
        if(centipede.intersectBall(ball)){
            centipede.moveForward(elapsedTime);
            score.total += 10;
        }
        if(centipedeHead.intersectBall(ball)){
            centipedeHead.moveForward(elapsedTime);
            score.total += 100;
        }
        if(squid.intersectBall(ball)){
            squid.moveForward(elapsedTime);
            score.total += 200;
        }
        if(flea.intersectBall(ball)){
            flea.moveForward(elapsedTime);
            score.total += 200;
        }
        if(scorpion.intersectBall(ball)){
            scorpion.moveForward(elapsedTime);
            score.total += 1000;
        }
        


        //
        // Check to see if the ball and paddle collided with each other
        if (paddle.intersectBall(ball)) {
            // ball.centerX = paddle.center.x
            // ball.centerY = paddle.center.y - 20
        }
        //
        // Check to see if we have a brick-ball collision
        // bricksHit = bricks.intersectBall(ball);
        // if (bricksHit.length > 0) {
        //     ball.reflectY();

        //     //
        //     // Initiate particle effects for each brick hit
        //     for (brick = 0; brick < bricksHit.length; brick += 1) {
        //         particleSystem.createEffect( {
        //             left: bricksHit[brick].left,
        //             right: bricksHit[brick].right,
        //             top: bricksHit[brick].top,
        //             bottom: bricksHit[brick].bottom,
        //         });
        //     }
        //     //
        //     // Update score based upon the bricks hit
        //     for (brick = 0; brick < bricksHit.length; brick += 1) {
        //         score.total += bricksHit[brick].score;
        //     }
        // }
    }

    //------------------------------------------------------------------
    //
    // Render the state of the game while playing
    //
    //------------------------------------------------------------------
    function renderPlaying() {
        // bricks.render(graphics);
        paddle.render(graphics);
        ball.render(graphics);
        centipedeRender.render(centipede);
        centipedeHeadRender.render(centipedeHead);
        scorpionRender.render(scorpion);
        squidRender.render(squid);
        spiderRender.render(spider);
        fleaRender.render(flea);
        shroomRender.render(shroom);
        
        renderPaddlesRemaining();
        renderScore();

        //
        // Render this last so it draws over everything
        particleSystem.render();
    }

    //------------------------------------------------------------------
    //
    // Update the state of the game model based upon the passage of time.
    //
    //------------------------------------------------------------------
    function update(elapsedTime) {
        internalUpdate(elapsedTime);
    }

    //------------------------------------------------------------------
    //
    // Render the current state of the game model.
    //
    //------------------------------------------------------------------
    function render() {
        internalRender();
    }

    return {
        initialize: initialize,
        processInput: processInput,
        update: update,
        render: render
    };
}(Brickout.components, Brickout.graphics, Brickout.input, Brickout.render));
