"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";

hiphop module prg() {
   out O;
   signal L;

   fork {
      loop {
	 emit L();
	 yield;
      }
   } par {
      loop {
	 await( L.now );
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
