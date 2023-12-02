"use @hop/hiphop";
"use hopscript";

import * as hh from "@hop/hiphop";
import { format } from "util";

hiphop module prg() {
   inout A; inout B;
   loop {
      if (B.now) emit A();
      yield;
   }
}

export const mach = new hh.ReactiveMachine(prg);
mach.outbuf = "";
mach.debug_emitted_func = emitted => {
   mach.outbuf += format(emitted) + "\n";
};

mach.react();
mach.react();
mach.inputAndReact("B");
mach.react();
mach.inputAndReact("B");
mach.inputAndReact("B");

