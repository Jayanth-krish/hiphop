"use hopscript"

const debug = require("hiphop");

service clickAndSearch() {
   return <html>
     <head css=${clickAndSearch.resource("./style.css")}>
       <script src="hiphop" lang="hopscript"></script>
       <script src="./click-and-search-hh.js" lang="hiphop"></script>
       <script defer>
	 const hh = require( "hiphop", "hopscript" );
	 const m = require( "./click-and-search-hh.js", "hiphop" )(searchWiki, translate);

	 function searchWiki(wordId) {
	    var word = document.getElementById(wordId).innerHTML;
	    return new Promise(res => {
	       try {
		  ${wiki}(word).post(r => res(r))
	       } catch (e) {
		  console.log('bug req cli');
	       }
	    });
	 }
	 
         function translate(wordId) {
	    var word = document.getElementById(wordId).innerHTML;
	    var req = new XMLHttpRequest();
	    var svc = "http://mymemory.translated.net/api/get?langpair=en|fr&q=" + word;
	    return new Promise(res => {
	       try {
		  req.onreadystatechange = () => {
	   	     if (req.readyState == 4 && req.status == 200)
	   		res(JSON.parse(req.responseText).responseData.translatedText);
		  };
		  req.open("GET", svc, true);
		  req.send();
	       } catch (e) {
		  ocnsole.log('bug req cli trans');
	       }
	    });
	 }
	 
	   m.addEventListener("trans", function(evt) {
	      if( evt.signalValue.resolve ) {
		 document.getElementById('trans').innerHTML = evt.signalValue.val;
	      }
	   });

	   m.addEventListener("green", function(evt) {
	      var el = document.getElementById(evt.signalValue);
	      el.style.color = "green";
	      var popup = document.getElementById("popup").style.display = "block";
	   });

	   m.addEventListener("black", function(evt) {
	      if (!evt.signalValue) {
		 return;
	      }
	      var el = document.getElementById(evt.signalValue);
	      el.style.color = "black";

	      var popup = document.getElementById("popup").style.display = "none";
	   });

	   m.addEventListener("red", function(evt) {
	      var el = document.getElementById(evt.signalValue);
	      el.style.color = "red";
	   });

	   m.addEventListener("wiki", function(evt) {
	      if( evt.signalValue.resolve ) {
		 var trans = document.getElementById("trans");
		 wiki.innerHTML = "<div>" + evt.signalValue.val + "</div>";
	      }
	   });

	   window.onload = function() {
	      var pre = document.getElementById("txt");
	      var file = ${getFile.resource("strcmp-manpage")};
	      pre.onclick = function() {
		 s = window.getSelection();
		 var node = s.anchorNode.parentNode;
		 if (node.id == "txt")
		    return;
		 m.inputAndReact("word", node.id);
	      };
	   ${getFile}(file).post(function(txt) {
	      let output = "";
	      let i = 0;

	      for (;i < txt.length;) {
		 while (txt[i] == " ") {
		    output += txt[i++];
		 }
		 output += "<span id='txt" + i +"'>";
		 while (txt[i] != " " && txt[i] != undefined) {
		    output += txt[i++];
		 }
		 output += "</span>";
	      }
	      pre.innerHTML = output;
	   });

	   }
       </script>
     </head>
     <body>
       <div id="popup">
	 <div id="trans"></div>
	 <div id="wiki"></div>
       </div>
       <pre id="txt"></pre>
     </body>
   </html>
}

service getFile(path) {
   return hop.HTTPResponseFile(path,
			       { contentType: "text/plain",
				 charset: hop.locale });
}

service wiki(word) {
   // return new Promise(res => {
   //    const util = require('util');
   //    const svc = hop.webService(util.format("http://localhost:8181/" + word));
   //    const frame = svc().post(result => {console.log(result); res(result)});
   // });
   // const srv = hop.webService("http://localhost:8181/" + word);
   // return new Promise(resolve => {
   //    srv().post(function(res) {
   // 	 console.log(res)
   // 	 resolve(res);
   //    });
   // });

   const svc = hop.webService(`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${word}`);
   return new Promise(resolve => {
      try {
	 svc().post(function(res) {
	    let page;

	    try {
	       page = res.parse.text['*'];
	    } catch (e) {}
   	    resolve(page || 'Page not found');
	 });
      } catch (e) {
	 console.log('bug req srv');
      }
   });
}
