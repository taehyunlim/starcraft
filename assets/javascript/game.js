
// CHARACTERS AS OBJECTS
var z = {
        name: "z",
        isHero: false,
        isEnemy: true,
        hp: 115,
        dmg: 8,
        becomeHero: function() {
        	this.isHero = true;
        	this.isEnemy = false;
        },
        attack: function(enemy) {
            rate = this.rate;
            instantDamage = this.dmg * getCritical(rate);
            enemy.hp = enemy.hp - instantDamage;
            return instantDamage;
        },
        killCount: 0,
        rate: 0,

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
            rate = this.rate;
            instantDamage = this.dmg * getCritical(rate);
        	enemy.hp = enemy.hp - instantDamage;
            return instantDamage;
        },
        killCount: 0,
        rate: 0,

};

var p = {
        name: "p",
        isHero: false,
        isEnemy: true,
        hp: 90,
        dmg: 12,
        becomeHero: function() {
        	this.isHero = true;	
        	this.isEnemy = false;
        },
        attack: function(enemy) {
            rate = this.rate;
            instantDamage = this.dmg * getCritical(rate);
            enemy.hp = enemy.hp - instantDamage;
            return instantDamage;
        },
        killCount: 0,
        rate: 0,

};

var k = {
        name: "k",
        isHero: false,
        isEnemy: true,
        hp: 200,
        dmg: 20,
        becomeHero: function() {
            this.isHero = true; 
            this.isEnemy = false;
        },
        attack: function(enemy) {
            rate = this.rate;
            instantDamage = this.dmg * getCritical(rate);
            enemy.hp = enemy.hp - instantDamage;
            return instantDamage;
        },
        killCount: 0,
        rate: 0,

};

// Critical Hit Function
function getCritical(rate) {
    var num = Math.random();
    if ( num < rate ){ return 2; } 
    else { return 1; }
}


// Toggle Selected
$( ".character" ).click(function() {
        $(this).toggleClass('selected').siblings().removeClass('selected');
});

// Select Hero
$( "#selectHero").click(function() {
    // First check if there is a toggle-selected character
    if ( $( ".character.selected" )[0] ) {
        var heroElement = $( '.character.selected' );
        $( "#hero-div" ).append(heroElement);
        $( ".character").addClass('enemy');
        heroElement.removeClass('enemy');
        $( "#hero-div .character" ).addClass('hero');
        $(this).hide();
        $( "#selectEnemy" ).show();
        $( "#vs-div h3").show();
    }
});

// Select Enemy
$( "#selectEnemy" ).click(function() {
    // First check if there is a toggle-selected character
    if ( $( ".character.enemy.selected" )[0] ) {
        var enemyElement = $( '.character.enemy.selected' );
        $( "#enemy-div" ).append(enemyElement);
        $( "#enemy-div .character.enemy" ).addClass('currentEnemy');
        $( "#attack").removeClass('disabled');
        $( "#vs-div h3" ).text('VS');
        $(this).hide();
        isNewEnemy = true;
    }
});


// Set default global variables
var heroActive = '';
var enemyActive = '';
var enemyCount = 3; // This is kind of hacky
var enemyOriginalHP = 0; // This is for regeneration after defeat
var isNewEnemy = true; 

// Attack Button
$( "#attack" ).click(function() {
    // Map hero selection to the matching object
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
    
    // Map enemey selection to the matching object
    if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 'p' ) {
            var enemyActive = p;
    } if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 'z' ) {
            var enemyActive = z;
    } if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 't' ) {
            var enemyActive = t;
    } if ( $( "#enemy-div .character.currentEnemy").attr("data-name") === 'k' ) {
            var enemyActive = k;
    } 

    // Each time new enemy is selected:
    if ( isNewEnemy ) {
        heroActive.hp = heroActive.hp + 30;
        enemyOriginalHP = enemyActive.hp;
        isNewEnemy = false;
    }

    // Perform attack object method
    var instantDmgHero = heroActive.attack(enemyActive);
    var instantDmgEnemy = enemyActive.attack(heroActive);

    // Create fading elements for damages dealt
    var $instantHero = $( "<div>" ).html("-" + instantDmgHero).css("color", "red").fadeOut( "slow" );
    var $instantEnemy = $( "<div>" ).html("-" + instantDmgEnemy).css("color", "red").fadeOut( "slow" );

    // Print current stats on to the screen
    $( "*[data-name='" + heroActive.name +"'" ).find( "span.stats" )
        .html("Attack: " + Math.round(heroActive.dmg) 
            + "</br> HP: " + Math.round(heroActive.hp) 
            + "</br> Critical: " + ( Math.round(heroActive.rate *100) ) + "%" );
    $( "*[data-name='" + enemyActive.name +"'" ).find( "span.stats" )
        .html("Attack: " + Math.round(enemyActive.dmg) 
            + "</br> HP: " + Math.round(enemyActive.hp) 
            + "</br> Critical: " + ( Math.round(enemyActive.rate *100) ) + "%" );

    //
    $( "*[data-name='" + heroActive.name +"'" ).find( "span.stats" ).append($instantEnemy);
    $( "*[data-name='" + enemyActive.name +"'" ).find( "span.stats" ).append($instantHero);

    // For debugging purpose
    console.log(heroActive);
    console.log(enemyActive);

    // WHEN ALL ENEMIES ARE DYSTROED
    if ( enemyCount === 1 && enemyActive.hp <= 0 ) {
        $( "#vs-div h3" ).text("You won!");
        $( "#selectEnemy" ).hide();
        $( "#attack" ).hide();
    }
    // WHEN HERO IS DESTROYED
    else if ( heroActive.hp <= 0 ) {
        $( "#vs-div h3" ).text("You lost!");
        $( "#selectEnemy" ).hide();
        $( "#attack" ).hide();
    }
    // WHEN CURRENT ENEMY IS DESTROYED
    else if ( enemyActive.hp <= 0 && enemyCount > 0 ) {
        heroActive.killCount++;
        heroActive.dmg = heroActive.dmg + heroActive.killCount * (0.25 * enemyActive.dmg );
        heroActive.hp = heroActive.hp + (0.5 * enemyOriginalHP);
        heroActive.rate = heroActive.rate + (1/3);
        $( "*[data-name='" + heroActive.name +"'" ).find( "span.stats" ).html(" Attack: " + heroActive.dmg + " </br> HP: " + heroActive.hp);
        $( ".character.currentEnemy" ).remove();
        enemyCount--;
        $( "#selectEnemy" ).show();
        $( "#vs-div h3" ).text("Pick your next enemey");
        $( "#attack").addClass('disabled');
    }

});
