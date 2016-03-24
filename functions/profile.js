/*
* Functions relating directly to the patient object, such as:
*  - active status
*  - gender
*  - ages: isRange, isMin and isMax
*/

var profile = profile ||{};

/*
* Determines if a patient is active.
*
* @param patient - patient object that contains the patient API
* @param refDate (Date) - a date to use as a reference, defaults to now if not passed.
* @param frame (int) - number of seconds to use as the window for reference. i.e. how many seconds before the refDate, defaults to 3 years if not passed.
*
* @return - true if the patient is considered active, false otherwise.
*/
profile.active = function( patient, refDate, frame ){
  if( !patient ){
    return false;
  }

  refDate = refDate || new Date();
  frame   = frame || 94608000 ; //3 years in seconds: 60*60*24*365*3

  // check if they have an encounter in the last 24 months
  var eList = patient.encounters();
  var tmpTime = null;

  for( var e = 0; e < eList.length; e++ ){
    tmpTime = eList[e].json.start_time;

    //check that the time was defined
    if( tmpTime !== undefined && tmpTime !== null ){
      //check if the date of the counter falls within our range.
      if( (tmpTime <= refDate.getTime()/1000) && (tmpTime >= (refDate.getTime()/1000 - frame)) ){
        return true;  //if we get to here we have found an encounter that is valid as per the refDate and frame variables
      }
    }
  }

  // check if they have a medication in the last 24 months
  var mList   = patient.medications();
  var start   = null;
  var stop    = null;
  var A       = Math.floor(refDate.getTime()/1000);
  var B       = Math.floor(refDate.getTime()/1000 - frame);

  for( var m = 0; m < mList.length; m ++ ){
    start = mList[m].json.start_time;
    stop = mList[m].json.end_time;

    if ( isNaN(start) || start === undefined || start === null ){
      continue;
    }

    //if stop is not defined we assume it goes to infinity
    if ( isNaN(stop) || stop === undefined || start === null ){
      stop = 7258118400;  //Jan 1st 2200
    }

    //check that we have valid start and stop dates
    start = Math.floor( (new Date( start*1000) ).getTime()/1000 ); //returns in number of seconds.
    stop = Math.floor( ( new Date(stop*1000) ).getTime()/1000 ); //returns in number of seconds.

    // Cases:
    //
    // 1--|  2-----|    3----------|                    4------| 5---|
    //          |-------------------------------------------|
    //          A                                           B
    //
    // 1) start < A && stop < A                                 -> exclude
    // 2) start < A && stop >= A                                -> include
    // 3) start >= A && stop >= A && stop <= B && start < B     -> include
    // 4) start <= B && stop > B                                -> include
    // 5) start > B && stop > B                                 -> exclude

    if( start < A && stop < A ){ //case 1
      continue;
    }
    else if( start < A && stop >= A ){ //case 2
      return true;
    }
    else if( start >= A && stop >= A && start <= B && stop >= B ){ //case 3
      return true;
    }
    else if( start > A && start <= B && stop > B ){ //case 4
      return true;
    }
    else if( start > B && stop > B ){ //case 5
      continue;
    }
    else{ //possible I missed a case, ignore the med.
      continue;
    }
  }

  //if we get to here we failed the above tests and should return false.
  return false;
};


/**
* Returns a patient's gender.  E2E does not support gender change over time.
*
* @param patient {Object} - The hQuery patient object.
* @return {String} - The gender of the patient. Null is returned if no gender was found or there was an error.
*/
profile.gender = function( patient ){
  // Check input
  if( !patient || !patient.json )
    return null;

  // Read results, provide a string
  switch( patient.json.gender ){
    case 'M'  : return 'male';
    case 'F'  : return 'female';
    case 'UN' : return 'undifferentiated';
    default   : return 'undefined';
  }
};

profile.ages = profile.ages ||{};
profile.ages.isRange = function( patient, atDate, ageMin, ageMax ){
	// Check input
	if(
		patient === undefined || patient === null ||
		atDate === undefined || atDate === null ||
		ageMin === undefined || ageMin === null ||
		ageMax === undefined || ageMax === null
	){
		return emitter.error( "isAgeRange input" );
	}

	var ageNow = patient.age( atDate );
	if(
		ageNow === undefined || ageNow === null ||
		typeof ageNow != 'number'
	){
		return emitter.error( "patient.age" );
	}
	else {
		return (( ageMin <= ageNow )&&( ageNow <= ageMax ));
	}
};


/**
* T/F about patient's age.  Built around ages.isRange().
*
* @param patient - patient object
* @param atDate  - date, for retro query
@
* @return {String} - The gender of the patient. Null is returned if no gender was found or there was an error.
*/
profile.ages.isRange = function( patient, atDate, ageMin, ageMax ){
	// Check input
	if(
		patient === undefined || patient === null ||
		atDate === undefined || atDate === null ||
		ageMin === undefined || ageMin === null ||
		ageMax === undefined || ageMax === null
	){
		return emitter.error( "isAgeRange input" );
	}

	var ageNow = patient.age( atDate );
	if(
		ageNow === undefined || ageNow === null ||
		typeof ageNow != 'number'
	){
		return emitter.error( "patient.age" );
	}
	else {
		return (( ageMin <= ageNow )&&( ageNow <= ageMax ));
	}
};

// Call isRange, use default for ageMin
profile.ages.isMax = function( patient, atDate, ageMax ){
	var ageMin = dictionary.defaults.ages.min;
	return profile.ages.isRange( patient, atDate, ageMin, ageMax );
};

// Call isRange, use default for ageMax
profile.ages.isMin = function( patient, atDate, ageMin ){
	var ageMax = dictionary.defaults.ages.max;
	return profile.ages.isRange( patient, atDate, ageMin, ageMax );
};
