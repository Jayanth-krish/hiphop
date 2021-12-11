"use hiphop";
"use strict";

const hh = require( "hiphop" );

hiphop module prg( T ) {
   yield;
   {
      signal S;

      emit S();

      if( S.now ) emit T();
   }
}

exports.prg = new hh.ReactiveMachine( prg, "example1" );
