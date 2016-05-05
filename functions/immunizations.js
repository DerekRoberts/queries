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
) {
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
			immunizations.isActive(immunization, date, errorContainer)
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
* Returns whether the immunization entry passed is active on the date passed.
* Note: The underlying data structure cannot express that a immunization is no
* longer present. Currently a immunization is considered to always be active
*  after its start date
*
* @param immunization
*                single immunization entry from hQuery patient object
* @param date
*                Effective date for which data should be examined
* @param errorContainer
*                ErrorContainer to use for storing any errors or output
*
*/
immunizations.isActive = function(immunization, date, errorContainer) {
	// check for valid input, if invalid then we can't operate on the
	// immunization, return false.
	if (utils.isUndefinedOrNull(immunization, immunization.json)) {
		return false;
	}

	// Default to current date if no date is supplied
	if (utils.isUndefinedOrNull(date) || isNaN(date)) {
		date = new Date();
	}

	// convert date to absolute time in seconds
	var dateSeconds = Math.floor(date.getTime() / 1000);

	// check if immunization was active on date
	var startImmunization = immunization.json.start_time;

	// Check if date is after start
	if (!utils.isUndefinedOrNull(startImmunization) &&
	(startImmunization <= dateSeconds)) {
		// The start of the immunization is defined and occurs before the date to
		// be examined
		return true;
	} else
	return false;
};
