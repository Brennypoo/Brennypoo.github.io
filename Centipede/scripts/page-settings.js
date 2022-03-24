Brickout.pages['page-settings'] = (function(screens) {

    function initialize() {
        document.getElementById('id-settings-back').addEventListener(
            'click',
            function() {
                document.getElementById('id-settings-alert').innerHTML=''
                screens.showScreen('page-mainmenu'); 
            });
        document.getElementById('id-settings-up').addEventListener(
            'click', 
            function getNextKey() {
                this.addEventListener('keydown',event => {
                    console.log(event.keyCode)
                    Brickout.UserKeys.change("up",event.keyCode)
                    document.getElementById('id-settings-alert').innerHTML='keybinding changed'
                    removeEventListener('keydown',getNextKey,false)
                  },{once:true})
            });
        document.getElementById('id-settings-down').addEventListener(
            'click', 
            function getNextKey() {
                this.addEventListener('keydown',event => {
                    console.log(event.keyCode)
                    Brickout.UserKeys.change("down",event.keyCode)
                    document.getElementById('id-settings-alert').innerHTML='keybinding changed'
                    removeEventListener('keydown',getNextKey,false)
                  },{once:true})
            });
        document.getElementById('id-settings-left').addEventListener(
            'click', 
            function getNextKey() {
                this.addEventListener('keydown',event => {
                    console.log(event.keyCode)
                    Brickout.UserKeys.change("left",event.keyCode)
                    document.getElementById('id-settings-alert').innerHTML='keybinding changed'
                    removeEventListener('keydown',getNextKey,false)
                  },{once:true})
            });
        document.getElementById('id-settings-right').addEventListener(
            'click', function getNextKey() {
                this.addEventListener('keydown',event => {
                    console.log(event.keyCode)
                    Brickout.UserKeys.change("right",event.keyCode)
                    document.getElementById('id-settings-alert').innerHTML='keybinding changed'
                    removeEventListener('keydown',getNextKey,false)
                  },{once:true})
            });
        document.getElementById('id-settings-fire').addEventListener(
            'click', function getNextKey() {
                this.addEventListener('keydown',event => {
                    console.log(event.keyCode)
                    Brickout.UserKeys.change("fire",event.keyCode)
                    document.getElementById('id-settings-alert').innerHTML='keybinding changed'
                    removeEventListener('keydown',getNextKey,false)
                    },{once:true})
            });
        
            
    }

    

    function displayKeys() {
        var userkeys = Brickout.UserKeys.get(),
            highScoresHTML = document.getElementById('user-keys-list');

        //
        // Clear whatever was already in the display
        // highScoresHTML.innerHTML = '';
        //
        // Grab the previously saved high scores and get them displayed
        
        // highScoresHTML.innerHTML += ('up:' + userkeys.up.toString() + '<br/>');
        // highScoresHTML.innerHTML += ('down:' + userkeys.down.toString() + '<br/>');
        // highScoresHTML.innerHTML += ('left:' + userkeys.left.toString() + '<br/>');
        // highScoresHTML.innerHTML += ('right:' + userkeys.right.toString() + '<br/>');
        
    }

    function run() {
        displayKeys();
    }

    return {
        initialize : initialize,
        run : run
    };
}(Brickout.screens));