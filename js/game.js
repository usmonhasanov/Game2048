var app = angular.module ('gameApp', ["ngStorage", "swipe"]);
app.factory('TileModel', function (){
	var Tile = function (id, val){
		this.value = (id == 15) ? null : val;
		this.id = id;
	};
	return Tile;
});
app.controller ('GameController', function(TileModel, $localStorage){
// --- Style --
  this.style = function(val){
    if (val == 2){
      return {'background-color':'#FFFFCC', 'color':'#E1C5A0', 'font-size': '3.0em'};
    }
    if (val == 4){
      return {'background-color':'#FFCC99', 'color':'white', 'font-size': '3.0em' };
    }
    if (val == 8){
      return {'background-color':'#FFCC66', 'color':'white', 'font-size': '3.0em' };
    }
    if (val == 16){
      return {'background-color':'#FF9933', 'color':'white', 'font-size': '2.5em' };
    }
    if (val == 32){
      return {'background-color':'#FF6600', 'color':'white', 'font-size': '2.5em' };
    }
    if (val == 64){
      return {'background-color':'#FF5050', 'color':'white', 'font-size': '2.5em' };
    }
    if (val == 128){
      return {'background-color':'#CC6600', 'color':'white', 'font-size': '2.0em' };
    }
    if (val == 256){
      return {'background-color':'#FF3300', 'color':'white', 'font-size': '2.0em' };
    }
    if (val == 512){
      return {'background-color':'#FF0000', 'color':'white', 'font-size': '2.0em' };
    }
    if (val == 1024){
      return {'background-color':'#CC0000', 'color':'white', 'font-size': '1.5em' };
    }
    if (val == 2048){
      return {'background-color':'#990033', 'color':'white', 'font-size': '1.5em' };
    }
    if (val == 4096){
      return {'background-color':'#800000', 'color':'white', 'font-size': '1.5em' };
    }
    if (val == 8192){
      return {'background-color':'#663300', 'color':'white', 'font-size': '1.5em' };
    }
  };
// ---class name
  this.ClassName = function(id){
    if (this.anim[id] == 'animated'){
      //this.anim[id] = '';
     // alert(this.anim[id]+' - '+id);
      return 'animated';
    }   
    
  };
  
  
// --- toID funtion
  this.toId = function(i, j){
    return i*4+j;
  };
  
  // --- Rand function -- 
  this.rand = function(){
    var emp = [];
    var cnt = 0;
    this.counter++;
    for(var i = 0; i < 16; i++){
      if (this.tiles[i].value == null){
        emp[cnt++] = i;
      }
    }
    if (cnt != 0){
      var index = Math.floor(Math.random()*cnt);
      this.tiles[emp[index]].value = (Math.random() < 0.9)? 2:4;
      this.anim[emp[index]] = 'animated';
    }
    this.Storage();
  };
  this.GameOver = function(){
    var f = true;
    for(var i = 0; i <= 3; i++){
      for(var j = 0; j <= 3; j++){
        if (this.tiles[this.toId(i, j)].value == null){
          f = false;
          break;
        }
        if ((i-1 >= 0 && this.tiles[this.toId(i, j)].value == this.tiles[this.toId(i-1, j)].value) ||
          (i+1 <= 3 && this.tiles[this.toId(i, j)].value == this.tiles[this.toId(i+1, j)].value) ||
          (j-1 >= 0 && this.tiles[this.toId(i, j)].value == this.tiles[this.toId(i, j-1)].value) ||
          (j+1 <= 3 && this.tiles[this.toId(i, j)].value == this.tiles[this.toId(i, j+1)].value) ){
          f = false;
          break;
        }
      }
    }
    if (f == true){
      if (confirm("Game Over! Do you want new game?") == true) {
        this.newGame();
      }
    }
  };
 //--- Start function 
  this.newGame = function(){
    this.score = 0;
    for(var i = 0; i < 16; i++){
      this.anim[i] = '';
    }
    this.win = true;
    for(var i = 0; i < 16; i++){
      this.tiles[i].value = null;
    }  
    this.rand();
    this.rand();
  };
   
// --- Storage ---
  this.Storage = function(){
  $localStorage.state = [];
    $localStorage.bestscore = this.bestscore;
    $localStorage.score = this.score;
    $localStorage.win = this.win;
    for(var i = 0; i < 16; i++){
      $localStorage.state[i] = this.tiles[i].value;
    }
  };
   
//  ---- CheckWin function ---
  this.CheckWin = function(){
    for(var i = 0; i < 16; i++){
      if (this.tiles[i].value == 2048){
        return true;
      }
    }
    return false;
  };
  this.KeyCodeup = function(keycode){
    if (37 <= keycode && keycode <= 40){
      if (this.CheckWin() && this.win) {
        alert('You are win!!!');
        this.win = false;
      }
      this.GameOver();
    }
  };
  this.Swipe = function(val){
    this.KeyCodeup(39);
    if (val == 37){
      this.KeyCode(37);
    }
    if (val == 38){
      this.KeyCode(38);
    }
    if (val == 39){
      this.KeyCode(39);
    }
    if (val == 40){
      this.KeyCode(40);
    }
  };
  
 // --- KeyCode function ---
  this.KeyCode = function(keycode){
  var ff = false;
    //----down-------------
    if (keycode == 40){
    // ko'chirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 3; j >= 0; j-- ){
          if (this.tiles[this.toId(j, i)].value == null){
            for(var k = j-1; k >= 0; k--){
              if (this.tiles[this.toId(k, i)].value != null){
                this.tiles[this.toId(j, i)].value = this.tiles[this.toId(k, i)].value;
                this.tiles[this.toId(k, i)].value = null;
                ff = true;
                break;
              }
            }
          }
        }
      }
      //   qisqartirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 3; j >= 1; j-- ){
          if (this.tiles[this.toId(j, i)].value == this.tiles[this.toId(j-1, i)].value && this.tiles[this.toId(j, i)].value != null){
            this.tiles[this.toId(j, i)].value *= 2;
            ff = true;
            this.score += this.tiles[this.toId(j, i)].value;
            this.tiles[this.toId(j-1, i)].value = null;
            for(var k = j-1; k >= 1; k--){
                this.tiles[this.toId(k, i)].value = this.tiles[this.toId(k-1, i)].value;
                this.tiles[this.toId(k-1, i)].value = null;
            }
          }
        }
      }
    }
     //--------- up ------------
    if(keycode == 38){
    //  ko'chirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 0; j <= 3; j++ ){
          if (this.tiles[this.toId(j, i)].value == null){
            for(var k = j+1; k <= 3; k++){
              if (this.tiles[this.toId(k, i)].value != null){
                this.tiles[this.toId(j, i)].value = this.tiles[this.toId(k, i)].value;
                this.tiles[this.toId(k, i)].value = null;
                ff = true;
                break;
              }
            }
          }
        }
      }
      // qisqartirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 0; j <= 2; j++ ){
          if (this.tiles[this.toId(j, i)].value == this.tiles[this.toId(j+1, i)].value && this.tiles[this.toId(j, i)].value != null){
            this.tiles[this.toId(j, i)].value *= 2;
            ff = true;
            this.score += this.tiles[this.toId(j, i)].value;
            this.tiles[this.toId(j+1, i)].value = null;
            for(var k = j+1; k <= 2; k++){
                this.tiles[this.toId(k, i)].value = this.tiles[this.toId(k+1, i)].value;
                this.tiles[this.toId(k+1, i)].value = null;
            }
          }
        }
      }
    }
    //-------- left ----------------
    if (keycode == 37){
    // --- ko'chirish 
      for( var i = 0; i <= 3; i++ ){
        for( var j = 0; j <= 3; j++ ){
          if (this.tiles[this.toId(i, j)].value == null){
            for(var k = j+1; k <= 3; k++){
              if (this.tiles[this.toId(i, k)].value != null){
                this.tiles[this.toId(i, j)].value = this.tiles[this.toId(i, k)].value;
                this.tiles[this.toId(i, k)].value = null;
                ff = true;
                break;
              }
            }
          }
        }
      }
      // qisqartirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 0; j <= 2; j++ ){
          if (this.tiles[this.toId(i, j)].value == this.tiles[this.toId(i, j+1)].value && this.tiles[this.toId(i, j)].value != null){
            this.tiles[this.toId(i, j)].value *= 2;
            ff = true;
            this.score += this.tiles[this.toId(i, j)].value;
            this.tiles[this.toId(i, j+1)].value = null;
            for(var k = j+1; k <= 2; k++){
                this.tiles[this.toId(i, k)].value = this.tiles[this.toId(i, k+1)].value;
                this.tiles[this.toId(i, k+1)].value = null;
            }
          }
        }
      }
    }
    //-----right---
    if (keycode == 39){
      // ko'chirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 3; j >= 0; j-- ){
          if (this.tiles[this.toId(i, j)].value == null){
            for(var k = j-1; k >= 0; k--){
              if (this.tiles[this.toId(i, k)].value != null){
                this.tiles[this.toId(i, j)].value = this.tiles[this.toId(i, k)].value;
                this.tiles[this.toId(i, k)].value = null;
                ff = true;
                break;
              }
            }
          }
        }
      }
      //   qisqartirish
      for( var i = 0; i <= 3; i++ ){
        for( var j = 3; j >= 1; j-- ){
          if (this.tiles[this.toId(i, j)].value == this.tiles[this.toId(i, j-1)].value && this.tiles[this.toId(i, j)].value != null){
            this.tiles[this.toId(i, j)].value *= 2;
            ff = true;
            this.tiles[this.toId(i, j-1)].value = null;
            this.score += this.tiles[this.toId(i, j)].value;
            for(var k = j-1; k >= 1; k--){
                this.tiles[this.toId(i, k)].value = this.tiles[this.toId(i, k-1)].value;
                this.tiles[this.toId(i, k-1)].value = null;
            }
          }
        }
      }
    }
    if (this.score >= this.bestscore){
      this.bestscore = this.score;
    }
    if (37 <= keycode && keycode <= 40 && ff){
      this.rand();
      this.Storage();
    }
  };
  // --- 
  
  //--main--
  this.tiles = [];
  this.counter = 0;
  this.anim = [];
  for (var i = 0; i < 16; i++) {
			this.tiles.push(new TileModel(i));
	}
  if ($localStorage.score == null){
    $localStorage.score = 0;
    this.newGame();
  } else {
    for(var i = 0; i < 16; i++){
      this.tiles[i].value = $localStorage.state[i];
      if (this.tiles[i].value != null){
        this.anim[i] = 'animated';
      } else {
        this.anim[i] = '';
      }
    }
  }
  if ($localStorage.bestscore == null){
    $localStorage.bestscore = 0;
  }
  if ($localStorage.win == null){
    $localStorage.win = true;
  }
  this.win = $localStorage.win;
  this.bestscore = $localStorage.bestscore;
  this.score     = $localStorage.score;
});