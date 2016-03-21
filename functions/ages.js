/**
* T/F: Does the patient fall in this age range?
*
* @param patient - the hQuery patient object to consider
* @param atDate  - reference date for function
* @param ageMin  - lower (inclusive) bound of the age range
* @param ageMax  - upper (inclusive) bound of the age range
*
* @return (boolean) - true if in age range, false if not, false on error
*/
var ages = ages ||{};
ages.isRange = function( patient, atDate, ageMin, ageMax ){
	// Check input
	if(
		patient === undefined || patient === null ||
		atDate === undefined || atDate === null ||
		ageMin === undefined || ageMin === null ||
		ageMax === undefined || ageMax === null
	){
		return error( "isAgeRange input" );
	}

	var ageNow = patient.age( atDate );
	if(
		ageNow === undefined || ageNow === null ||
		typeof ageNow != 'number'
	){
		return error( "patient.age" );
	}
	else {
		return (( ageMin <= ageNow )&&( ageNow <= ageMax ));
	}
};

// Call isRange, use default for ageMin
ages.isMax = function( patient, atDate, ageMax ){
	var ageMin = defaults.ages.min();
	return this.isRange( patient, atDate, ageMin, ageMax );
};

// Call isRange, use default for ageMax
ages.isMin = function( patient, atDate, ageMin ){
	var ageMax = defaults.ages.max();
	return this.isRange( patient, atDate, ageMin, ageMax );
};
