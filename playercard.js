// Get number of tables to go over
var sections = document.getElementsByClassName("section-container");
var tables = [];
var firstHeader = sections[0].getElementsByTagName("h3")[0].innerHTML;
var secondHeader = sections[2].getElementsByTagName("h3")[0].innerHTML;
if (firstHeader == 'MLB Stats') {
	tables.push(1);
	if (secondHeader == 'MILB Stats') {
		tables.push(3);
	}
} else if (firstHeader == 'MILB Stats') {
	tables.push(1);
}

var lgtype = '';
var hitter = (sections[0].getElementsByTagName("h3")[1].innerHTML == 'Batting') ? true : false;
chrome.storage.sync.get({
	lgtype: 'fgpts'
}, function(items) {
	lgtype = items.lgtype;
	if (lgtype == 'fgpts') {
		var gamesColumn = 2;
		var batterPtsColumn = 13;
		var ipColumn = 3;
		var pitcherPtsColumn = 11;
	} else if (lgtype == 'sabrpts') {
		var gamesColumn = 2;
		var batterPtsColumn = 13;
		var ipColumn = 3;
		var pitcherPtsColumn = 10;
	}

	for (var tableIndex in tables) {
		// Add column header
		var rows = sections[tables[tableIndex]].getElementsByTagName("tr");
		var header = rows[0];
		var th = document.createElement("th");
		if (hitter) {
			th.innerHTML = "P/G";
		} else {
			th.innerHTML = "P/IP";
		}
		header.appendChild(th);

		// remove header info row
		var yearRows = Array.prototype.slice.call( rows );
		years = yearRows.slice(1);
		for (var year in years) {
			var playerRow = years[year];
			// iterate through each year
			if (hitter) {
				var games = parseFloat(playerRow.cells[gamesColumn].innerHTML);
				// check games is not 0
				if (games === games) {
					var pts = parseFloat(playerRow.cells[batterPtsColumn].innerHTML);
					var avg = pts / games;
					var td = document.createElement("td");
					td.innerHTML = avg.toFixed(3);
					playerRow.appendChild(td);
				}
			} else {
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
