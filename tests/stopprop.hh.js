"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";

hiphop module prg() {
   out O;
   loop {
      emit O();
      yield;
   }
}

const m = new hh.ReactiveMachine( prg, "foo" );

m.addEventListener( "O", function( evt ) {
   console.log( "first", evt.type );
});

m.addEventListener( "O", function( evt ) {
   evt.stopPropagation();
   console.log( "second", evt.type );
});

m.addEventListener( "O", function( evt ) {
   console.log( "third", evt.type );
});

exports.prg = m;
