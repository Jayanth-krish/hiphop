"use hopscript"

const hh = require("hiphop");

try {
const prg =
    <hh.module I O>
      <hh.every immediate countValue=2 I>
	<hh.emit O/>
      </hh.every>
    </hh.module>;
} catch (e) {
   console.log(e.message)
}
