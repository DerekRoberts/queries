/*
* Patient profile functions.  E.g. active status, age
*
*/

var profile = profile || {};


/**
 * Returns whether a patient has an encounter in a specified date range.
 *
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                date object, end of interval
 * @param activeWindow
 *                time window (seconds), for start of interval
 * @return
 *                true/false (boolean)
 */
profile.activeEncounter = function( patient, atDate, activeWindow ){
  // Active status window, patient encounters and dates
  var ptEncounters = patient.encounters(),
      end          = Math.floor( atDate.getTime() / 1000 ),
      start        = end - activeWindow;

  // Check for encounters in the past 3 years (see activeWindow)
  ptEncounters.forEach( function( ptEnc ){
    if( !utils.isUndefinedOrNull( ptEnc.json.start_time )){
      encDate = ptEnc.json.start_time;
      if(( start <= encDate )&&( encDate <= end )){
        return true;
      }
    }
  });

  // Otherwise none were found
  return false;
}


/**
 * Returns whether a patient has a prescription event (start or stop of med)
 * in a specified date range.
 *
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                date object, end of interval
 * @param activeWindow
 *                time window (seconds), for start of interval
 * @return
 *                true/false (boolean)
 */
profile.activeMedication = function( patient, atDate, activeWindow ){
  // Active status window, patient encounters and dates
  var ptMedications = patient.medications();
      intervalEnd   = Math.floor( atDate.getTime() / 1000 ),
      intervalStart = intervalEnd - activeWindow,
      atTime        = "Value not assigned";

  // Check for med events in the specified interval
  ptMedications.forEach( function( ptMed ){
    // Is this end time in the interval?
    if( !utils.isUndefinedOrNull( ptMed.json.end_time )){
      atTime = ptMed.json.end_time;
      if(( intervalStart <= atTime )&&( atTime <= intervalEnd )){
        return true;
      }
    }

    // Is this start time in the interval?
    if( !utils.isUndefinedOrNull( ptMed.json.start_time )){
      atTime = ptMed.json.start_time;
      if(( intervalStart <= atTime )&&( atTime <= intervalEnd )){
        return true;
      }
    }
  });

  // ...Otherwise no in range med events have been found
  return false;
}


/**
 * Returns whether a patient is active or not.  Uses encounter times and
 * medication status with a specified window (activeWindow).
 *
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date for active status
 * @return
 *                true/false (boolean)
 */
profile.active = function( patient, atDate, errorContainer ){
  // Check input
  if( utils.isUndefinedOrNull( patient, patient.json, atDate ) ){
    return utils.invalid(
      "Invalid or incomplete data in profile.active", errorContainer
    );
  }

  // Store active window from detauls
  var activeWindow = dictionary.defaults.active.window;

  // Active if patient has an encounter in the last 3 years (activeWindow)
  if( profile.activeEncounter( patient, atDate, activeWindow )){
    return true;
  }

  // Active if patient has an active medication (see activeWindow)
  if( profile.activeMedication( patient, atDate, activeWindow )){
    return true;
  }

  // ...Otherwise the patient not active
  return false;
};


/**
 * Returns a patient's gender.  E2E does not support gender change over time.
 *
 * @param patient
 *                hQuery patient object
 * @return
 *                Gender (string)
 */
profile.gender = function( patient, errorContainer ){
  // Check input
  if( utils.isUndefinedOrNull( patient, patient.json )){
    return utils.invalid(
      "Invalid or incomplete patient object", errorContainer
    );
  }

  // Read results, provide a string
  switch( patient.json.gender ){
    case 'M'  : return 'male';
    case 'F'  : return 'female';
    case 'UN' : return 'undifferentiated';
    default   : return 'undefined';
  }
};


/**
 * Returns whether a patient's age, at a specific date, is within a range.
 *
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date
 * @param ageMin
 *                minimum age
 * @param ageMax
 *                maximum age
 * @return
 *                true/false (boolean)
 */
profile.ages = profile.ages ||{};
profile.ages.isRange = function( patient, atDate, ageMin, ageMax, errorContainer ){
	// Check input
  if( utils.isUndefinedOrNull( patient, atDate, ageMin, ageMax ) ){
    return utils.invalid(
      "Invalid or incomplete data in profile.ages.isRange()", errorContainer
    );
  }

	var ageNow = patient.age( atDate );
  if( utils.isUndefinedOrNull( ageNow ) ){
    return utils.invalid(
      "Invalid or incomplete patient.age", errorContainer
    );
  }
  return (( ageMin <= ageNow )&&( ageNow <= ageMax ));
};


/**
 * Returns whether a patient's age, at a specific date, is within a range.
 *
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date
 * @param ageMax
 *                maximum age
 * @return
 *                true/false (boolean)
 */
profile.ages.isMax = function( patient, atDate, ageMax, errorContainer ){
  // Call isRange, use default for ageMin
	var ageMin = dictionary.defaults.ages.min;
	return profile.ages.isRange( patient, atDate, ageMin, ageMax, errorContainer );
};


/**
 * Returns whether a patient's age, at a specific date, is within a range.
 *
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date
 * @param ageMin
 *                minimum age
 * @return
 *                true/false (boolean)
 */
profile.ages.isMin = function( patient, atDate, ageMin, errorContainer ){
  // Call isRange, use default for ageMax
	var ageMax = dictionary.defaults.ages.max;
	return profile.ages.isRange( patient, atDate, ageMin, ageMax, errorContainer );
};
