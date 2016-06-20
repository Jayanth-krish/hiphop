//==================
// HipHop WATCH code
//==================

var B = require("../basic/basic.js");
var WD = require("./watch-data.js");

var hh = require("hiphop");
exports.hh = hh;

//----------------------
// The WATCH hiphop code
//----------------------

var WatchModule =
    <hh.module>
    
    // Input / output interface
    //=========================

      // time-related IOs
    
      <hh.inputsignal name="S"/>
      <hh.inputsignal name="TOGGLE_24H_MODE_COMMAND"/>
    
      <hh.outputsignal name="WATCH_TIME"
		       value=${WD.InitialWatchTime}/>

      // set-time-related IOs

      <hh.inputsignal name="ENTER_SET_WATCH_MODE_COMMAND"/>
      <hh.inputsignal name="SET_WATCH_COMMAND"/>
      <hh.inputsignal name="NEXT_WATCH_TIME_POSITION_COMMAND"/>
      <hh.inputsignal name="EXIT_SET_WATCH_MODE_COMMAND"/>
      
      <hh.outputsignal name="WATCH_BEING_SET"/> /
             / Synchronous with WATCH_TIME when the watch is set
      <hh.outputsignal name="START_ENHANCING" valued />
      <hh.outputsignal name="STOP_ENHANCING"valued />
      
      // Chime-related IOs
      
      <hh.inputsignal name="TOGGLE_CHIME_COMMAND"/> 
      <hh.outputsignal name="CHIME_STATUS" valued />
      <hh.outputsignal name="BEEP" valued />
      
      // Reactive code
      //==============
      
      // initialisation
    
      <hh.emit signal="WATCH_TIME" arg=${WD.InitialWatchTime}/>
      <hh.emit signal="CHIME_STATUS" arg=${false}/>

      // loop between watch mode and set-watch mode
      
      <hh.loop>

        // watch mode

	<hh.abort signal="ENTER_SET_WATCH_MODE_COMMAND">
          <hh.parallel>

            // react to seconds by incrementing time and computing beep number
            <hh.every signal="S">
		<hh.emit signal="WATCH_TIME"
                         func=${WD.IncrementWatchTime}
                         arg=${hh.preValue("WATCH_TIME")}/>

              <hh.emit signal="BEEP"
                        func=${WD.WatchBeep}
                        arg0=${hh.value("WATCH_TIME")}
	                arg1=${hh.value("CHIME_STATUS")}/>
            </hh.every>

            // react to mode toggling command by toggling WatchTime mode
             <hh.every signal="TOGGLE_24H_MODE_COMMAND">
                <hh.emit signal="WATCH_TIME"
                                 func=${WD.ToggleWatchTimeMode}
                                 arg=${hh.preValue("WATCH_TIME")}/>
             </hh.every>

             // react to chime togging command by toggling chime status
             <hh.every signal="TOGGLE_CHIME_COMMAND">
                <hh.emit signal="CHIME_STATUS"
                                 func=${B.bnot}
                                 arg=${hh.preValue("CHIME_STATUS")}/>
             </hh.every>

          </parallel>
       </hh.abort>

       // set-watch mode

       <hh.abort signal="EXIT_SET_WATCH_MODE_COMMAND">
          // enhance initial position
        // GB : CV bug !       should  be arg=${WD.InitialWatchTimePosition}
        <hh.emit signal="START_ENHANCING" arg=${0}/>
          <hh.parallel>

            // react to set-wacth command bu updating position
            <hh.every signal="SET_WATCH_COMMAND">
              <hh.emit signal="WATCH_TIME" 
                        func=${WD.IncrementWatchTimeAtPosition}
                        arg0=${hh.preValue("WATCH_TIME")}
			arg1=${hh.preValue("START_ENHANCING")}/>
       
            </hh.every>

            // react to next-position command
            // by moving enhancement to the new position 
            <hh.every signal="NEXT_WATCH_TIME_POSITION_COMMAND">
              <hh.emit signal="STOP_ENHANCING"
                       arg0=${hh.preValue("START_ENHANCING")}/>
              <hh.emit signal="START_ENHANCING"
                       func=${WD.NextWatchTimePosition}
                       arg0=${hh.preValue("START_ENHANCING")}/>
            </hh.every>

          </hh.parallel>
       </hh.abort>
       <hh.emit signal="STOP_ENHANCING"
                 arg0=${hh.preValue("START_ENHANCING")}/>
      </hh.loop>
    </hh.module>;

exports.WatchModule = WatchModule;
