"use hopscript"

const hh = require("hiphop");

const m =
    <hh.module S=${{accessibility: hh.IN}} O F W Z>
      <hh.weakabort S>
	<hh.loop>
	  <hh.emit O/>
	  <hh.pause/>
	  <hh.emit W/>
	  <hh.pause/>
	  <hh.emit Z/>
	</hh.loop>
      </hh.weakabort>
      <hh.emit F/>
    </hh.module>

exports.prg = new hh.ReactiveMachine(m, "wabort2");
