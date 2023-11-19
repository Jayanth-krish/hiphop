"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";

hiphop module prg() {
   inout A combine (x, y) => x + y;
   
   fork {
      loop {
	 emit A(0);
	 yield;
      }
   } par {
      loop {
	 emit A(1);
	 host { mach.outbuf += A.nowval + "\n"; }
	 yield;
      }
   } par {
      loop {
	 emit A(2);
	 host { mach.outbuf += A.nowval + "\n"; }
	 yield;
      }
   }
}

export const mach = new hh.ReactiveMachine(prg, "error2");

mach.outbuf = "";
mach.debug_emitted_func = val => mach.outbuf += "emit=" + val + "\n";
console.error("ICI========", mach.react);
mach.react()
mach.react()
mach.react()
mach.react()
mach.react()
console.error("LA========");
console.log("out=", mach.outbuf);
