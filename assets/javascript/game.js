
var z = {
        name: "z",
        isHero: false,
        isEnemy: true,
        hp: 100,
        dmg: 10,
        becomeHero: function() {
        	this.isHero = true;
        	this.isEnemy = false;
        },
        attack: function(enemy) {
        	enemy.hp = enemy.hp - this.dmg;
        },
};

var t = {
        name: "t",
        isHero: false,
        isEnemy: true,
        hp: 100,
        dmg: 10,
        becomeHero: function() {
        	this.isHero = true;
        	this.isEnemy = false;
        },
        attack: function(enemy) {
        	enemy.hp = enemy.hp - this.dmg;
        },

};

var p = {
        name: "p",
        isHero: false,
        isEnemy: true,
        hp: 100,
        dmg: 10,
        becomeHero: function() {
        	this.isHero = true;	
        	this.isEnemy = false;
        },
        attack: function(enemy) {
        	enemy.hp = enemy.hp - this.dmg;
        },

};

var k = {
        name: "k",
        isHero: false,
        isEnemy: true,
        hp: 100,
        dmg: 10,
        becomeHero: function() {
            this.isHero = true; 
            this.isEnemy = false;
        },
        attack: function(enemy) {
            enemy.hp = enemy.hp - this.dmg;
        },

};


$( ".character" ).click(function() {
        $(this).toggleClass('selected').siblings().removeClass('selected');
});

$( "#selectHero").click(function() {
        var heroElement = $( '.selected' );
        $( "#hero-div" ).append(heroElement);
        $( ".character").addClass('enemy');
        $(this).hide();
});

$( "#selectHero").click(function() {
        var heroElement = $( '.character.selected' );
        $( "#hero-div" ).append(heroElement);
        $( ".character").addClass('enemy');
        heroElement.removeClass('enemy');
        $( "#hero-div .character" ).addClass('hero');
        $(this).hide();
        $( "#selectEnemy" ).show();
});

$( "#selectEnemy" ).click(function() {
        var enemyElement = $( '.character.enemy.selected' );
        $( "#enemy-div" ).append(enemyElement);
        $( "#enemy-div .character.enemy" ).addClass('currentEnemy');
        $(this).hide();
});


var heroActive = '';
var enemyActive = '';
var enemyCount = 3; // This is very hacky

$( "#attack" ).click(function() {
    if ( $( "#hero-div .character.hero").attr("data-name") === 'p' ) {
            p.becomeHero();
            var heroActive = p;
    } if ( $( "#hero-div .character.hero").attr("data-name") === 'z' ) {
            z.becomeHero();
            var heroActive = z;
    } if ( $( "#hero-div .character.hero").attr("data-name") === 't' ) {
            t.becomeHero();
            var heroActive = t;
    } if ( $( "#hero-div .character.hero").attr("data-name") === 'k' ) {
            k.becomeHero();
            var heroActive = k;
    } 
    
    if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 'p' ) {
            var enemyActive = p;
    } if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 'z' ) {
            var enemyActive = z;
    } if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 't' ) {
            var enemyActive = t;
    } if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 'k' ) {
            var enemyActive = k;
    } 

    heroActive.attack(enemyActive);
    heroActive.hp = heroActive.hp + 5;
    enemyActive.attack(heroActive);

    console.log(heroActive);
    console.log(enemyActive);

    if ( enemyActive.hp < 0 && enemyCount > 0 ) {
        $( ".character.currentEnemy" ).remove();
        enemyCount--;
        $( "#selectEnemy" ).show();
    } if ( enemyActive.hp < 0 && enemyCount === 0 ) {
        $( "h1.text-center" ).text("You won!");
        $( "#selectEnemy" ).hide();
        $( "#attack" ).hide();
    }

});
