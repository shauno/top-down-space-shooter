/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

(function() {
    // create global namespace
    window.game = {};
    game.inited = false;
    game.input = {};
    game.tilt = {};
    game.frameDelayCount = {shoot: 0};
    game.bullets = [];


    window.addEventListener('load', function() {game.init();}, false);
    window.addEventListener('deviceready', function() {game.init();}, false);

    game.init = function() {
        if(!game.inited) { //make sure only inited once, even if mulitple 'ready' events are fired by weird devices / browsers
            game.inited = true;

            //create the stage, and set to biggest 16/9 size possible
            game.stage = new createjs.Stage("stage");

            game.windowWidth = window.innerWidth;
            game.windowHeight = window.innerHeight;

            if((16 / 9) > (game.windowWidth / game.windowHeight)) {
                game.windowHeight = (game.windowWidth / 16) * 9;
                document.getElementById('stage').style.marginTop = ((window.innerHeight - game.windowHeight) / 2)+'px';
            }else{
                game.windowWidth = (game.windowHeight / 9) * 16;
                document.getElementById('stage').style.marginLeft = ((window.innerWidth - game.windowWidth) / 2)+'px';
            }

            document.getElementById('stage').width = game.windowWidth;
            document.getElementById('stage').height = game.windowHeight;

            game.bindEvents();

            game.player = new Player();
            game.player.load(game.stage, 0, 50);

            createjs.Ticker.addEventListener("tick", function() {game.tick();});
            createjs.Ticker.setFPS(60);
        }
    };

    game.tick = function() {
        game.player.updateVelocity(game.input, game.tilt);
        game.player.move();
        game.stage.update();

        game.player.shoot(game.stage, game.input);

        for(var i=0; i<game.bullets.length; i++) {
            if(game.bullets[i] != undefined) {
                game.bullets[i].move();

                if(game.bullets[i].offScreen) {
                    //stage.removeChild(bullets[i].sprite);
                    game.bullets.splice(i, 1);
                }
            }
        }

        game.stage.update();

        for(var i in game.frameDelayCount) {
            if(game.frameDelayCount[i] > 0) {
                game.frameDelayCount[i]--;
            }
        }
    };

    game.bindEvents = function() {
        //listen for keyboard input
        window.addEventListener('keydown', function(e) {
            game.input[e.keyCode] = true;
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
               e.preventDefault();
            }
            //e.preventDefault();
        });
        window.addEventListener('keyup', function(e) {
            delete game.input[e.keyCode];
        });
        window.addEventListener("touchstart", function() {
            game.input[32] = true;
        }, false);

        window.addEventListener("touchend", function() {
            delete game.input[32];
        }, false);

        if(typeof(navigator.accelerometer) != 'undefined') {
            navigator.accelerometer.watchAcceleration(function(acceleration) {
                game.tilt.horizontal = acceleration.y;
                game.tilt.vertical = acceleration.x;
            }, function() {
                alert('Doh, some device motion error :(');
            }, {frequency: 100});

            /*
            window.addEventListener("deviceorientation", function(event) {
                tilt.horizontal = event.gamma;
                tilt.vertical = event.beta;
            }, true);
            */
        }

    };
}());