"use @hop/hiphop"
"use hopscript"

import * as hh from "@hop/hiphop";

hiphop module prg() {
   inout X = 1, Y, Z;
   T: {
      signal __internal=-1;

      loop {
         if(__internal.preval === -1) {
            emit __internal(X.nowval + 5);
         }
         if(__internal.nowval === 0) {
            break T;
         }
         async () {
            setTimeout(this.notify.bind(this), 500);
         }
         emit Y();
         emit __internal(__internal.preval - 1);
      }
   }
   emit Z();
}

const m = new hh.ReactiveMachine(prg);

m.addEventListener("Y", function(evt) {
   console.log("Y emitted");
});

m.addEventListener("Z", function(evt) {
   console.log("Z emitted");
});

m.react();
