// Get lineups
var table = document.getElementsByClassName("lineup-table");
var batters = table[0];
var pitchers = table[1];

var lgtype = '';
chrome.storage.sync.get({
	lgtype: 'fgpts'
}, function(items) {
	lgtype = items.lgtype;
	if (lgtype == 'fgpts') {
		var gamesColumn = 4;
		var batterPtsColumn = 14;
		var ipColumn = 4;
		var pitcherPtsColumn = 12;
	} else if (lgtype == 'sabrpts') {
		var gamesColumn = 4;
		var batterPtsColumn = 14;
		var ipColumn = 4;
		var pitcherPtsColumn = 11;
	}

	// Add batter column header
	var batterHead = batters.tBodies[0].children[1];
	var statHead = batterHead.innerHTML;
	var th = document.createElement("th");
	th.innerHTML = "P/G";
	batterHead.appendChild(th);

	// Add ppg for batters
	var lineupSlots = Array.prototype.slice.call( batters.tBodies );
	// remove player info row
	lineupSlots = lineupSlots.slice(1);
	for (var slot in lineupSlots) {
		var slotRow = Array.prototype.slice.call( lineupSlots[slot].rows );
		// iterate through each slot
		for (var player in slotRow) {
			var playerRow = slotRow[player];
			// iterate through each sub-slot
			// skip sub-slots without data 
			if (playerRow.cells.length > 1 && typeof playerRow.cells[gamesColumn] != 'undefined') {
				var games = parseFloat(playerRow.cells[gamesColumn].innerHTML);
				// check games is not 0
				if (games === games) {
					var pts = parseFloat(playerRow.cells[batterPtsColumn].innerHTML);
					var avg = pts / games;
					var td = document.createElement("td");
					td.innerHTML = avg.toFixed(3);
					playerRow.appendChild(td);
				}
			}	
		}
	}

	// Add batter column header
	var pitcherHead = pitchers.tBodies[0].children[1];
	var pitcherStatHead = pitcherHead.innerHTML;
	var thp = document.createElement("th");
	thp.innerHTML = "P/IP";
	pitcherHead.appendChild(thp);

	var pitcherlineupSlots = Array.prototype.slice.call( pitchers.tBodies );
	// remove player info row
	pitcherlineupSlots = pitcherlineupSlots.slice(1);

	// Add pip for pitchers
	for (var slot in pitcherlineupSlots) {
		var slotRow = Array.prototype.slice.call( pitcherlineupSlots[slot].rows );
		// iterate through each slot
		for (var player in slotRow) {
			var playerRow = slotRow[player];
			// iterate through each sub-slot
			// skip sub-slots without data 
			if (playerRow.cells.length > 1 && typeof playerRow.cells[pitcherPtsColumn] != 'undefined') {
				var ip = parseFloat(playerRow.cells[ipColumn].innerHTML);
				// check ip is not 0
				if (ip === ip) {
					// handle fractions of an inning
					ip = parseFloat(ip.toFixed(1));
					var fraction = ip - Math.floor(ip);
					ip = ip + fraction * .23;
					var pts = parseFloat(playerRow.cells[pitcherPtsColumn].innerHTML);
					var avg = pts / ip;
					var td = document.createElement("td");
					td.innerHTML = avg.toFixed(3);
					playerRow.appendChild(td);
				}
			}
		
		}
	}

});
