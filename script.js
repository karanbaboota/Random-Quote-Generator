// Hides image if not found
function hideImg()
{
	$("#image").hide()
}

// Quote from API
var getQuote = function() {

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://quotes15.p.rapidapi.com/quotes/random/",
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "63667f6de5msh5400ecb1ca12a40p16b6bcjsn6d3680b30128",
			"x-rapidapi-host": "quotes15.p.rapidapi.com"
		},
		"onload": showLoad()
	};

	$.ajax(settings).done(function (response) {
	console.log(response);
	$("#quote").css("display", "none")
	$("#quote").html(' "' + response.content + '" ');
	text_effect()
	$("#author").html("- " + response.originator.name);
	author_effect()
});
}

// Image from API
//var getImg = function() {
//	const settings = {
//		"async": true,
//		"crossDomain": true,
//		"url": 'https://app.zenserp.com/api/v2/search?apikey=ae8094e0-b004-11eb-8b94-7f064a312bc5&q=Corrie Ten boom&tbm=isch',
//		"method": "GET"
//	};
//
//$.ajax(settings).done(function(response) {
//	console.log(response.image_results[0])
//	$("#image").attr("src", response.image_results[0].thumbnail)
//});
//}

//Transition for quote text
var text_effect = function() {
	$(".loader").css("display", "none") // To hide the loader
	
	// Wrap every letter in a span
	var textWrapper = document.querySelector('#quote');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
	$("#quote").css("display", "contents")
	
	anime.timeline({loop: false})
	  .add({
		targets: '#quote .letter',
		translateX: [40,0],
		translateZ: 0,
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 120,
		delay: (el, i) => 30 * i
	  });
}

//Transition for author text
var author_effect = function() {
	// Wrap every letter in a span
	var textWrapper = document.querySelector('#author');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

	anime.timeline({loop: false})
	  .add({
		targets: '#author .letter',
		translateX: [40,0],
		translateZ: 0,
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 1200,
		delay: (el, i) => 80 * i
	  });		
}

// When the text is loading
var showLoad = function() {
	console.log("loading")
	$("#quote").html("Loading...")
	$("#author").html("")
	$(".loader").css("display", "block")
}

function copy() {
	console.log("copying")
	var range = document.createRange();
                    range.selectNode(document.getElementById("quote"));
                    window.getSelection().removeAllRanges(); // clear current selection
                    window.getSelection().addRange(range); // to select text
                    document.execCommand("copy");
                    window.getSelection().removeAllRanges();// to deselect



}

// When button is clicked
$(document).ready(function() {
	$("#press").click(function(){
		getQuote();
//		getImg();
		
	});
});
