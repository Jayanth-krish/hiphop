var TD = require("../data/time-data")
var WD = require("../watch/watch-data");

//=========================
// Alarm Time and Positions
//=========================

//-----------
// Alarm Time
//-----------

// Build an AlarmTime

function AlarmTime (h, mn, mode) {
   this.hours = h;
   this.minutes = mn;
   this.mode = mode;
}
exports.AlarmTime = AlarmTime;

// Initial alarm time

var InitialAlarmTime = new AlarmTime(0,0,"24H");
exports.InitialAlarmTime = InitialAlarmTime;

// Turn an AlarmTime into a string

AlarmTime.prototype.toString = function() {
   return this.hours + ":" + this.minutes + " " + this.mode ;
}

// Print an AlarmTime

function PrintAlarmTime(evt) {
   var at = evt.value;
   console.log(at.hours + ":" + at.minutes + " " + at.mode);
}
exports.PrintAlarmTime = PrintAlarmTime;

// Toggle an AlarmTime between 24H mode (the default) and AM/PM mode

function ToggleAlarmTimeMode (at) {
   if (at.mode == "24H") {
      // switch to ampn mode
      if (at.hours == 0) {
	 at.mode = "PM";
	 at.hours = TD.HoursPerHalfDay;
      } else if (at.hours <= TD.HoursPerHalfDay) {
	 at.mode = "AM";
      } else {
	 at.mode = "PM";
	 at.hours -= TD.HoursPerHalfDay;
      }
   } else {
      // switch to 24h mode
      if (at.mode == "PM") {
	 at.hours = (at.hours+TD.HoursPerHalfDay) % TD.HoursPerDay;
      }
      at.mode = "24H";
   }
   return at;
}
exports.ToggleAlarmTimeMode = ToggleAlarmTimeMode;

// Compare an AlarmTime to a WatchTime

function CompareAlarmTimeToWatchTime (at, wt) {
   var atmode = at.mode;
   if (atmode != "24H") ToggleAlarmTimeMode(at);
   var wtmode = wt.mode;
   if (wtmode != "24H") WD.ToggleWatchTimeMode(wt);
   res = (at.hours==wt.hours) && (at.minutes==wt.minutes);
   if (atmode != "24H") ToggleAlarmTimeMode(at);
   if (wtmode != "24H") WD.ToggleWatchTimeMode(wt);
   return res;
}
exports.CompareAlarmTimeToWatchTime = CompareAlarmTimeToWatchTime;

// AlarmTime positions to be set and enhanced
// 0=hours, 1=minutes
//===========================================

// Initial AlarmTimePosition

var InitialAlarmTimePosition = 0;
exports.InitialAlarmTimePosition = InitialAlarmTimePosition;

// Go to next AlarmTimePosition

function NextAlarmTimePosition (atp) {
   return (atp+1) % 2;
}
exports.NextAlarmTimePosition = NextAlarmTimePosition;

// To set a AlarmTime, increment only at  given position (no carry)

function IncrementAlarmTimeAtPosition (at, pos) {
   var atmode = at.mode;
   if (atmode != "24H") ToggleAlarmTimeMode(at);
   switch (pos) {
   case 0 : at.hours = (at.hours+1) % TD.HoursPerDay; break;
   case 1 : at.minutes = (at.minutes+1) % TD.MinutesPerHour; break;
   }
   if (atmode != "24H") ToggleAlarmTimeMode(at);
   return at;
}
exports.IncrementAlarmTimeAtPosition = IncrementAlarmTimeAtPosition;

// Beep four times a second (when time is equal to watch time and alarm is on)

function AlarmBeep (atp, wtp, shouldBeep) {
    if (shouldBeep && wtp.hours==atp.hours & wtp.minutes==atp.minutes) {
	return 4;
    } else {
	return 0;
    }
}
exports.AlarmBeep = AlarmBeep;

var AlarmDuration = 3;

/*
// For debugging : try AlarmTime in 24H and ampm modes

for (i=0; i<80; i++) {
    console.log("next");
    console.log(AlarmTime);
    ToggleAlarmTimeMode(AlarmTime);
    console.log(AlarmTime);
    ToggleAlarmTimeMode(AlarmTime);
    IncrementAlarmTime(AlarmTime);
}
*/

