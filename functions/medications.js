/*
 * Basic medication functions.  Dictionary-like functions are in dictionary.js.
 *
 */

var medications = medications || {};

// Returns whether the patient passed as the medication defined by medInfo on
// the date passed
medications.hasActiveMed = function(patient, date, medInfo) {
    // Check for dose in default range
    var doseMin = dictionary.defaults.doses.min, doseMax = dictionary.defaults.doses.max;
    return medications.hasActiveMedRange(patient, date, medInfo, doseMin,
	    doseMax);
};

// Returns whether the patient passed has the medication defined by Medifo
// on the date passed with a dose in the range passed
medications.hasActiveMedRange = function(patient, date, medInfo, doseMin,
	doseMax) {
    // Check input
    if (utils.isUndefinedOrNull(patient, date, medInfo, doseMin, doseMax)) {
	return emitter.error("hasActiveMedRange received invalid input");
    }

    // Get patient medication list
    var meds = patient.medications();

    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {
	return false;
    }

    // Filter meds list to those that match one of the codes defined for the
    // med. Implemented as a filter so that all meds will be checked and any
    // data issues found
    var matchingActiveMeds = meds.filter(function(med) {
	if (medications.isCodeMatch(med, medInfo)
		&& medications.isActiveMed(med, date)
		&& medications.isDoseInRange(med, doseMin, doseMax)) {
	    // Med is a code match, active for the date being examined, and has
	    // a dose in the required range.
	    return true;
	} else {
	    // Med either is not a code match, is not active for the date being
	    // examined,
	    // or does not have a valid dose in the required range and is
	    // therefore not a match
	    return false;
	}
    });

    if (matchingActiveMeds.length > 0) {
	// At least 1 active, matching med with a dose in the required range was
	// found
	return true;
    } else {
	// No active, matching med with a dose in the correct range was found
	return false;
    }
};

// Returns whether the medication entry passed is a match for any of the codes
// defined in medInfo
medications.isCodeMatch = function(med, medInfo) {
    // Check if it matches one of the codes defined in medInfo

    // TODO: do we want to manually do a match for each codeset or sync
    // the name in our structure to the name in the hQuery patient
    // object?
    if (!utils.isUndefinedOrNull(medInfo.ATC, med.json, med.json.codes,
	    med.json.codes.whoATC)
	    && (med.json.codes.whoATC.length > 0)) {
	// We have ATC codes defined for the med passed in
	// and at least one ATC code for the med being examined
	// Compare ATC codes

	if (utils.matchCodeSet(med.json.codes.whoATC, medInfo.ATC)) {
	    // we have a match
	    return true;
	}
    }

    // TODO add other codeset checks

    // We did not find a match in any of the codesets defined for the
    // Med
    return false;

}

// Examines the medication entry passed and returns whether it contains a valid
// dose in the range
// dosemin =< med dose <= doseMax
medications.isDoseInRange = function(med, doseMin, doseMax) {
    // check if there is a dose defined
    if (!utils.isUndefinedOrNull(med.json.values)
	    && (med.json.values.length > 0)
	    && !utils.isUndefinedOrNull(med.json.values[0].scalar)) {
	// A dose is defined for med
	var doseValue = parseFloat(med.json.values[0].scalar);
	if ((doseValue >= doseMin) && (doseValue <= doseMax)) {
	    // we have a med with a dose in the correct range
	    return true;
	}
    } else {
	// No dose was defined
	return false;
    }
}

// Returns whether the medication entry passed is active on the date passed
medications.isActiveMed = function(med, date) {
    // check for valid input, if invalid then we can't operate on the
    // medication, return false.
    if (utils.isUndefinedOrNull(med, med.json)) {
	return false;
    }

    // Default to current date if no date is supplied
    if (utils.isUndefinedOrNull(date) || isNaN(date)) {
	date = new Date();
    }

    // convert date to absolute time in seconds
    var dateSeconds = Math.floor(date.getTime() / 1000);

    // check if the status of the medication is defined
    if (!utils.isUndefinedOrNull(med.json.statusOfMedication, 
	    med.json.statusOfMedication.value)) {
	if (med.json.statusOfMedication.value === 'active') {
	    // if the medication is marked as active, we just return true.
	    return true;
	} else if (med.json.statusOfMedication.value === 'completed') {
	    // check if medication was active on date
	    var startMed = med.json.start_time;
	    var stopMed = med.json.end_time;
	    var lengthExtended = (stop - start) * 1.2; // get the amount of
	    // padding required

	    // Check if date is within standard range
	    if ((utils.isUndefinedOrNull(startMed) || startMed < date)
		    && (utils.isUndefinedOrNull(endMed) || date < endMed)) {
		return true;
	    } else if (
	    // Check if date is within extended range
	    !utils.isUndefinedOrNull(startMed) && (startMed < date)
		    && !utils.isUndefinedOrNull(lengthExtended)
		    && (date < startMed + lengthExtended)) {
		return true;
	    } else {
		return false;
	    }
	} else {
	    // If statusOfMedication is not "active" or "completed", return
	    // false.
	    return false;
	}
    } else {
	// If statusOfMedication is not defined, return false.
	return false;
    }

};

