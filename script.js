const TAG_INDEX = 0;
const NAME_INDEX = 1;
const TIME_INDEX = 2;

// Test data
var data = [
	["DMC", "Misc", 132],
	["Noob", "Fatal", 2],
	["DMC", "Kira", 132],
	["Noob", "Dynamic", 2],
	["x", "Jessica", 54],
	[".", "Elite", 32],
	["GOD", "SpeckZoR", 52],
	["oi", "urmum", 23],
	["Noob", ".", 74],
	["ay", "ay", 5]
];

var subtitles = [
	"Hourly",
	"Daily",
	"Weekly"
];

var subtitleIndex = 1;

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
};


/**
 *  Fills in the leaderboard with rows of data extracted from an array.
 *  @param An array of arrays where the inner arrays contain the column 
 * 			entries for an individual row.
 */

function fillTable(data) {
	var entries = document.getElementById("entries");
	//get each column
	var tags = document.getElementById("tag");
	var names = document.getElementById("name");
	var times = document.getElementById("time");
	
	for(var i = 0; i < data.length; i++) {
		var currentEntry = data[i];
		//insert tag
		var tag = currentEntry[TAG_INDEX];
		var newTag = document.createElement("div");
		newTag.setAttribute("class", "tag-in ent-m");
		newTag.innerHTML = tag;
		tags.appendChild(newTag);
		
		//insert name
		var name = currentEntry[NAME_INDEX];
		var newName = document.createElement("div");
		newName.setAttribute("class", "name-in ent-m");
		newName.innerHTML = name;
		names.appendChild(newName);
		
		//insert time
		var time = currentEntry[TIME_INDEX];
		var newTime = document.createElement("div");
		newTime.setAttribute("class", "time-in ent-m");
		newTime.innerHTML = time;
		times.appendChild(newTime);
	}
}

/**
 *  A comparison function designed to be used with sortData()
 * 	to correctly order the rows of the table
 *	@param input1 First item being compared
 *  @param input2 Second item being compared
 *  @return 1 if input1 should come before input2
 * 			0 if input1 and input2 are of equal value
 *	        -1 if input 1 should come after input2;
 */

function compareEntries(input1, input2) {
	var time1 = input1[TIME_INDEX];
	var time2 = input2[TIME_INDEX];
	if(time1 < time2) return 1;
	else if(time1 > time2) return -1;
	var name1 = input1[NAME_INDEX];
	var name2 = input2[NAME_INDEX];
	if(name1 < name2) return -1;
	else if(name1 > name2) return 1;
	var tag1 = input1[TAG_INDEX];
	var tag2 = input2[TAG_INDEX];
	if(tag1 < tag2) return -1;
	else if(tag1 > tag2) return 1;
	else return 0;
}

/**
 *  Swaps two items in an array
 *  @param one Index of first item to be swapped
 *  @param two Index of second item to be swapped
 */

function swap(data, one, two) {
	var temp = data[one];
	data[one] = data[two];
	data[two] = temp;
}

/**
 *  The main auxilliary function of quicksort. Divides data according
 *  to the pivot and the given compare function.
 *  @param data Data array to be sorted
 *  @param left Index of the left-most item being considered
 *  @param right Index of the right-most item being considered
 *  @param Generic function used for comparisons
 *  @return The index of where the pivot was positioned.
 */

function partition(data, left, right, compare) {
	var pivotIndex = Math.floor(left + (right-left)/2);
	var pivot = data[pivotIndex];
	swap(data, pivotIndex, right);
	var i = left;
	var j = right - 1;
	while(i <= j) {
		while(i <= j && compare(data[i], pivot) <= 0) i++;
		while(i <= j && compare(data[j], pivot) >= 0) j--;
		if(i < j) swap(data, i++, j--);
	}
	swap(data, i, right);
	return i;
}

/**
 *  Sorts a data array according to the given compare function
 *  @param data Data array to be sorted
 *  @param left Index of the left-most item being considered
 *  @param right Index of the right-most item being considered
 *  @param Generic function used for comparisons
 */


function quickSort(data, left, right, compare) {
	if(left < right) {
		var pivot = partition(data, left, right, compare);
		quickSort(data, left, pivot - 1, compare);
		quickSort(data, pivot + 1, right, compare);
	}
}

/**
 *  Sorts a data array according to the given compare function. 
 *  Uses quicksort() but defines the boundary of the array so that
 *  the recursion can begin.
 */

function sortData(data, compare) {
	quickSort(data, 0, data.length-1, compare);
}


sortData(data, compareEntries);
fillTable(data);

$("#down").click(function(){
	var menu = $("#dropMenu");
	if(menu.hasClass("hidden")) {
		menu.slideDown();
	} else {
		menu.slideUp();
	}
	menu.toggleClass("hidden");
	$(this).toggleClass("rotate");
});

$(".drop-item").click(function() {
	$("#time-head span").text($(this).text());
	$("#down").trigger("click");
});

$("#left").click(function(){
	var span = $("#subtitle span");
	subtitleIndex = (subtitleIndex-1).mod(subtitles.length);
	span.text(subtitles[subtitleIndex]);
});

$("#right").click(function(){
	var span = $("#subtitle span");
	subtitleIndex = (subtitleIndex+1).mod(subtitles.length);
	span.text(subtitles[subtitleIndex]);
});