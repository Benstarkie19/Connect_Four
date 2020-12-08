'use strict';



;define("connectfour/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("connectfour/app", ["exports", "ember-resolver", "ember-load-initializers", "connectfour/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("connectfour/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("connectfour/components/four", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    {{#if playing}}
    {{#if desktop}}
      <div class="text-center">
        <button {{action "start"}}>Restart the game</button>
      </div>
    {{else}}
      <div class="text-center">
        <button  {{action "start"}}>Restart the game</button>
      </div>
    {{/if}}
    {{#if winner}}
      <div class="game-message">
        '{{winner}}'Player Won!
      </div>
    {{/if}}
    {{#if draw}}
      <div class="game-message">
        Draw.
      </div>
    {{/if}}
  {{else}}
    {{#if desktop}}
      <div class="text-center">
        <button {{action "start"}}>Start Game!</button>
      </div>
    {{else}}
      <div class="text-center">
        <button {{action "start"}}>Start Game!</button>
      </div>
    {{/if}}
  {{/if}}
  
  <canvas id="stage" width="360" height="400"></canvas>
  */
  {
    "id": "aUx4yI05",
    "block": "{\"symbols\":[],\"statements\":[[6,[37,2],[[35,5]],null,[[\"default\",\"else\"],[{\"statements\":[[6,[37,2],[[35,1]],null,[[\"default\",\"else\"],[{\"statements\":[[2,\"    \"],[10,\"div\"],[14,0,\"text-center\"],[12],[2,\"\\n      \"],[11,\"button\"],[4,[38,0],[[32,0],\"start\"],null],[12],[2,\"Restart the game\"],[13],[2,\"\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]},{\"statements\":[[2,\"    \"],[10,\"div\"],[14,0,\"text-center\"],[12],[2,\"\\n      \"],[11,\"button\"],[4,[38,0],[[32,0],\"start\"],null],[12],[2,\"Restart the game\"],[13],[2,\"\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[6,[37,2],[[35,3]],null,[[\"default\"],[{\"statements\":[[2,\"    \"],[10,\"div\"],[14,0,\"game-message\"],[12],[2,\"\\n      '\"],[1,[34,3]],[2,\"'Player Won!\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]],[6,[37,2],[[35,4]],null,[[\"default\"],[{\"statements\":[[2,\"    \"],[10,\"div\"],[14,0,\"game-message\"],[12],[2,\"\\n      Draw.\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]]],\"parameters\":[]},{\"statements\":[[6,[37,2],[[35,1]],null,[[\"default\",\"else\"],[{\"statements\":[[2,\"    \"],[10,\"div\"],[14,0,\"text-center\"],[12],[2,\"\\n      \"],[11,\"button\"],[4,[38,0],[[32,0],\"start\"],null],[12],[2,\"Start Game!\"],[13],[2,\"\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]},{\"statements\":[[2,\"    \"],[10,\"div\"],[14,0,\"text-center\"],[12],[2,\"\\n      \"],[11,\"button\"],[4,[38,0],[[32,0],\"start\"],null],[12],[2,\"Start Game!\"],[13],[2,\"\\n    \"],[13],[2,\"\\n\"]],\"parameters\":[]}]]]],\"parameters\":[]}]]],[2,\"\\n\"],[10,\"canvas\"],[14,1,\"stage\"],[14,\"width\",\"360\"],[14,\"height\",\"400\"],[12],[13]],\"hasEval\":false,\"upvars\":[\"action\",\"desktop\",\"if\",\"winner\",\"draw\",\"playing\"]}",
    "meta": {
      "moduleName": "connectfour/components/four.hbs"
    }
  });
  /* eslint-disable ember/no-jquery */


  // Minimax

  /*
  Determine all possible moves for the current state
  Determine all possible moves for all the possible moves calculated in 1. Repeat 2 for as many levels as you want to look ahead. This creates the game tree, representing sequences of possible moves.
  For the leaf nodes calculate the heuristic score
  Move back up the game tree, aggregating the scores for all of a position's next moves.
  If at the current position the computer player is to play, the score for the current position is the minimum score of the next moves' scores.
  If it is the human to play, the score for the current position is the maximum of the next moves' scores.
  */
  //https://teaching.computing.edgehill.ac.uk/wte/parts/5123
  function deepClone(state) {
    var new_state = [];

    for (var idx1 = 0; idx1 < state.length; idx1++) {
      new_state.push(state[idx1].slice(0));
    }

    return new_state;
  } // https://teaching.computing.edgehill.ac.uk/wte/parts/5121?page=5121
  // Keep reading this 


  function gamewinner(state) {
    var patterns = [[[0, 0], [1, 1], [2, 2], [3, 3]], [[0, 1], [1, 2], [2, 3], [3, 4]], [[0, 2], [1, 3], [2, 4], [3, 5]], [[1, 0], [2, 1], [3, 2], [4, 3]], [[1, 1], [2, 2], [3, 3], [4, 4]], [[1, 2], [2, 3], [3, 4], [4, 5]], [[2, 1], [3, 2], [4, 3], [5, 4]], [[2, 0], [3, 1], [4, 2], [5, 3]], [[2, 2], [3, 3], [4, 4], [5, 5]], [[3, 0], [4, 1], [5, 2], [6, 3]], [[3, 2], [4, 3], [5, 4], [6, 5]], [[3, 1], [4, 2], [5, 3], [6, 4]], [[6, 0], [5, 1], [4, 2], [3, 3]], [[6, 1], [5, 2], [4, 3], [3, 4]], [[4, 0], [3, 1], [2, 2], [1, 3]], [[4, 1], [3, 2], [2, 3], [1, 4]], [[4, 2], [3, 3], [2, 4], [1, 5]], [[3, 0], [2, 1], [1, 2], [0, 3]], [[6, 2], [5, 3], [4, 4], [3, 5]], [[5, 0], [4, 1], [3, 2], [2, 3]], [[5, 1], [4, 2], [3, 3], [2, 4]], [[5, 2], [4, 3], [3, 4], [2, 5]], [[3, 1], [2, 2], [1, 3], [0, 4]], [[3, 2], [2, 3], [1, 4], [0, 5]], [[0, 5], [1, 5], [2, 5], [3, 5]], [[1, 5], [2, 5], [3, 5], [4, 5]], [[2, 5], [3, 5], [4, 5], [5, 5]], [[3, 5], [4, 5], [5, 5], [6, 5]], [[0, 4], [1, 4], [2, 4], [3, 4]], [[1, 4], [2, 4], [3, 4], [4, 4]], [[2, 4], [3, 4], [4, 4], [5, 4]], [[3, 3], [4, 3], [5, 3], [6, 3]], [[0, 2], [1, 2], [2, 2], [3, 2]], [[3, 4], [4, 4], [5, 4], [6, 4]], [[0, 3], [1, 3], [2, 3], [3, 3]], [[1, 3], [2, 3], [3, 3], [4, 3]], [[2, 3], [3, 3], [4, 3], [5, 3]], [[1, 2], [2, 2], [3, 2], [4, 2]], [[2, 2], [3, 2], [4, 2], [5, 2]], [[3, 2], [4, 2], [5, 2], [6, 2]], [[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 1], [2, 1], [3, 1], [4, 1]], [[2, 1], [3, 1], [4, 1], [5, 1]], [[3, 1], [4, 1], [5, 1], [6, 1]], [[0, 0], [1, 0], [2, 0], [3, 0]], [[1, 0], [2, 0], [3, 0], [4, 0]], [[2, 0], [3, 0], [4, 0], [5, 0]], [[3, 0], [4, 0], [5, 0], [6, 0]], [[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [0, 2], [0, 3], [0, 4]], [[0, 2], [0, 3], [0, 4], [0, 5]], [[1, 0], [1, 1], [1, 2], [1, 3]], [[1, 1], [1, 2], [1, 3], [1, 4]], [[1, 2], [1, 3], [1, 4], [1, 5]], [[2, 0], [2, 1], [2, 2], [2, 3]], [[2, 1], [2, 2], [2, 3], [2, 4]], [[2, 2], [2, 3], [2, 4], [2, 5]], [[3, 0], [3, 1], [3, 2], [3, 3]], [[3, 1], [3, 2], [3, 3], [3, 4]], [[3, 2], [3, 3], [3, 4], [3, 5]], [[4, 0], [4, 1], [4, 2], [4, 3]], [[4, 1], [4, 2], [4, 3], [4, 4]], [[4, 2], [4, 3], [4, 4], [4, 5]], [[5, 0], [5, 1], [5, 2], [5, 3]], [[5, 1], [5, 2], [5, 3], [5, 4]], [[5, 2], [5, 3], [5, 4], [5, 5]], [[6, 0], [6, 1], [6, 2], [6, 3]], [[6, 1], [6, 2], [6, 3], [6, 4]], [[6, 2], [6, 3], [6, 4], [6, 5]]];

    for (var pidx = 0; pidx < patterns.length; pidx++) {
      var pattern = patterns[pidx];
      var winner = state[pattern[0][0]][pattern[0][1]];

      if (winner) {
        for (var idx = 1; idx < pattern.length; idx++) {
          if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
            winner = undefined;
            break;
          }
        }

        if (winner) {
          return winner;
        }
      }
    } // eslint-disable-next-line no-unused-vars


    var draw = true;

    for (var x = 0; x <= 6; x++) {
      for (var y = 0; y <= 5; y++) {
        if (!state[x][y]) {
          return undefined;
        }
      }
    }

    return '';
  }

  var patterns = [{
    pattern: [['p', 0, 1], ['p', 0, 1], ['p', 0, 1], ['p']],
    score: 1000
  }, {
    pattern: [['p', 1, 0], ['p', 1, 0], ['p', 1, 0], ['p']],
    score: 1000
  }, {
    pattern: [['p', 1, 1], ['p', 1, 1], ['p', 1, 1], ['p']],
    score: 1000
  }, {
    pattern: [['p', 1, -1], ['p', 1, -1], ['p', 1, -1], ['p']],
    score: 1000
  }, {
    pattern: [['p', -1, 1], ['p', -1, 1], ['p', -1, 1], ['p']],
    score: 1000
  }, {
    pattern: [['p', -1, -1], ['p', -1, -1], ['p', -1, -1], ['p']],
    score: 1000
  }, {
    pattern: [['p', 0, 1], ['p', 0, 1], ['p']],
    score: 50
  }, {
    pattern: [['p', 1, 0], ['p', 1, 0], ['p']],
    score: 50
  }, {
    pattern: [['p', 1, 1], ['p', 1, 1], ['p']],
    score: 50
  }, {
    pattern: [['p', 1, -1], ['p', 1, -1], ['p']],
    score: 50
  }, {
    pattern: [['p', -1, 1], ['p', -1, 1], ['p']],
    score: 50
  }, {
    pattern: [['p', -1, -1], ['p', -1, -1], ['p']],
    score: 50
  }]; //app/components/tic-tac-toe
  //teaching.computing.edgehill.ac.uk/wte/parts/5124

  /*
  The next step in developing the heuristic is to implement the match_pattern function, 
  which checks if the given pattern matches anywhere in the current state for the given player. 
  */

  function match_pattern(state, pattern, player) {
    for (var idx1 = 0; idx1 < state.length; idx1++) {
      for (var idx2 = 0; idx2 < state[idx1].length; idx2++) {
        var matches = match_pattern_at(state, pattern, player, idx1, idx2);

        if (matches) {
          return true;
        }
      }
    }

    return false;
  } //teaching.computing.edgehill.ac.uk/wte/parts/5124
  //new heuristic function loops over a list of patterns. 
  //Then it uses a new match_pattern function to test if the pattern matches for that player


  function heuristic(state) {
    var score = 0;

    for (var idx = 0; idx < patterns.length; idx++) {
      if (match_pattern(state, patterns[idx].pattern, 'Green')) {
        // For the green marker
        score = score + patterns[idx].score;
      }

      if (match_pattern(state, patterns[idx].pattern, 'White')) {
        // For the white marker
        score = score - patterns[idx].score;
      }
    }

    return score;
  } //teaching.computing.edgehill.ac.uk/wte/parts/5124
  //week 4

  /*
  The first two lines of the code check that the x and y co-ordinates that are the next co-ordinates 
  to check the next pattern element against are still within the limits of the state. 
  Then, we get the first element out of the pattern and apply a number of tests.
  */


  function match_pattern_at(state, pattern, player, x, y) {
    if (x >= 0 && x < state.length) {
      if (y >= 0 && y < state[x].length) {
        var element = pattern[0];

        if (element[0] == 'p') {
          if (state[x][y] !== player) {
            return false;
          }
        } else if (element[0] == ' ') {
          if (state[x][y] !== undefined) {
            return false;
          }
        }

        if (pattern.length > 1) {
          return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2]);
        } else {
          return true;
        }
      }
    }

    return false;
  } //  https://teaching.computing.edgehill.ac.uk/wte/parts/5123?page=5123


  function minimax(state, limit, player) {
    var moves = [];

    if (limit > 0) {
      for (var idx1 = 0; idx1 < 7; idx1++) {
        for (var idx2 = 0; idx2 < 6; idx2++) {
          if (state[idx1][idx2] === undefined) {
            idx2 = 5;

            while (state[idx1][idx2]) {
              idx2 = idx2 - 1;
            }

            if (idx2 >= 0) {
              var move = {
                x: idx1,
                y: idx2,
                state: deepClone(state),
                score: 0
              };
              move.state[idx1][idx2] = player;

              if (limit === 1 || gamewinner(move.state) !== undefined) {
                move.score = heuristic(move.state);
              } else {
                move.moves = minimax(move.state, limit - 1, player == 'White' ? 'Green' : 'White');
                var score = undefined;

                for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                  if (score === undefined) {
                    score = move.moves[idx3].score;
                  } else if (player === 'White') {
                    score = Math.max(score, move.moves[idx3].score);
                  } else if (player === 'Green') {
                    score = Math.min(score, move.moves[idx3].score);
                  }
                }

                move.score = score;
              }

              moves.push(move);
            }
          }
        }
      }
    }

    return moves;
  }

  function computer_player(state) {
    var moves = minimax(state, 4, 'Green');
    var max_score = undefined;
    var move = undefined;

    for (var idx = 0; idx < moves.length; idx++) {
      if (max_score === undefined || moves[idx].score > max_score) {
        max_score = moves[idx].score;
        move = {
          x: moves[idx].x,
          y: moves[idx].y
        };
      }
    }

    return move;
  }

  var _default = Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, Ember.Component.extend({
    didInsertElement: function () {
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line ember/no-jquery
      // eslint-disable-next-line no-undef
      // eslint-disable-next-line ember/no-jquery
      // eslint-disable-next-line no-undef
      var stage = new createjs.Stage(this.$('#stage')[0]); // eslint-disable-next-line no-undef

      var board = new createjs.Shape();
      var graphics = board.graphics;
      graphics.beginFill('#bf5a5a');
      graphics.drawRect(0, 0, 400, 2);
      graphics.drawRect(400, 0, 2, 300);
      graphics.drawRect(0, 0, 2, 300);
      graphics.drawRect(0, 300, 400, 2);
      graphics.drawRect(50, 0, 2, 300);
      graphics.drawRect(100, 0, 2, 300);
      graphics.drawRect(150, 0, 2, 300);
      graphics.drawRect(200, 0, 2, 300);
      graphics.drawRect(250, 0, 2, 300);
      graphics.drawRect(300, 0, 2, 300);
      graphics.drawRect(0, 50, 400, 2);
      graphics.drawRect(0, 100, 400, 2);
      graphics.drawRect(0, 150, 400, 2);
      graphics.drawRect(0, 200, 400, 2);
      graphics.drawRect(0, 250, 400, 2);
      board.x = 15;
      board.y = 40;
      board.alpha = 0;
      this.set('board', board);
      stage.addChild(board);
      var markers = {
        'White': [],
        'Green': []
      };

      for (var x = 0; x < 21; x++) {
        // Makes the whilte marker 
        var WhiteMarker = new createjs.Shape();
        graphics = WhiteMarker.graphics;
        graphics.beginFill('#ffffff');
        graphics.drawCircle(0, 0, 20);
        graphics.endFill();
        WhiteMarker.visible = false;
        stage.addChild(WhiteMarker);
        markers.White.push(WhiteMarker); // Makes the green marker 

        var GreenMarker = new createjs.Shape();
        graphics = GreenMarker.graphics;
        graphics.beginFill('#ffb200');
        graphics.drawCircle(0, 0, 20);
        graphics.endFill();
        GreenMarker.visible = false;
        stage.addChild(GreenMarker);
        markers.Green.push(GreenMarker);
      }

      this.set('markers', markers);
      this.set('stage', stage);
      createjs.Ticker.addEventListener("tick", stage);
    },
    // https://teaching.computing.edgehill.ac.uk/wte/parts/5121?page=5121
    click: function (ev) {
      var component = this;

      if (component.get('playing') && !component.get('winner')) {
        if (ev.target.tagName.toLowerCase() == 'canvas' && ev.offsetX >= 20 && ev.offsetY >= 40 && ev.offsetX < 360 && ev.offsetY < 340) {
          var x = Math.floor((ev.offsetX - 20) / 50);
          var y = Math.floor((ev.offsetY - 40) / 50);
          var state = component.get('state');
          var y = 5;

          while (state[x][y]) {
            y = y - 1;
          }

          if (!state[x][y] & y >= 0) {
            state[x][y] = 'White';
            var move_count = component.get('moves')['White'];
            var marker = component.get('markers')['White'][move_count];
            marker.visible = true;
            marker.x = 41 + x * 50;
            marker.y = 66 + y * 50;
            component.check_winner();
            component.get('moves')['White'] = move_count + 1;
            setTimeout(function () {
              if (!component.get('winner') && !component.get('draw')) {
                var move = computer_player(state);
                move_count = component.get('moves')['Green'];
                state[move.x][move.y] = 'Green';
                marker = component.get('markers')['Green'][move_count];
                marker.visible = true;
                marker.x = 41 + move.x * 50;
                marker.y = 66 + move.y * 50;
                component.get('moves')['Green'] = move_count + 1;
                component.get('stage').update();
                component.check_winner();
              }
            }, 600);
          }
        }
      }
    },
    check_winner: function () {
      var state = this.get('state');
      var winner = gamewinner(state);

      if (winner !== undefined) {
        if (winner === '') {
          this.set('draw', true);
        } else {
          this.set('winner', winner);

          if (winner === 'White') {}
        }
      }
    },
    actions: {
      start: function () {
        var board = this.get('board');
        board.alpha = 0;

        if (this.get('playing')) {
          var markers = this.get('markers');

          for (var idx = 0; idx < 21; idx++) {
            createjs.Tween.get(markers.White[idx]).to({
              y: 600
            }, 500);
            createjs.Tween.get(markers.Green[idx]).to({
              y: 600
            }, 500);
          }

          createjs.Tween.get(board).wait(500).to({
            alpha: 1
          }, 1000);
        } else {
          createjs.Tween.get(board).to({
            alpha: 1
          }, 1000);
        }

        this.set('playing', true);
        this.set('winner', undefined);
        this.set('draw', undefined);
        this.set('state', [[undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined], [undefined, undefined, undefined, undefined, undefined, undefined]]);
        this.set('moves', {
          'White': 0,
          'Green': 0
        });
        var markers = this.get('markers');
        this.get('stage').update();
        this.set('player', 'White');
      }
    }
  }));

  _exports.default = _default;
});
;define("connectfour/components/stylish-button", ["exports", "ember-stylish-buttons/components/stylish-button"], function (_exports, _stylishButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _stylishButton.default;
    }
  });
});
;define("connectfour/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("connectfour/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("connectfour/helpers/app-version", ["exports", "connectfour/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("connectfour/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("connectfour/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("connectfour/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "connectfour/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("connectfour/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("connectfour/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("connectfour/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("connectfour/initializers/export-application-global", ["exports", "connectfour/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("connectfour/instance-initializers/ember-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* exists only for things that historically used "after" or "before" */
  var _default = {
    name: 'ember-data',

    initialize() {}

  };
  _exports.default = _default;
});
;define("connectfour/router", ["exports", "connectfour/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route("maingame", {
      path: "/"
    });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("connectfour/routes/maingame", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class MaingameRoute extends Ember.Route {}

  _exports.default = MaingameRoute;
});
;define("connectfour/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("connectfour/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("connectfour/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("connectfour/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("connectfour/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "BA2UjVfj",
    "block": "{\"symbols\":[],\"statements\":[[10,\"link\"],[14,6,\"https://fonts.googleapis.com/css2?family=Fredoka+One&family=Open+Sans:wght@300&display=swap\"],[14,\"rel\",\"stylesheet\"],[12],[13],[2,\"\\n\"],[10,\"section\"],[14,1,\"app\"],[12],[2,\"\\n  \"],[10,\"header\"],[12],[2,\"\\n    \"],[10,\"h1\"],[12],[2,\"Connect Four\"],[13],[2,\"\\n    \"],[10,\"div\"],[14,0,\"text-center\"],[12],[2,\" \"],[13],[2,\"\\n  \"],[13],[2,\"\\n  \"],[10,\"article\"],[14,1,\"height\"],[12],[2,\"\\n  \"],[13],[2,\"\\n      \"],[10,\"div\"],[14,0,\"choose-player-options\"],[12],[2,\"\\n        \"],[10,\"p\"],[12],[2,\"Who Playing First Then?\"],[13],[2,\"\\n        \"],[10,\"div\"],[14,0,\"form-group\"],[12],[2,\"\\n          \"],[10,\"input\"],[14,1,\"you\"],[14,3,\"player\"],[14,2,\"you\"],[14,\"checked\",\"\"],[14,4,\"radio\"],[12],[13],[2,\"\\n          \"],[10,\"label\"],[14,\"for\",\"you\"],[12],[2,\"You\"],[13],[2,\"\\n        \"],[13],[2,\"\\n        \"],[10,\"div\"],[14,0,\"form-group\"],[12],[2,\"\\n          \"],[10,\"input\"],[14,1,\"api\"],[14,3,\"player\"],[14,2,\"api\"],[14,4,\"radio\"],[12],[13],[2,\"\\n          \"],[10,\"label\"],[14,\"for\",\"api\"],[12],[2,\"AI\"],[13],[2,\"\\n        \"],[13],[2,\"\\n      \"],[13],[2,\" \\n  \"],[10,\"footer\"],[12],[2,\"\\n    \"],[10,\"div\"],[14,0,\"float-left\"],[12],[2,\"\\n       by Benjamin Starkie\\n        \"],[13],[2,\"\\n        \"],[10,\"div\"],[14,0,\"float-right\"],[12],[2,\"\\n            created using \"],[10,\"a\"],[14,6,\"https://www.emberjs.com/\"],[12],[2,\"Ember\"],[13],[2,\" \\n    \"],[13],[2,\"\\n  \"],[13],[2,\"\\n\"],[13],[2,\"\\n\\n\"],[1,[30,[36,1],[[30,[36,0],null,null]],null]]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "connectfour/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("connectfour/templates/maingame", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "VpqLoLXD",
    "block": "{\"symbols\":[],\"statements\":[[1,[34,0]]],\"hasEval\":false,\"upvars\":[\"four\"]}",
    "meta": {
      "moduleName": "connectfour/templates/maingame.hbs"
    }
  });

  _exports.default = _default;
});
;define("connectfour/templates/score", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "bD8v/Ijo",
    "block": "{\"symbols\":[],\"statements\":[[1,[30,[36,1],[[30,[36,0],null,null]],null]]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "connectfour/templates/score.hbs"
    }
  });

  _exports.default = _default;
});
;define("connectfour/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("connectfour/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("connectfour/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("connectfour/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('connectfour/config/environment', [], function() {
  var prefix = 'connectfour';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("connectfour/app")["default"].create({"name":"connectfour","version":"0.0.0+3735836d"});
          }
        
//# sourceMappingURL=connectfour.map
