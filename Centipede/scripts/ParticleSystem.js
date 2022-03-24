function ParticleSystem(graphics) {
    'use strict';
    var that = {},
        image = new Image(),
        particles = {},    // Set of all active particles
        nextName = 1;    // Unique identifier for the next particle

    //------------------------------------------------------------------
    //
    // Create a bunch of particles over the surface of the brick.
    //
    //------------------------------------------------------------------
    that.createEffect = function(spec) {
        var x,
            y,
            deltaX = (spec.right - spec.left) / 10,
            deltaY = (spec.bottom - spec.top) / 10, // bottom - top : remember that Y is position down the screen
            posX,
            posY;

        spec.speed = {
            mean: 40,    // pixels per second
            stdev: 25
        };
        spec.lifetime = {
            mean: 2000,
            stdev: 500
        };

        //
        // Create particles over the area of the brick
        for (x = 0; x < 10; x++) {
            posX = Math.trunc(spec.left + x * deltaX);
            for (y = 0; y < 10; y++) {
                posY = Math.trunc(spec.top + y * deltaY);
                //
                // Assign a unique name to each particle
                particles[nextName++] = makeParticle(spec, posX, posY);
            }
        }
    };

    //------------------------------------------------------------------
    //
    // This creates one new particle
    //
    //------------------------------------------------------------------
    function makeParticle(spec, x, y) {
        var p = {
            image: image,
            size: Math.abs(Random.nextGaussian(10, 4)),
            center: {x: x, y: y},
            direction: {x: 0, y: Math.abs(Random.nextGaussian(1, 0.25)) },
            speed: Math.abs(Random.nextGaussian(spec.speed.mean, spec.speed.stdev)), // pixels per second
            rotation: 0,
            lifetime: Math.abs(Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)),    // How long the particle should live, in milliseconds
            alive: 0    // How long the particle has been alive, in milliseconds
        };

        return p;
    };

    //------------------------------------------------------------------
    //
    // Update the state of all particles.  This includes removing any that
    // have exceeded their lifetime.
    //
    //------------------------------------------------------------------
    that.update = function(elapsedTime) {
        var removeMe = [],
            value,
            particle;

        for (value in particles) {
            if (particles.hasOwnProperty(value)) {
                particle = particles[value];
                //
                // Update its position
                particle.center.x += ((elapsedTime / 1000) * particle.speed * particle.direction.x);
                particle.center.y += ((elapsedTime / 1000) * particle.speed * particle.direction.y);

                //
                // Rotate proportional to its speed
                particle.rotation += particle.speed / 500;

                //
                // Update how long it has been alive
                particle.alive += elapsedTime;

                //
                // If the lifetime has expired, identify it for removal
                if (particle.alive > particle.lifetime) {
                    removeMe.push(value);
                }
            }
        }

        //
        // Remove all of the expired particles
        for (particle = 0; particle < removeMe.length; particle++) {
            delete particles[removeMe[particle]];
        }
    };

    //------------------------------------------------------------------
    //
    // Initially empty, will be replaced when the texture is loaded
    //
    //------------------------------------------------------------------
    that.render = function() {
    }

    image.src = 'textures/Explosion.png';
    image.onload = function() {
        that.render = function() {
            var value,
                particle;

            for (value in particles) {
                if (particles.hasOwnProperty(value)) {
                    particle = particles[value];
                    graphics.drawImage(particle);
                }
            }
        };
    };

    return that;
}
