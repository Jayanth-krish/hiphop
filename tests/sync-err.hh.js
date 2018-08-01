"use strict"
"use hopscript"

const hh = require( "hiphop" );

hiphop module prg( O ) {
   let L;

   fork {
      loop {
	 emit L();
	 yield;
      }
   } par {
      loop {
	 await immediate now( L );
	 emit O();
      }
   }
}

const machine = new hh.ReactiveMachine( prg, "sync-err" );

try {
   console.log( machine.react() );
   console.log( machine.react() );
   console.log( machine.react() );
   console.log( machine.react() );
} catch( e ) {
   console.log( e.message );
}
