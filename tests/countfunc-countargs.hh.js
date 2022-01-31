"use @hop/hiphop"
"use hopscript"

import * as hh from "@hop/hiphop";

hiphop module prg() {
   in X; out Y, Z;
   await( X.now );

   every count( X.nowval + 5, true ) {
      emit Y();
   }
   emit Z();
}

const m = new hh.ReactiveMachine( prg );
m.debug_emitted_func = console.log

m.react()
m.inputAndReact( "X", 1 )
m.react()
m.react()
m.react()
m.react()
m.react()
m.react()
m.react()
m.react()
