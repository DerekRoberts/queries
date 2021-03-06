// Strict mode
"use strict";


var immunizations = immunizations || {};

/**
* Returns whether a patient has an immunition matching the provided code
*
* @param patient
*                hQuery patient object
* @param date
*                Effective date for which data should be examined
* @param immunizationInfo
*                Immunication object from dictionary that defines the
*                immunization for which to search
* @param errorContainer
*                ErrorContainer to use for storing any errors or output
*/
immunizations.hasActiveImmunization = function(patient, date, immunizationInfo,
	errorContainer
)
{
    return immunizations.hasImmunizationInDateRange(patient, null, date, immunizationInfo, errorContainer);
}

/**
* Returns whether a patient has an immunition matching the provided code in the date range passed
*
* @param patient
*                hQuery patient object
 * @param minDate
 *                Start of the effective date range for which data should be
 *                examined
 * @param maxDate
 *                End of the effective date range for which data should be
 *                examined
* @param immunizationInfo
*                Immunication object from dictionary that defines the
*                immunization for which to search
* @param errorContainer
*                ErrorContainer to use for storing any errors or output
*/
immunizations.hasImmunizationInDateRange = function(patient, minDate, maxDate, immunizationInfo,
	errorContainer
)
{
	// Check input
	if (utils.isUndefinedOrNull(patient, patient.json, immunizationInfo)) {
		return utils
		.invalid(
			"Invalid data passed to immunizations.hasActiveImmunization",
			errorContainer
		);
	}

	var immunizationEntries = patient.immunizations();

	// Filter immunizations list to those that match one of the codes defined for
	// the immunization. Implemented as a filter so that all immunizations will be
	// checked and any data issues found
	var matchingActiveimmunizations = immunizationEntries.filter(function(immunization) {
		if (
			immunizations.isCodeMatch(immunization, immunizationInfo, errorContainer) &&
			immunizations.isDateInRange(immunization, minDate, maxDate, errorContainer)
		) {
			// Immunization is a code match and active for the date being examined
			return true;
		} else {
			// Immunization is not a code match or is not active for the date being
			// examined and is therefore not a match
			return false;
		}
	});

	if (matchingActiveimmunizations.length > 0) {
		// At least 1 active, matching immunization entry was
		// found
		return true;
	} else {
		// No active, matching immunization entry was found
		return false;
	}
};

/**
* Returns whether the immunization entry passed is a match for any of the codes
* defined in immunizationInfo
*
* @param immunization
*                single immunization entry from hQuery patient object
* @param immunizationInfo
*                Immunication object from dictionary that defines the
*                immunization for which to search
* @param errorContainer
*                ErrorContainer to use for storing any errors or output
*
*/
immunizations.isCodeMatch = function(immunization, immunizationInfo, errorContainer) {
	// Check if it matches one of the codes defined in immunizationInfo

	// TODO: do we want to manually do a match for each codeset or sync
	// the name in our structure to the name in the hQuery patient
	// object?
	if (!utils.isUndefinedOrNull(immunizationInfo.whoATC, immunization.json,
		immunization.json.codes, immunization.json.codes.whoATC) &&
		(immunization.json.codes.whoATC.length > 0)
	) {
		// We have whoATC codes defined for the immunization passed in
		// and at least one whoATC code for the immunization being examined
		// Compare whoATC codes

		if (utils.matchCodeSet(immunization.json.codes.whoATC, immunizationInfo.whoATC,
			errorContainer)
		) {
			// we have a match
			return true;
		}
	}

	if (!utils.isUndefinedOrNull(immunizationInfo.SNOMEDCT, immunization.json,
		immunization.json.codes, immunization.json.codes.SNOMEDCT) &&
		(immunization.json.codes.SNOMEDCT.length > 0)
	) {
		// We have SNOMEDCT codes defined for the immunization passed in
		// and at least one SNOMEDCT code for the immunization being examined
		// Compare SNOMEDCT codes

		if (utils.matchCodeSet(immunization.json.codes.SNOMEDCT,
			immunizationInfo.SNOMEDCT, errorContainer)
		) {
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
 * Returns whether the measurement entry passed is within the date range
 * specified
 *
 * @param immunization
 *                single immunization entry from hQuery patient object
 * @param minDate
 *                Start of date range to examine
 * @param maxDate
 *                End of date range to examine
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 *
 */
immunizations.isDateInRange = function(immunization, minDate, maxDate,
	errorContainer) {

    // check for valid input, if invalid then we can't operate on the
    // immunization, return false.
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid or incomplete data passed to immunizations.isDateInRange",
	    utils.error, errorContainer, [ immunization, "immunization",
		    ".json.start_time" ], [ maxDate, "maxDate" ])) {
	return false;
    }

    // return whether immunization date is within range
    return (((minDate == null) || immunization.json.start_time * 1000 > minDate)
	    && immunization.json.start_time * 1000 < maxDate);
};


/**
 * Returns a map containing a map for each codeset encountered that contains
 * entries of each code present and the number of times it was present.
 *
 * @param patient
 *                hQuery patient object
 * @param minDate
 *                Start of the effective date range for which data should be
 *                examined
 * @param maxDate
 *                End of the effective date range for which data should be
 *                examined
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * @returns a map containing a map for each codeset encountered that contains
 *          entries of each code present and the nubmer of times it was present.
 */
immunizations.buildCodeMap = function(patient, minDate, maxDate, errorContainer) {
    // Build map of codeset to be returned
    var codesetMap = {};

    // Check input
    if (utils.isUndefinedOrNullAndLog(
	    "Invalid data passed to immunizations.buildCodeMap", utils.error,
	    errorContainer, [ patient, "patient" ])) {
	return codesetMap;
    }

    // Get patient immunization list
    var immunizationEntries = patient.immunizations();

    if (utils.isUndefinedOrNull(immunizationEntries) || (immunizationEntries.length === 0)) {
	utils.warning("Patient has no immunizations", errorContainer);
	return codesetMap;
    }

    // Filter immunizations list to those that are active on the date being
    // examined.
    // Implemented as a filter so that all immunizations will be checked and any
    // data issues found
    var matchingActiveMeds = immunizationEntries.filter(function(immunization) {
	if (immunizations.isDateInRange(immunization, minDate, maxDate,
		errorContainer)) {
	    // Med is active for the date being examined,
	    return true;
	} else {
	    // Med either is not active for the date being
	    // examined and is therefore not a match
	    return false;
	}
    });

    matchingActiveMeds
	    .forEach(function(immunization) {
		if (!utils.isUndefinedOrNullPath([ immunization,
			".json.codes.whoATC" ])
		&& (immunization.json.codes.whoATC.length > 0)) {
	    // We have at least one ATC code for the immunization being examined

	    var ATCMap;
	    if (codesetMap["ATC"] === undefined) {
		ATCMap = {};
		codesetMap["ATC"] = ATCMap;
	    } else {
		ATCMap = codesetMap["ATC"];
	    }

	    // Add each code to map
	    var code;
	    for (var codeIndex = 0; codeIndex < immunization.json.codes.whoATC.length; codeIndex++) {
		code = immunization.json.codes.whoATC[codeIndex];

		// Get count of any previous entries for this code
		var previousCount;
		if (ATCMap[code] === undefined) {
		    previousCount = 0;
		} else {
		    previousCount = ATCMap[code];
		}

		// Add to Map count
		ATCMap[code] = previousCount + 1;

	    }

	    // save back to map
	    codesetMap["ATC"] = ATCMap;
	}
    });
    return codesetMap;
};

