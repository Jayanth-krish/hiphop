"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";

hiphop module prg() {
   inout A, B;
   EXIT: fork {
      await( A.now );
      hop { console.log( "A" ) }
      break EXIT;
   } par {
      await( B.now );
      hop { console.log( "B" ) }
      break EXIT;
   }

   hop { console.log( "end" ) } ;
}

const m = new hh.ReactiveMachine( prg );

m.react();
m.inputAndReact( "B" );
