"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";
import { format } from "util";

export const mach = new hh.ReactiveMachine(
   hiphop module() {
      inout S, R, E;
      loop {
	 suspend from immediate( S.now ) to immediate( R.now ) emit E() {
	    hop { mach.outbuf += "not suspended!\n" }
	 }
	 yield;
      }
   } );

mach.outbuf = "";
mach.debug_emitted_func = emitted => {
   mach.outbuf += format(emitted) + "\n";
   mach.outbuf += "---------------------\n";
};
// mach.debuggerOn("debug");
// mach.stepperOn();
mach.react()
mach.react()
mach.inputAndReact("S");
mach.react()
mach.react()
mach.inputAndReact("R");
mach.react()
mach.react()
