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
	 await L;
	 emit O();
      }
   }
}

const machine = new hh.ReactiveMachine( prg, "sync1" );
machine.debug_emitted_func = console.log;

machine.react()
machine.react()
machine.react()
machine.react()
