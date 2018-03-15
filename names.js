'use strict';

// Return a Silly Name
function sillyname() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    // First Name
    return ["Runny","Buttercup","Dinky","Princess","Crusty",
    "Greasy","Gidget","Cheesypoof","Lumpy","Wacky","Tiny","Flunky",
    "Fluffy","Zippy","Doofus","Gobsmacked","Slimy","Grimy","Salamander",
    "Dr","Burrito","Bumpy","Loopy",
    "Snotty","Irving","Egbert"][rnd(25)] + "_" +

    // Last Name
    ["Waffer","Lilly","Bubblegum","Sand","Fuzzy","Kitty",
    "Puppy","Snuggles","SpacePrincess","Stinky","Lulu",
    "Lala","Sparkle","Glitter",
    "Silver","Golden","Rainbow","Cloud",
    "Rain","Stormy","Wink","Sugar",
    "Twinkle","Star","Halo","Angel"][rnd(25)];
}

// Return a Silly Name
function randcolor() {
    // Basic Random
    function rnd(n) { return Math.floor(Math.random()*n) }

    // First Name
    return ["red","pink","purple","deep-purple","indigo",
    "blue","light-blue","cyan","teal","green","light-green","lime",
    "khaki","yellow","amber","orange","deep-orange","blue-grey","brown",
    "grey","dark-grey","black"][rnd(25)]
}

setTimeout(function() { 
  $('.hello').hover(
      function() {
          $(this).find('.closeSign').show();
      }, function() {
          $(this).find('.closeSign').hide();
      }
  );

  $('.closeSign').on('click', function() {
    $(this).parent().hide();
    // or any other stuff as you want
  });

  console.log('HELLO');

}, 10);

var clientuser = $('#whoami > a').text() + ':';
var clientuserchat =  $('.username').text();

setInterval(function(){
console.log (clientuser);
console.log (clientuserchat);

  if (clientuser !== clientuserchat) {
    $('.closeSign').hide().empty();
  }
}, 3000);