/**
* Return maximum allowable age
*
* @return message - maximum allowable age
*/

// Defaults object
var   defaults = defaults ||{};
defaults.ages  = defaults.ages  ||{};
defaults.dates = defaults.dates ||{};

// Dates
defaults.dates.start = function(){
	// Remember months are zero indexed
	return new Date( 2016, 2, 1 );
}

defaults.dates.end = function(){
	return new Date();
}

// Ages
defaults.ages.min = function(){
	return 0;
}

defaults.ages.max = function(){
	return 120;
}
