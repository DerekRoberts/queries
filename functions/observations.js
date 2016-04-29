/*
 * Basic observation functions.  Dictionary-like functions are in dictionary.js.
 *
 */

var observations = observations || {};

/**
 * Returns whether the patient passed has the observation defined by
 * observationInfo in the date range passed
 * 
 * @param patient
 *                hQuery patient object
 * @param observationInfo
 *                Observation Information object from dictionary that defines
 *                the observation for which to search
 * @param minDate
 *                Start of the effective date range for which data should be
 *                examined
 * @param maxDate
 *                End of the effective date range for which data should be
 *                examined
 * @param valueBottom
 *                The bottom end of the value range
 * @param valueTop
 *                The top end of the value range
 * @param valueComplement
 *                If false, observations in the range [valueBottom, valueTop]
 *                will be considered a match. If true, observations OUTSIDE the
 *                range [valueBottom, valueTop] will be considered a match.
 * @param valueUnits
 *                The units that the value must be specified in for a
 *                measurement to be a match
 * @param valueOnlyMostRecent
 *                If true, only the most recent observation matching
 *                observationInfo within the date range will be examined for a
 *                matching value
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
observations.hasObservation = function(patient, observationInfo, minDate,
	maxDate, valueBottom, valueTop, valueComplement, valueUnits,
	valueOnlyMostRecent, errorContainer) {

    // Check input
    if (utils.isUndefinedOrNull(patient, patient.json, observationInfo,
	    valueBottom, valueTop, valueComplement, valueOnlyMostRecent)) {
	return utils
		.invalid(
			"Invalid or incomplete data passed to observations.hasObservation:"
				+ (utils.isUndefinedOrNull(patient) ? " patient = \""
					+ patient + "\""
					: "")
				+ (!utils.isUndefinedOrNull(patient)
					&& utils
						.isUndefinedOrNull(patient.json) ? " patient.json = \""
					+ patient.json + "\""
					: "")
				+ (utils.isUndefinedOrNull(observationInfo) ? " observationInfo = \""
					+ observationInfo + "\""
					: "")
				+ (utils.isUndefinedOrNull(valueBottom) ? " valueBottom = \""
					+ valueBottom + "\""
					: "")
				+ (utils.isUndefinedOrNull(valueTop) ? " valueTop = \""
					+ valueTop + "\""
					: "")
				+ (utils.isUndefinedOrNull(valueComplement) ? " valueComplement = \""
					+ valueComplement + "\""
					: "")
				+ (utils.isUndefinedOrNull(valueOnlyMostRecent) ? " valueOnlyMostRecent = \""
					+ valueOnlyMostRecent + "\""
					: ""), errorContainer);
    }
    var maxMillisFromEpoch = 8640000000000000;

    if (utils.isUndefinedOrNull(minDate)) {
	// default to a long time ago
	minDate = new Date(-maxMillisFromEpoch);
    }

    if (utils.isUndefinedOrNull(maxDate)) {
	// default to a long time in the future
	maxDate = new Date(maxMillisFromEpoch);
    }

    // Get patient observation list
    var measurements = patient.vitalSigns();

    if (utils.isUndefinedOrNull(measurements) || (measurements.length === 0)) {
	return utils.invalid("Patient has no measurements", errorContainer);
    }

    // Filter measurements list to those that match one of the codes defined for
    // the measurement and fall within the date range. Implemented as a filter
    // so that all measurements will be checked and any data issues found
    var matchingCodeAndDateMeasurements = measurements.filter(function(
	    measurement) {
	if (observations.isCodeMatch(measurement, observationInfo,
		errorContainer)
		&& observations.isDateInRange(measurement, minDate, maxDate,
			errorContainer)) {
	    // Measurement is a code match and in the appropriate date range
	    return true;
	} else {
	    // Measurement either is not a code match or is not in the
	    // appropriate date range
	    // and is therefore not a match
	    return false;
	}
    });

    // sort by date
    matchingCodeAndDateMeasurements.sort(function(a, b) {
	if (a.start_time < b.start_time) {
	    return -1;
	} else if (a.start_time > b.start_time) {
	    return 1;
	} else if (a.start_time === b.start_time) {
	    return 0;
	} else {
	    return 0;
	}
    });

    // Only examine the most recent value if requested
    if (valueOnlyMostRecent) {
	matchingCodeAndDateMeasurements = matchingCodeAndDateMeasurements
		.slice(-1);
    }

    // Filter measurements list again to those that have a dose in the correct
    // range and the correct units.
    // Implemented as a filter so that all measurements will be checked and any
    // data issues found
    var fullyMatchingMeasurements = matchingCodeAndDateMeasurements
	    .filter(function(measurement) {
		if (observations.isValueInRange(measurement, valueBottom,
			valueTop, valueComplement, valueUnits, errorContainer)) {
		    // Measurement has a value in the required range, and the
		    // correct units.
		    return true;
		} else {
		    // Measurement either does not have a value in the required
		    // range, or the correct units
		    // and is therefore not a match
		    return false;
		}
	    });

    if (fullyMatchingMeasurements.length > 0) {
	// Found at least 1 measurement that matches on code, date, dose value
	// and units
	return true;
    } else {
	// No measurement that matches on code, data, dose value, and units was
	// found
	return false;
    }
};

/**
 * Returns whether the measurement entry passed is a match for any of the codes
 * defined in observationInfo
 * 
 * @param measurement
 *                single measurement entry from hQuery patient object
 * @param observationInfo
 *                Observation Information object from dictionary that defines
 *                the observation for which to search
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
observations.isCodeMatch = function(measurement, observationInfo,
	errorContainer) {
    // Check if it matches one of the codes defined in observationInfo

    // TODO: do we want to manually do a match for each codeset or sync
    // the name in our structure to the name in the hQuery patient
    // object?
    if (!utils.isUndefinedOrNull(observationInfo.LOINC, measurement.json,
	    measurement.json.codes, measurement.json.codes.LOINC)
	    && (measurement.json.codes.LOINC.length > 0)) {
	// We have LOINC codes defined for the measurement passed in
	// and at least one LOINC code for the measurement being examined
	// Compare LOINC codes

	if (utils.matchCodeSet(measurement.json.codes.LOINC,
		observationInfo.LOINC, errorContainer)) {
	    // we have a match
	    return true;
	}
    }

    // TODO add other codeset checks

    // We did not find a match in any of the codesets defined for the
    // Measurement
    return false;

}

/**
 * Returns whether the measurement entry passed is within the date range
 * specified
 * 
 * @param measurement
 *                single observation entry from hQuery patient object
 * @param minDate
 *                Start of date range to examine
 * @param maxDate
 *                End of date range to examine
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
observations.isDateInRange = function(measurement, minDate, maxDate,
	errorContainer) {
    // check for valid input, if invalid then we can't operate on the
    // measurement, return false.
    if (utils.isUndefinedOrNull(measurement, measurement.json,
	    measurement.json.start_time, minDate, maxDate)) {
	utils
		.info(
			"Invalid or incomplete data passed to observations.isDateInRange:"
				+ (utils.isUndefinedOrNull(measurement) ? " measurement = \""
					+ measurement + "\""
					: "")
				+ (!utils.isUndefinedOrNull(measurement)
					&& utils
						.isUndefinedOrNull(measurement.json) ? " measurement.json = \""
					+ measurement.json + "\""
					: "")
				+ (!utils.isUndefinedOrNull(measurement)
					&& !utils
						.isUndefinedOrNull(measurement.json)
					&& utils
						.isUndefinedOrNull(measurement.json.start_time) ? " measurement.json.start_time = \""
					+ measurement.json.start_time + "\""
					: "")

				+ (utils.isUndefinedOrNull(minDate) ? " minDate = \""
					+ minDate + "\""
					: "")
				+ (utils.isUndefinedOrNull(maxDate) ? " maxDate = \""
					+ maxDate + "\""
					: ""), errorContainer);
	return false;
    }

    // return whether measurement date is within range
    return measurement.json.start_time * 1000 > minDate
	    && measurement.json.start_time * 1000 < maxDate;
};

/**
 * Examines the measurement entry passed and returns whether it contains a value
 * in the range specified
 * 
 * @param measurement
 *                single measurement entry from hQuery patient object
 * @param valueBottom
 *                The bottom end of the value range
 * @param valueTop
 *                The top end of the value range
 * @param valueComplement
 *                If false, observations in the range [valueBottom, valueTop]
 *                will be considered a match. If true, observations OUTSIDE the
 *                range [valueBottom, valueTop] will be considered a match.
 * @param valueUnits
 *                The units that the value must be specified in for a
 *                measurement to be a match
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
observations.isValueInRange = function(measurement, valueBottom, valueTop,
	valueComplement, valueUnits, errorContainer) {
    // check if there is a value defined
    if (!utils.isUndefinedOrNull(measurement, measurement.json,
	    measurement.json.values)
	    && (measurement.json.values.length > 0)) {
	// At least one value is defined for measurement

	// check values
	var value;
	for (var valueCtr = 0; valueCtr < measurement.json.values.length; valueCtr++) {
	    value = measurement.json.values[valueCtr]
	    // check for correct units
	    if (value.units === valueUnits) {
		// check for correct value
		if (valueComplement) {
		    if (value.scalar < valueBottom || value.scalar > valueTop) {
			return true;
		    } 
		} else {
		    if (value.scalar >= valueBottom && value.scalar <= valueTop) {
			return true;
		    } 
		}

	    } 

	}

    } else {
	// No values were defined
	return false;
    }
}