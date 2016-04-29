var conditions = conditions || {};

/**
 * Returns whether the patient passed has a condition that matches the codes in
 * the conditionInfo object passed on the date passed
 * 
 * @param patient
 *                hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param conditionInfo
 *                Condition Information object from dictionary that defines the
 *                condition for which to search
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
conditions.hasActiveCondition = function(patient, date, conditionInfo,
	errorContainer) {
    // Check input
    if (utils.isUndefinedOrNull(patient, patient.json, conditionInfo)) {
	return utils
		.invalid(
			"Invalid data passed to conditions conditions.hasConditionCode",
			errorContainer);
    }

    var conditionEntries = patient.conditions();

    // Filter conditions list to those that match one of the codes defined for
    // the condition. Implemented as a filter so that all conditions will be
    // checked and any data issues found
    var matchingActiveConditions = conditionEntries.filter(function(condition) {
	if (conditions.isCodeMatch(condition, conditionInfo, errorContainer)
		&& conditions.isActive(condition, date, errorContainer)) {
	    // Condition is a code match and active for the date being examined
	    return true;
	} else {
	    // Condition is not a code match or is not active for the date being
	    // examined and is therefore not a match
	    return false;
	}
    });

    if (matchingActiveConditions.length > 0) {
	// At least 1 active, matching condition entry was
	// found
	return true;
    } else {
	// No active, matching condition entry was found
	return false;
    }
}

/**
 * Returns whether the condition entry passed is a match for any of the codes
 * defined in conditionInfo
 * 
 * @param condition
 *                single condition entry from hQuery patient object
 * @param conditionInfo
 *                Condition Information object from dictionary that defines the
 *                condition for which to search
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
conditions.isCodeMatch = function(condition, conditionInfo, errorContainer) {
    // Check if it matches one of the codes defined in conditionInfo

    // TODO: do we want to manually do a match for each codeset or sync
    // the name in our structure to the name in the hQuery patient
    // object?
    if (!utils.isUndefinedOrNull(conditionInfo.ICD9, condition.json,
	    condition.json.codes, condition.json.codes.ICD9)
	    && (condition.json.codes.ICD9.length > 0)) {
	// We have ICD9 codes defined for the condition passed in
	// and at least one ICD9 code for the condition being examined
	// Compare ICD9 codes

	if (utils.matchCodeSet(condition.json.codes.ICD9, conditionInfo.ICD9,
		errorContainer)) {
	    // we have a match
	    return true;
	}
    }

    if (!utils.isUndefinedOrNull(conditionInfo.SNOMEDCT, condition.json,
	    condition.json.codes, condition.json.codes.SNOMEDCT)
	    && (condition.json.codes.SNOMEDCT.length > 0)) {
	// We have SNOMEDCT codes defined for the condition passed in
	// and at least one SNOMEDCT code for the condition being examined
	// Compare SNOMEDCT codes

	if (utils.matchCodeSet(condition.json.codes.SNOMEDCT,
		conditionInfo.SNOMEDCT, errorContainer)) {
	    // we have a match
	    return true;
	}
    }

    // TODO add other codeset checks

    // We did not find a match in any of the codesets defined for the
    // Med
    return false;

}

/**
 * Returns whether the condition entry passed is active on the date passed.
 * Note: The underlying data structure cannot express that a condition is no 
 * longer present. Currently a condition is considered to always be active
 *  after its start date 
 * 
 * @param condition
 *                single condition entry from hQuery patient object
 * @param date
 *                Effective date for which data should be examined
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
conditions.isActive = function(condition, date, errorContainer) {
    // check for valid input, if invalid then we can't operate on the
    // condition, return false.
    if (utils.isUndefinedOrNull(condition, condition.json)) {
	return false;
    }

    // Default to current date if no date is supplied
    if (utils.isUndefinedOrNull(date) || isNaN(date)) {
	date = new Date();
    }

    // convert date to absolute time in seconds
    var dateSeconds = Math.floor(date.getTime() / 1000);

    // check if condition was active on date
    var startCondition = condition.json.start_time;
    
    // Check if date is after start
    if (!utils.isUndefinedOrNull(startCondition)
	    && (startCondition <= dateSeconds)) {
	// The start of the condition is defined and occurs before the date to
	// be examined
	return true;
    } else
	return false;
};

