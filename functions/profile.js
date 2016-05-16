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
 * @return true/false (boolean)
 */
profile.activeEncounter = function(patient, atDate, activeWindow) {
    // Active status window, patient encounters and dates
    var ptEncounters = patient.encounters(), end = Math
	    .floor(atDate.getTime() / 1000), start = end - activeWindow, isActive = false;

    // Check for encounters in specified window
    ptEncounters
	    .forEach(function(ptEnc) {
		if (!isActive
			&& !utils.isUndefinedOrNullPath([ ptEnc,
				".json.start_time" ])) {
		    encDate = ptEnc.json.start_time;
		    if ((start <= encDate) && (encDate <= end)) {
			// If found, mark active and exit (false req to break
			// function loop)
			isActive = true;
			return false;
		    }
		}
	    });

    // Return results
    return isActive;
}

/**
 * Returns the number of encounters for a patient in a date range.
 * 
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                date object, uses only month and year
 * @return true/false (boolean)
 */
profile.countEncountersByMonth = function(patient, atDate) {
    var ptEncounters = patient.encounters(), atYear = atDate.getFullYear(), atMonth = atDate
	    .getMonth(), start = new Date(atYear, atMonth - 1, 1).getTime(), end = new Date(
	    atYear, atMonth, 1).getTime(), count = 0;

    // Check for encounters in specified window
    ptEncounters.forEach(function(ptEnc) {
	if (!utils.isUndefinedOrNullPath([ ptEnc, ".json.start_time" ])

	) {
	    // Convert date from seconds to milliseconds (*1000, from epoch)
	    encDate = ptEnc.json.start_time * 1000;
	    emit(start.toString() + " ?< " + encDate.toString(), -1);
	    if ((start <= encDate) && (encDate < end)) {
		// If date in range, tally and continue
		count++;
	    }
	}
    });

    // Return results
    return count;
}

/**
 * Returns whether a patient has a prescription event (start or stop of med) in
 * a specified date range.
 * 
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                date object, end of interval
 * @param activeWindow
 *                time window (seconds), for start of interval
 * @return true/false (boolean)
 */
profile.activeMedication = function(patient, atDate, activeWindow) {
    // Medications, dates and active status
    var ptMedications = patient.medications();
    end = Math.floor(atDate.getTime() / 1000), start = end - activeWindow,
	    atTime = "Value not assigned", isActive = false;

    // Check for med events in the specified interval
    ptMedications
	    .forEach(function(ptMed) {
		// Are any end times in the interval?
		if (!utils.isUndefinedOrNullPath([ ptMed, ".json.end_time" ])) {
		    atTime = ptMed.json.end_time;
		    if ((start <= atTime) && (atTime <= end)) {
			// If found, mark active and exit (false req to break
			// function loop)
			isActive = true;
			return false;
		    }
		}

		// No? Then are any start times in the interval?
		if (!isActive
			&& !utils.isUndefinedOrNullPath([ ptMed,
				".json.start_time" ])) {
		    atTime = ptMed.json.start_time;
		    if ((start <= atTime) && (atTime <= end)) {
			// If found, mark active and exit (false req to break
			// function loop)
			isActive = true;
			return false;
		    }
		}
	    });

    // Return results
    return isActive;
}

/**
 * Returns whether a patient is active or not. Uses encounter times and
 * medication status with a specified window (activeWindow).
 * 
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date for active status
 * @return true/false (boolean)
 */
profile.active = function(patient, atDate, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid or incomplete data in profile.active", utils.invalid,
	    errorContainer, [ patient, "patient", ".json" ],
	    [ atDate, "atDate" ])) {
	return false;
    }

    // Store active window from defaults
    var activeWindow = defaults.active.window;

    // Check encounters and meds for active status
    if (profile.activeEncounter(patient, atDate, activeWindow)
	    || profile.activeMedication(patient, atDate, activeWindow)) {
	return true;
    } else {
	return false;
    }
};

/**
 * Returns a patient's gender. E2E does not support gender change over time.
 * 
 * @param patient
 *                hQuery patient object
 * @return Gender (string)
 */
profile.gender = function(patient, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog("Invalid or incomplete patient object",
	    utils.invalid, errorContainer, [ patient, "patient", ".json" ])) {
	return false;
    }

    // Read results, provide a string
    switch (patient.json.gender) {
    case 'M':
	return 'male';
    case 'F':
	return 'female';
    case 'UN':
	return 'undifferentiated';
    default:
	return 'undefined';
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
 *                minimum age (inclusive)
 * @param ageMax
 *                maximum age (inclusive)
 * @return true/false (boolean)
 */
profile.ages = profile.ages || {};
profile.ages.isRange = function(patient, atDate, ageMin, ageMax, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid or incomplete data in profile.ages.isRange()",
	    utils.invalid, errorContainer, [ patient, "patient" ], [ atDate,
		    "atDate" ], [ ageMin, "ageMin" ], [ ageMax, "ageMax" ])) {
	return false;
    }

    var ageNow = patient.age(atDate);
    if (utils.isUndefinedOrNull(ageNow)) {
	return utils.invalid("Invalid or incomplete patient.age",
		errorContainer);
    }
    return ((ageMin <= ageNow) && (ageNow <= ageMax));
};

/**
 * Returns whether a patient's age, at a specific date, is within a range.
 * 
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date
 * @param ageMax
 *                maximum age (inclusive)
 * @return true/false (boolean)
 */
profile.ages.isMax = function(patient, atDate, ageMax, errorContainer) {
    // Call isRange, use default for ageMin
    var ageMin = defaults.ages.min;
    return profile.ages
	    .isRange(patient, atDate, ageMin, ageMax, errorContainer);
};

/**
 * Returns whether a patient's age, at a specific date, is within a range.
 * 
 * @param patient
 *                hQuery patient object
 * @param atDate
 *                reference date
 * @param ageMin
 *                minimum age (inclusive)
 * @return true/false (boolean)
 */
profile.ages.isMin = function(patient, atDate, ageMin, errorContainer) {
    // Call isRange, use default for ageMax
    var ageMax = defaults.ages.max;
    return profile.ages
	    .isRange(patient, atDate, ageMin, ageMax, errorContainer);
};
