Brickout.UserKeys = (function() {
    'use strict';

    var Constants = {
        get MaxScores() { return 5; },
        get StorageName() { return 'Brickout.userkeys'; }
    };

    var keys = [],
        previousScores = localStorage.getItem(Constants.StorageName);
    var keyz = {
        up: KeyEvent.DOM_VK_UP,
        down: KeyEvent.DOM_VK_DOWN,
        left: KeyEvent.DOM_VK_LEFT,
        right: KeyEvent.DOM_VK_RIGHT,
        fire: KeyEvent.DOM_VK_SPACE
        };
    if (previousScores !== null) {
        keyz = JSON.parse(previousScores);
    }

    // ------------------------------------------------------------------
    //
    // Public method that allows client code to report a new score.  The
    // score may or may not be kept, depending upon whether or not it is
    // one of the top scores.
    //
    // ------------------------------------------------------------------
    function change(keyDirection,newKey){
        if(keyDirection=="up"){
            keyz.up = newKey
        }
        if(keyDirection=="down"){
            keyz.down = newKey
        }
        if(keyDirection=="left"){
            keyz.left = newKey
        }
        if(keyDirection=="right"){
            keyz.right = newKey
        }
        if(keyDirection=="fire"){
            keyz.fire = newKey
        }
        
        
        localStorage[Constants.StorageName] = JSON.stringify(keyz)
    }
    function add(score) {
        // scores.push(score);
        // scores.sort(function(a, b) {
        //     if (a > b) {
        //         return -1;
        //     } else if (a < b) {
        //         return 1;
        //     }

        //     return 0;
        // });

        // //
        // // Keep only the best five
        // if (scores.length > Constants.MaxScores) {
        //     scores = scores.slice(0, Constants.MaxScores);
        // }

        // localStorage[Constants.StorageName] = JSON.stringify(scores);
    }

    function get() {
        return keyz;
    }

    return {
        change: change,
        get : get
    };
}());
