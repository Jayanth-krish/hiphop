"use strict"

var hh = require("hiphop");

try {
   const prg = hiphop module( O ) {
      loop {
	 let L;

	 emit L( "foo bar" );
	 emit O( val( L ) );
      }
   }

   let m = new hh.ReactiveMachine( prg, "instloop" );

   m.react();
   m.react();
   m.react();
   m.react();
} catch ( e ) {
   console.log( e.message );
}

