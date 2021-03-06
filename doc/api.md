${ var doc = require("hopdoc") }

HipHop
======

The `"hiphop"` module contains utilities for creating and running
HipHop reactive machines.

Use `require( "hiphop" )` to use it.


Creating HipHop reactive machines
---------------------------------

### new hiphop.ReactiveMachine( hhprgm, options ) ###
[:server@glyphicon glyphicon-tag constructor]

```hopscript
const hh = require( "hiphop" );
const m = new hh.ReactiveMachine( require( "prgm.hh.js" ) );
```

Running HipHop reactive machines
--------------------------------

### mach.react( sigset ) ###
[:@glyphicon glyphicon-tag tag]

The `react` function machine reactions. If called with no argument,
it proceed to one step. If called with one or several arguments, it
proceeds as follows for each argument:

  * a `sigset` is a JavaScript object. For each property `pname` with
 value `pval` in `sigset`, the eponym signal is emited with `pval`.
  * runs a reaction.


The `react` function returns the machine itself. 

Example:

```hopscript
// proceed to one reaction
m.react(); 

// proceed to 4 reactions, with first the signal O emitded with value 24,
// P with value 53, then a second reaction with only o emitted with value 56,
// ...
m.react( { O: 24, P: 53 } );
m.react( { O: 56 } );
m.react( { O: 77 } );
m.react( { P: 10 } );
```

After a reaction, each output signal of the main program module is
bound in the machine as a JavaScript property. For instance, is a
reaction emits the signal `O` with value `1` at the first reaction
of the machine `m` and `O` with value `2` at the second reaction, checking 
`m.O` after that reaction would return:

```
{ nowval: 2, preval: 1, now: true, pre: true }
```

### mach.input( sigset ) ###
[:@glyphicon glyphicon-tag tag]

The `input` function emits signal in the machine but does not
triggers the reaction. For instance,

```hopscript
m.input( { O: 24 } );
m.input( { P: 53 } )
m.react();
```

Is equivalent to

```hopscript
m.react( { O: 24, P: 53 } )
m.react();
```

Interacing with HipHop reactive machines
----------------------------------------

### mach.addEventListener( signame, listener ) ###
[:@glyphicon glyphicon-tag tag]

Associate a listener to the machine event `signame`.

Listeners are invoked with one object with one or two fields:

  * `type`: the name of the emitted output signal;
  * `nowval`: the value of the signal at the end of the reaction.
 This field exists only for valued signals. This field is immutable;


The `stopPropagation()` is a method that, if called within the listener, will
inhibit the call of others callback mapped on this signal.

Example:

${ <span class="label label-info">reactfunc.js</span> }

```hopscript
${ doc.include( "../tests/reactfunc.hh.js" ) }
```

### mach.removeEventListener( signame, listener ) ###
[:@glyphicon glyphicon-tag tag]

Remove the listener from the machine.





