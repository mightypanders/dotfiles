/*
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018 Jaume Fuster i Claris
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

// "Thus, programs must be written for people to read, and only incidentally for machines to execute."
// TODO: Commenting.

// ---------- CONFIGURATION ----------

// div.innerHTML : {a.innerHTML : a.href}
var sites = {
  "E-Mail": {
    GMail: "https://mail.google.com/mail/u/0/",
    Posteo: "https://www.posteo.de",
    realcore: "https://outlook.office365.com/mail/inbox",
    gCal: "https://calendar.google.com/calendar/r",
    Keep: "https://keep.google.com/u/0/",
  },
  Work: {
    gitlab: "https://gitlab.com/nutmountain/landgard?sort=updated_desc",
    "enfore api docs": "https://docs.apis.enfore.com/",
    "n4 daily":
      "https://zoom.us/j/274186354?pwd=Z29yamZaZ3dHV2ZOM1o2UkVHVUdpQT09",
    apex:
      "https://18.185.159.119:8443/ords/f?p=123:LOGIN_DESKTOP:15410784571178:::::",
    aws:
      "https://us-east-1.signin.aws.amazon.com/oauth?SignatureVersion=4&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJMOATPLHVSJ563XQ&X-Amz-Date=2019-10-15T15%3A01%3A16.654Z&X-Amz-Signature=5cd9c455e673d043421f5bc47b87c61a438cd5b85d808f85e6b3304f0ef6c2de&X-Amz-SignedHeaders=host&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fhomepage&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Fstate%3DhashArgs%2523%26isauthcode%3Dtrue&response_type=code&state=hashArgs%23",
    "rc-intranet": "https://realcorevv.sharepoint.com/sites/RC-Intranet/",
    food:
      "https://www.rge-essen.de/dienstleistungen/gastronomie/speiseplaene.html",
  },
  Social: {
    WhatsApp: "https://web.whatsapp.com",
    Telegram: "https://web.telegram.org",
    discord: "https://discordapp.com/channels/@me",
    YouTube: "https://www.youtube.com/",
    threema: "https://web.threema.ch",
  },
  /*	"Games": { // To find the game ID check the url in the store page or the community page
					"CS:GO"				: "steam://run/730",
					"Besiege"			: "steam://run/346010",
					"Rust"				: "steam://run/252490",
					"Insurgency"		: "steam://run/222880",
					"West of Loathing"	: "steam://run/597220",
					"POSTAL 2"			: "steam://run/223470"
				},*/
  News: {
    worldnews: "https://reddit.com/r/worldnews",
    golem: "https://www.golem.de/",
    heise: "https://www.heise.de/",
    WAZ: "http://www.waz.de",
    FAZ: "http://www.faz.net",
    HackerNews: "https://news.ycombinator.com/",
  },
  Programming: {
    "/r/programming": "https://reddit.com/r/programming",
    Github: "https://github.com/",
    gisthub: "https://gist.github.com/",
    regex101: "https://regex101.com/",
    extensions: "http://extensionmethod.net/csharp",
  },
  reddit: {
    linux: "https://reddit.com/r/linux",
    sffpc: "https://reddit.com/r/sffpc",
    unixporn: "https://reddit.com/r/unixporn",
    games: "https://reddit.com/r/games",
    switchhaxing: "https://reddit.com/r/switchhaxing",
    switchhacks: "https://reddit.com/r/switchhacks",
  },
  brudi: {
    heimdall: "http://brudi.xyz",
    gitea: "http://gitea.brudi.xyz",
    etherpad: "http://pad.brudi.xyz",
    send: "http://send.brudi.xyz",
    kanban: "http://kanboard.brudi.xyz",
    pics: "http://pics.brudi.xyz",
  },
};

var search = {
  default: "https://google.com/search",
  d: "https://duckduckgo.com/",
  s: "https://startpage.com/do/search",
};

var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";

// ---------- BUILD PAGE ----------
function matchLinks(regex = prevregexp) {
  totallinks = 0;
  pivotmatch = regex == prevregexp ? pivotmatch : 0;
  prevregexp = regex;
  pivotbuffer = pivotmatch;
  p = document.getElementById("links");
  while (p.firstChild) {
    p.removeChild(p.firstChild);
  }
  if (regex.charAt(1) == " " && search.hasOwnProperty(regex.charAt(0))) {
    document.getElementById("action").action = search[regex.charAt(0)];
    document.getElementById("action").children[0].name = "q";
  } else {
    match = new RegExp(regex ? regex : ".", "i");
    gmatches = false; // kinda ugly, rethink
    for (i = 0; i < Object.keys(sites).length; i++) {
      matches = false;
      sn = Object.keys(sites)[i];
      section = document.createElement("div");
      section.id = sn;
      section.innerHTML = sn;
      section.className = "section";
      inner = document.createElement("div");
      for (l = 0; l < Object.keys(sites[sn]).length; l++) {
        ln = Object.keys(sites[sn])[l];
        if (match.test(ln)) {
          link = document.createElement("a");
          link.href = sites[sn][ln];
          link.innerHTML = ln;
          if (!pivotbuffer++ && regex != "") {
            link.className = "selected";
            document.getElementById("action").action = sites[sn][ln];
            document
              .getElementById("action")
              .children[0].removeAttribute("name");
          }
          inner.appendChild(link);
          matches = true;
          gmatches = true;
          totallinks++;
        }
      }
      section.appendChild(inner);
      matches ? p.appendChild(section) : false;
    }
    if (!gmatches || regex == "") {
      document.getElementById("action").action = search["default"];
      document.getElementById("action").children[0].name = "q";
    }
  }
  document.getElementById("main").style.height =
    document.getElementById("main").children[0].offsetHeight + "px";
}

document.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      pivotmatch = pivotmatch >= 0 ? 0 : pivotmatch + 1;
      matchLinks();
      break;
    case 40:
      pivotmatch =
        pivotmatch <= -totallinks + 1 ? -totallinks + 1 : pivotmatch - 1;
      matchLinks();
      break;
    default:
      break;
  }
  document.getElementById("action").children[0].focus();
};

document.getElementById("action").children[0].onkeypress = function (e) {
  if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    return false;
  }
};

function displayClock() {
  now = new Date();
  clock =
    (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) +
    ":" +
    (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
    ":" +
    (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
  document.getElementById("clock").innerHTML = clock;
}

window.onload = matchLinks();
document.getElementById("action").onsubmit = function () {
  svalue = this.children[0].value;
  if (svalue.charAt(1) == " " && search.hasOwnProperty(svalue.charAt(0))) {
    this.children[0].value = svalue.substring(2);
  }
  return true;
};
displayClock();
setInterval(displayClock, 1000);
