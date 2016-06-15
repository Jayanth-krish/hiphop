"use hopscript"

var hh = require("hiphop");

var prg = <hh.module>
  <hh.inputsignal name="A"/>
  <hh.inputsignal name="B"/>
  <hh.outputsignal name="O"/>
  <hh.sequence>
    <hh.await signal="A"/>
    <hh.await signal="B"/>
    <hh.emit signal="O"/>
  </hh.sequence>
</hh.module>;

exports.prg = new hh.ReactiveMachine(prg, "awaitseq");
