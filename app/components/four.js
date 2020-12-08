/* eslint-disable ember/no-jquery */
import Component from '@ember/component';
import Ember from 'ember';

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
}
// https://teaching.computing.edgehill.ac.uk/wte/parts/5121?page=5121
// Keep reading this 
function gamewinner(state) {
  var patterns = [
    [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3]
    ],
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4]
    ],
    [
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5]
    ],
    [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3]
    ],
    [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4]
    ],
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5]
    ],
    [
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4]
    ],
    [
      [2, 0],
      [3, 1],
      [4, 2],
      [5, 3]
    ],
    
    [
      [2, 2],
      [3, 3],
      [4, 4],
      [5, 5]
    ],
    [
      [3, 0],
      [4, 1],
      [5, 2],
      [6, 3]
    ],
    [
      [3, 2],
      [4, 3],
      [5, 4],
      [6, 5]
    ],
    [
      [3, 1],
      [4, 2],
      [5, 3],
      [6, 4]
    ],
    
    [
      [6, 0],
      [5, 1],
      [4, 2],
      [3, 3]
    ],
    [
      [6, 1],
      [5, 2],
      [4, 3],
      [3, 4]
    ],
    [
      [4, 0],
      [3, 1],
      [2, 2],
      [1, 3]
    ],
    [
      [4, 1],
      [3, 2],
      [2, 3],
      [1, 4]
    ],
    [
      [4, 2],
      [3, 3],
      [2, 4],
      [1, 5]
    ],
    [
      [3, 0],
      [2, 1],
      [1, 2],
      [0, 3]
    ],
    [
      [6, 2],
      [5, 3],
      [4, 4],
      [3, 5]
    ],
    [
      [5, 0],
      [4, 1],
      [3, 2],
      [2, 3]
    ],
    [
      [5, 1],
      [4, 2],
      [3, 3],
      [2, 4]
    ],
    [
      [5, 2],
      [4, 3],
      [3, 4],
      [2, 5]
    ],
    [
      [3, 1],
      [2, 2],
      [1, 3],
      [0, 4]
    ],
    [
      [3, 2],
      [2, 3],
      [1, 4],
      [0, 5]
    ],
    [
      [0, 5],
      [1, 5],
      [2, 5],
      [3, 5]
    ],
    [
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5]
    ],
    [
      [2, 5],
      [3, 5],
      [4, 5],
      [5, 5]
    ],
    [
      [3, 5],
      [4, 5],
      [5, 5],
      [6, 5]
    ],
    [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4]
    ],
    [
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4]
    ],
    [
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 4]
    ],
    [
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3]
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2]
    ],
    [
      [3, 4],
      [4, 4],
      [5, 4],
      [6, 4]
    ],
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3]
    ],
    [
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3]
    ],
    [
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3]
    ],
    [
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2]
    ],
    [
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2]
    ],
    [
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1]
    ],
    [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1]
    ],
    [
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1]
    ],
    [
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1]
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0]
    ],
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0]
    ],
    [
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0]
    ],
    [
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0]
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3]
    ],
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4]
    ],
    [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5]
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3]
    ],
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4]
    ],
    [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3]
    ],
    [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4]
    ],
    [
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5]
    ],
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3]
    ],
    [
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4]
    ],
    [
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5]
    ],
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3]
    ],
    [
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5]
    ],
    [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3]
    ],
    [
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5]
    ],
    [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3]
    ],
    [
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4]
    ],
    [
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5]
    ],
  ];

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
  }
  // eslint-disable-next-line no-unused-vars
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
    pattern: [
      ['p', 0, 1],
      ['p', 0, 1],
      ['p', 0, 1],
      ['p']
    ],
    score: 1000
  },
  {
    pattern: [
      ['p', 1, 0],
      ['p', 1, 0],
      ['p', 1, 0],
      ['p']
    ],
    score: 1000
  },
  {
    pattern: [
      ['p', 1, 1],
      ['p', 1, 1],
      ['p', 1, 1],
      ['p']
    ],
    score: 1000
  },
  {
    pattern: [
      ['p', 1, -1],
      ['p', 1, -1],
      ['p', 1, -1],
      ['p']
    ],
    score: 1000
  },
  {
    pattern: [
      ['p', -1, 1],
      ['p', -1, 1],
      ['p', -1, 1],
      ['p']
    ],
    score: 1000
  },
  {

    pattern: [
      ['p', -1, -1],
      ['p', -1, -1],
      ['p', -1, -1],
      ['p']
    ],
    score: 1000
  },
  {
    pattern: [
      ['p', 0, 1],
      ['p', 0, 1],
      ['p']
    ],
    score: 50
  },
  {
    pattern: [
      ['p', 1, 0],
      ['p', 1, 0],
      ['p']
    ],
    score: 50
  },
  {
    pattern: [
      ['p', 1, 1],
      ['p', 1, 1],
      ['p']
    ],
    score: 50
  },
  {
    pattern: [
      ['p', 1, -1],
      ['p', 1, -1],
      ['p']
    ],
    score: 50
  },
  {
    pattern: [
      ['p', -1, 1],
      ['p', -1, 1],
      ['p']
    ],
    score: 50
  },
  {
    pattern: [
      ['p', -1, -1],
      ['p', -1, -1],
      ['p']
    ],
    score: 50
  },
];

