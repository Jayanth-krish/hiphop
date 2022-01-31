"use @hop/hiphop"
"use hopscript"

import * as hh from "@hop/hiphop";

hiphop module prg() {
   out O;
   async (O) {
      this.notify( new Promise( function( resolve, reject ) {
	 setTimeout( () => resolve( 5 ), 1000 );
      } ) );
   }
}

const machine = new hh.ReactiveMachine( prg, "exec" );

machine.addEventListener( "O", function( evt ) {
   console.log( "O=" + evt.nowval.val + " emitted!" );
} );

machine.react();
