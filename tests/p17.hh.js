"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";

hiphop module prg() {
   out O;
   loop {
      signal S1;

      if( S1.now ) {
	 emit O();
      }

      yield;

      emit S1();
   }
}

exports.prg = new hh.ReactiveMachine( prg, "P17" )