//app/components/tic-tac-toe
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
}


//teaching.computing.edgehill.ac.uk/wte/parts/5124

//new heuristic function loops over a list of patterns. 
//Then it uses a new match_pattern function to test if the pattern matches for that player
function heuristic(state) {
  var score = 0;
  for (var idx = 0; idx < patterns.length; idx++) {
    if (match_pattern(state, patterns[idx].pattern, 'Green')) {   // For the green marker
      score = score + patterns[idx].score;
    }
    if (match_pattern(state, patterns[idx].pattern, 'White')) { // For the white marker
      score = score - patterns[idx].score;
    }
  }
  return score;
}


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
        return match_pattern_at(state, pattern.slice(1), player, x + element[1], y + element[2])
      } else {
        return true;
      }
    }
  }

  return false;
}

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

function computer_move(state) {
  var moves = minimax(state, 4, 'Green');
  var max_score = undefined;
  var move = undefined;
  for (var idx = 0; idx < moves.length; idx++) {
    if (max_score === undefined || moves[idx].score > max_score) {
      max_score = moves[idx].score;
      move = {
        x: moves[idx].x,
        y: moves[idx].y

      }
    }
  }
  return move;
}

export default Component.extend({
  didInsertElement: function() {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line ember/no-jquery
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line ember/no-jquery
    // eslint-disable-next-line no-undef
    var stage = new createjs.Stage(this.$('#stage')[0]);
    // eslint-disable-next-line no-undef
    var board = new createjs.Shape();
    var graphics = board.graphics;
    graphics.beginFill('#353839');
    graphics.drawRect(0, 0, 350, 2);
    graphics.drawRect(350, 0, 2, 300);
    graphics.drawRect(0, 0, 2, 300);
    graphics.drawRect(0, 300, 352, 2);
    graphics.drawRect(50, 0, 2, 300);
    graphics.drawRect(100, 0, 2, 300);
    graphics.drawRect(150, 0, 2, 300);
    graphics.drawRect(200, 0, 2, 300);
    graphics.drawRect(250, 0, 2, 300);
    graphics.drawRect(300, 0, 2, 300);
    graphics.drawRect(0, 50, 350, 2);
    graphics.drawRect(0, 100, 350, 2);
    graphics.drawRect(0, 150, 350, 2);
    graphics.drawRect(0, 200, 350, 2);
    graphics.drawRect(0, 250, 350, 2);
    board.x = 15;
    board.y = 40;
    board.alpha = 0;
    this.set('board', board);
    stage.addChild(board);
    var markers = {
      'White': [],
      'Green': []
    }
    for (var x = 0; x < 21; x++) {
      var WhiteMarker = new createjs.Shape();
      graphics = WhiteMarker.graphics;
      graphics.beginFill('#ffffff');
      graphics.setStrokeStyle(10);
      graphics.drawCircle(0, 0, 23);
      graphics.endFill();
      WhiteMarker.visible = false;
      stage.addChild(WhiteMarker);
      markers.White.push(WhiteMarker);
      var GreenMarker = new createjs.Shape();
      graphics = GreenMarker.graphics;
      graphics.beginFill('#0cfe20');
      graphics.drawCircle(0, 0, 23);
      graphics.endFill();
      GreenMarker.visible = false;
      stage.addChild(GreenMarker);
      markers.Green.push(GreenMarker);
    }
    this.set('markers', markers);
    this.set('stage', stage);
    createjs.Ticker.addEventListener("tick", stage);
  },

  willDestroyElement: function() {
    this._super(...arguments);
    if (shake) {
      shake.stopWatch();
    }
  },
  click: function(ev) {
    var component = this;
    if (component.get('playing') && !component.get('winner')) {
      if (ev.target.tagName.toLowerCase() == 'canvas' && ev.offsetX >= 20 && ev.offsetY >= 40 &&
        ev.offsetX < 360 && ev.offsetY < 340) {
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
          setTimeout(function() {
            if (!component.get('winner') && !component.get('draw')) {
              var move = computer_move(state);
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
  check_winner: function() {
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
    start: function() {
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
      this.set('state', [
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined]
      ]);
      this.set('moves', {
        'White': 0,
        'Green': 0
      });
      this.set('player', 'White');

      var markers = this.get('markers');
      this.get('stage').update();
    }
  }
});
