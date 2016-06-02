/*
 * Basic medication functions.  Dictionary-like functions are in dictionary.js.
 *
 */

var medications = medications || {};

/**
 * Returns whether the patient passed has the medication defined by medInfo on
 * the date passed
 *
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param medInfo
 *                Medication Information object from dictionary that defines the
 *                medication for which to search
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.hasActiveMed = function(patient, date, medInfo, errorContainer) {
    // Check for dose in default range
    var doseMin = defaults.doses.min, doseMax = defaults.doses.max;
    return medications.hasActiveMedRange(patient, date, medInfo, doseMin,
	    doseMax, errorContainer);
};

/**
 * Returns whether the patient passed has the medication defined by medInfo on
 * the date passed with a dose in the range passed
 *
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param medInfo
 *                Medication Information object from dictionary that defines the
 *                medication for which to search
 * @param doseMin
 *                Minimum valid dose
 * @param doseMax
 *                Maximum valid dose
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.hasActiveMedRange = function(patient, date, medInfo, doseMin,
	doseMax, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid data passed to medications hasActiveMedRange",
	    utils.invalid, errorContainer, [ patient, "patient" ], [ date,
		    "date" ], [ medInfo, "medInfo" ], [ doseMin, "doseMin" ], [
		    doseMax, "doseMax" ])) {
	return false;
    }

    // Get patient medication list
    var meds = patient.medications();

    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {
	return utils.invalid("Patient has no meds", errorContainer);
    }

    // Filter meds list to those that match one of the codes defined for the
    // med. Implemented as a filter so that all meds will be checked and any
    // data issues found
    var matchingActiveMeds = meds.filter(function(med) {
	if (medications.isCodeMatch(med, medInfo, errorContainer)
		&& medications.isActiveMed(med, date, errorContainer)
		&& medications.isDoseInRange(med, doseMin, doseMax,
			errorContainer)) {
	    // Med is a code match, active for the date being examined, and has
	    // a dose in the required range.
	    return true;
	} else {
	    // Med either is not a code match, is not active for the date being
	    // examined, or does not have a valid dose in the required range and
	    // is therefore not a match
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

/**
 * Returns whether the medication entry passed is a match for any of the codes
 * defined in medInfo
 *
 * @param med
 *                single medication entry from hQuery patient object
 * @param medInfo
 *                Medication Information object from dictionary that defines the
 *                medication for which to search
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 *
 */
medications.isCodeMatch = function(med, medInfo, errorContainer) {
    // Check if it matches one of the codes defined in medInfo

    // TODO: do we want to manually do a match for each codeset or sync
    // the name in our structure to the name in the hQuery patient
    // object?
    if (!utils.isUndefinedOrNullPath([ medInfo.ATC ], [ med,
	    ".json.codes.whoATC" ])
	    && (med.json.codes.whoATC.length > 0)) {
	// We have ATC codes defined for the med passed in
	// and at least one ATC code for the med being examined
	// Compare ATC codes

	if (utils.matchCodeSet(med.json.codes.whoATC, medInfo.ATC,
		errorContainer)) {
	    // we have a match
	    return true;
	}
    }

    // TODO add other codeset checks

    // We did not find a match in any of the codesets defined for the
    // Med
    return false;
};

/**
 * Returns whether the medication entry passed is coded
 *
 * @param med
 *                single medication entry from hQuery patient object
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 *
 */
medications.isCoded = function(med, errorContainer) {
    
    
    if (!utils.isUndefinedOrNullPath([ med,
	    ".json.codes" ])
	    && (Object.keys(med.json.codes).length > 0)) {
	// We have at least one codeset defined for the med passed in
	return true;
    }

    // We did not find any codesets defined for the Med
    return false;
};


/**
 * Examines the medication entry passed and returns whether it contains a valid
 * dose in the range dosemin =< med dose <= doseMax
 *
 * @param med
 *                single medication entry from hQuery patient object
 * @param doseMin
 *                Minimum valid dose
 * @param doseMax
 *                Maximum valid dose
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 *
 */
medications.isDoseInRange = function(med, doseMin, doseMax, errorContainer) {
    // check if there is a dose defined
    if (!utils.isUndefinedOrNullPath([ med, ".json.values" ])
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
};

/**
 * Returns whether the medication entry passed is active on the date passed
 *
 * @param med
 *                single medication entry from hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 *
 */
medications.isActiveMed = function(med, date, errorContainer) {

    // Default to current date if no date is supplied
    if (utils.isUndefinedOrNull(date) || isNaN(date)) {
	date = new Date();
    }

    return medications.isActiveMedInDateRange(med, date, date, errorContainer);
    
};

/**
 * Returns whether the medication entry passed was active in the date range
 * passed
 * 
 * @param med
 *                single medication entry from hQuery patient object
 * @param startDate
 *                Start date for range to examine, if null, check to beginning
 *                of available data
 * @param endDate
 *                End date for range to examine
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
medications.isActiveMedInDateRange = function(med, startDate, endDate,
	errorContainer) {
    // check for valid input, if invalid then we can't operate on the
    // medication, return false.
    if (utils.isUndefinedOrNullPath([ med, ".json" ])) {
	return false;
    }

    // convert dates to absolute time in seconds
    var startDateSeconds;
    if (utils.isUndefinedOrNull(startDate)) {
	startDateSeconds = null;
    } else {
	startDateSeconds = Math.floor(startDate.getTime() / 1000);
    }
    var endDateSeconds = Math.floor(endDate.getTime() / 1000);

    // check if the status of the medication is defined
    if (!utils.isUndefinedOrNullPath([ med, ".json.statusOfMedication.value" ])) {
	if (med.json.statusOfMedication.value === 'active') {
	    // if the medication is marked as active, we just return true.
	    return true;
	} else if (med.json.statusOfMedication.value === 'completed') {
	    // check if medication was active on date
	    var startMed = med.json.start_time;
	    var stopMed = med.json.end_time;
	    var lengthExtended = (stopMed - startMed) * 1.2; // get the
	    // amount of
	    // padding required

	    // Check if date is within standard range
	    if ((utils.isUndefinedOrNull(startMed) || startMed < endDateSeconds)
		    && (utils.isUndefinedOrNull(stopMed)
			    || utils.isUndefinedOrNull(startDateSeconds) || startDateSeconds < stopMed)) {
		return true;
	    } else if (
	    // Check if date is within extended range
	    !utils.isUndefinedOrNull(startMed)
		    && (startMed < endDateSeconds)
		    && !utils.isUndefinedOrNull(lengthExtended)
		    && (utils.isUndefinedOrNull(startDateSeconds) || (startDateSeconds < startMed
			    + lengthExtended))) {
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

/**
 * Returns whether the patient has at least minCount active medications.
 *
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param minCount
 *                The number of meds to check for
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.activeMedMin = function(patient, date, minCount, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid data passed to medications activeMedMin", utils.invalid,
	    errorContainer, [ patient, "patient" ], [ date, "date" ], [
		    minCount, "minCount" ])) {
	return false;
    }

    // Get patient medication list
    var meds = patient.medications();

    // Filter down to active meds
    var activeMeds = meds.filter(function(med) {
	if (medications.isActiveMed(med, date, errorContainer)) {
	    return true;
	} else {
	    return false;
	}
    });

    // Return whether there are enough meds to meet the count
    return activeMeds.length >= minCount;
};


/**
 * Returns whether a patient has a daily dose of a med in a specified range
 *
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param medInfo
 *                Medication information object to look for
 * @param dailyMin
 *                Minimum valid daily dose
 * @param dailyMax
 *                Maximum valid daily dose
 * @param expectedMeasurement
 *                Dose measurement (e.g. MG, µG, mmol/L, g/L)
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.hasActiveMedRangeDaily = function( patient, date, medInfo, dailyMin,
	dailyMax, expectedMeasurement, errorContainer
){
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid data passed to medications hasActiveMedRangeDaily",
	    utils.invalid, errorContainer, [ patient, "patient" ], [ date,
		    "date" ], [ medInfo, "medInfo" ], [ dailyMin, "dailyMin" ], [
		    dailyMax, "dailyMax" ])) {
	return false;
    }

    // Get patient medication list
    var meds = patient.medications();

    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {
	return utils.invalid("Patient has no meds", errorContainer);
    }

    // Filter meds list to those that match one of the codes defined for the
    // med. Implemented as a filter so that all meds will be checked and any
    // data issues found
    var matchingActiveMeds = meds.filter(function(med) {
	if (medications.isCodeMatch(med, medInfo, errorContainer)
		&& medications.isActiveMed(med, date, errorContainer)) {
	    // Med is a code match, active for the date being examined, and has
	    // a dose in the required range.
	    return true;
	} else {
	    // Med either is not a code match, is not active for the date being
	    // examined, or does not have a valid dose in the required range and
	    // is therefore not a match
	    return false;
	}
    });

    // Daily dose total and loop variables
    var dailyDose = 0;
    var atFreq, freqUnit, freqValue, dosePills, doseAmount, doseUnit;

    // Iterate through meds
    matchingActiveMeds.forEach( function( med ){
            // Check values
            if( !utils.isUndefinedOrNullPath(
                    [ med, ".json.values" ],
                    [ med, ".json.administrationTiming.frequency.numerator.value" ],
                    [ med, ".json.administrationTiming.frequency.denominator.unit"],
                    [ med, ".json.administrationTiming.frequency.denominator.value"],
                    [ med.json.values[0], ".scalar" ],
                    [ med.json.values[0], ".units" ]
            )){
                    // Store values
                    atFreq     = med.json.administrationTiming.frequency;
                    freqUnit   = atFreq.denominator.unit.toString();
                    freqValue  = atFreq.denominator.value;
                    dosePills  = atFreq.numerator.value;
                    doseAmount = med.json.values[0].scalar;
                    doseUnit   = med.json.values[0].units.toString().toLowerCase();

                    // Check values
                    if(
                            // Non-zero
                            ( dosePills * doseAmount * freqValue === 0)||

                            // Verify expected measurement unit
                            ( doseUnit !== expectedMeasurement.toLowerCase() )||

                            // Expecting d or h
                            !freqUnit.match( /^[dh]$/i )
                    ){
                            // Emit error
                            emit( "Medication object has unexpected values", -1 );
                            return;
                    }

                    // Tally up dose depending on daily (d) or hourly (h) rate
                    if( freqUnit === 'd' ){
                            dailyDose += dosePills * doseAmount * freqValue;
                    }
                    else if( freqUnit === 'h' ){
                            dailyDose += dosePills * doseAmount *( 24 / freqValue );
                    }
            }
    });

    // Return whether dailyDost is in the requested range
    if(( dailyMin <= dailyDose )&&( dailyDose <= dailyMax )){
	return true;
    } else {
	return false;
    }
};


/**
 * Returns whether a patient has a daily dose of a med above a min value
 *
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param medInfo
 *                Medication information object to look for
 * @param dailyMin
 *                Minimum valid daily dose
 * @param expectedMeasurement
 *                Dose measurement (e.g. MG, µG, mmol/L, g/L)
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.hasActiveMedMinDaily = function(
        patient, date, medInfo, dailyMin, expectedMeasurement, errorContainer
){
        var dailyMax = defaults.doses.max;
        return medications.hasActiveMedRangeDaily(
                patient, date, medInfo, dailyMin, dailyMax,
                expectedMeasurement, errorContainer
        );
};


/**
 * Returns whether a patient has a daily dose of a med below a max value
 *
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param medInfo
 *                Medication information object to look for
 * @param dailyMax
 *                Maximum valid daily dose
 * @param expectedMeasurement
 *                Dose measurement (e.g. MG, µG, mmol/L, g/L)
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.hasActiveMedMaxDaily = function(
        patient, date, medInfo, dailyMax, expectedMeasurement, errorContainer
){
        var dailyMin = defaults.doses.min;
        return medications.hasActiveMedRangeDaily(
                patient, date, medInfo, dailyMin, dailyMax,
                expectedMeasurement, errorContainer
        );
};


/**
 * Returns a count of entries for all medications for the patient passed.
 *
 * @param patient
 *                hQuery patient object
 * @param startDate
 *                Start date for range to examine, if null, check to beginning of available data
 * @param endDate
 *                End date for range to examine
 * @param coded If true, include only coded entries in count              
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.count = function(patient, startDate, endDate, coded, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid data passed to medications.count", utils.invalid,
	    errorContainer, [ patient, "patient" ], [ endDate, "endDate" ])) {
	return 0;
    }

    // Get patient medication list
    var meds = patient.medications();

    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {
	return utils.invalid("Patient has no meds", errorContainer);
    }

    // Filter meds list to those that match the parameter values. Implemented as
    // a filter so that all meds will be checked and any
    // data issues found
    var matchingMeds = meds.filter(function(med) {
	if (medications.isActiveMedInDateRange(med, startDate, endDate,
		errorContainer)
		&& (!coded || medications.isCoded(med, errorContainer))) {
	    // Med is active in the date range and coded if required
	    return true;
	} else {
	    // Med either is not active in the date range being
	    // examined, or is not coded and coding is required and
	    // is therefore not a match
	    return false;
	}
    });

    return matchingMeds.length;
};

/**
 * Whether the patient passed has no medication entries for any medications. 
 * Does not mark patient as invalid if the patient has no meds.
 *
 * @param patient
 *                hQuery patient object
 * @param startDate
 *                Start date for range to examine, if null, check to beginning of available data
 * @param endDate
 *                End date for range to examine
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
medications.noMeds = function(patient, startDate, endDate, errorContainer) {
    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid data passed to medications.count", utils.invalid,
	    errorContainer, [ patient, "patient" ], [ endDate, "endDate" ])) {
	return false;
    }

    // Get patient medication list
    var meds = patient.medications();

    if (utils.isUndefinedOrNull(meds) || (meds.length === 0)) {
	// Patient has no meds whatsoever
	return true;
    }

    // Filter meds list to those that match the parameter values. Implemented as
    // a filter so that all meds will be checked and any
    // data issues found
    var matchingMeds = meds.filter(function(med) {
	if (medications.isActiveMedInDateRange(med, startDate, endDate,
		errorContainer)) {
	    // Med is active in the date range
	    return true;
	} else {
	    // Med either is not active in the date range being
	    // examined
	    return false;
	}
    });

    return (matchingMeds.length == 0);
};


