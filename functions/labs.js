/*
 * Basic lab functions.  Dictionary-like functions are in dictionary.js.
 *
 */

var labs = labs || {};

/**
 * Returns whether the patient passed has the lab defined by labInfo in the date
 * range passed
 * 
 * @param patient
 *                hQuery patient object
 * @param minDate
 *                Start of the effective date range for which data should be
 *                examined
 * @param maxDate
 *                End of the effective date range for which data should be
 *                examined
 * @param labInfo
 *                Lab Information object from dictionary that defines the lab
 *                for which to search
 * @param valueBottom
 *                The bottom end of the value range
 * @param valueTop
 *                The top end of the value range
 * @param valueComplement
 *                If false, labs in the range [valueBottom, valueTop] will be
 *                considered a match. If true, labs OUTSIDE the range
 *                [valueBottom, valueTop] will be considered a match.
 * @param valueUnits
 *                The units that the value must be specified in for a
 *                measurement to be a match
 * @param valueOnlyMostRecent
 *                If true, only the most recent lab matching labInfo within the
 *                date range will be examined for a matching value
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 */
labs.hasLab = function(patient, minDate, maxDate, labInfo, valueBottom,
	valueTop, valueComplement, valueUnits, valueOnlyMostRecent,
	errorContainer) {

    // Check input
    if (utils.isUndefinedOrNull(patient, patient.json, labInfo, valueBottom,
	    valueTop, valueComplement, valueOnlyMostRecent)) {
	return utils
		.invalid(
			"Invalid or incomplete data passed to labs.hasLab:"
				+ (utils.isUndefinedOrNull(patient) ? " patient = \""
					+ patient + "\""
					: "")
				+ (!utils.isUndefinedOrNull(patient)
					&& utils
						.isUndefinedOrNull(patient.json) ? " patient.json = \""
					+ patient.json + "\""
					: "")
				+ (utils.isUndefinedOrNull(labInfo) ? " labInfo = \""
					+ labInfo + "\""
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

    // Get patient lab list
    var measurements = patient.json.results;

    if (utils.isUndefinedOrNull(measurements) || (measurements.length === 0)) {
	return utils.invalid("Patient has no lab results", errorContainer);
    }

    // Filter measurements list to those that match one of the codes defined for
    // the measurement and fall within the date range. Implemented as a filter
    // so that all measurements will be checked and any data issues found
    var matchingCodeAndDateMeasurements = measurements.filter(function(
	    measurement) {
	if (labs.isCodeMatch(measurement, labInfo, errorContainer)
		&& labs.isDateInRange(measurement, minDate, maxDate,
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
		if (labs.isValueInRange(measurement, valueBottom, valueTop,
			valueComplement, valueUnits, errorContainer)) {
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
 * defined in labInfo
 * 
 * @param measurement
 *                single measurement entry from hQuery patient object
 * @param labInfo
 *                Lab Information object from dictionary that defines the lab
 *                for which to search
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
labs.isCodeMatch = function(measurement, labInfo, errorContainer) {
    // Check if it matches one of the codes defined in labInfo

    if (utils.isUndefinedOrNull(measurement)
	    || utils.isUndefinedOrNull(measurement.codes)) {
	// No data is available to check
	return false;
	
    }
   
    
    // TODO: do we want to manually do a match for each codeset or sync
    // the name in our structure to the name in the hQuery patient
    // object?
    
    
    if (!utils.isUndefinedOrNull(labInfo.SNOMEDCT, measurement.codes.SNOMEDCT)
	    && (measurement.codes.SNOMEDCT.length > 0)) {
	// We have SNOMEDCT codes defined for the measurement passed in
	// and at least one SNOMEDCT code for the measurement being examined
	// Compare SNOMEDCT codes

	if (utils.matchCodeSet(measurement.codes.SNOMEDCT,
		labInfo.SNOMEDCT, errorContainer)) {
	    // we have a match
	    return true;
	}
    }

    if (!utils.isUndefinedOrNull(labInfo.pCLOCD, measurement.codes.pCLOCD)
	    && (measurement.codes.pCLOCD.length > 0)) {
	// We have pCLOCD codes defined for the measurement passed in
	// and at least one pCLOCD code for the measurement being examined
	// Compare pCLOCD codes

	if (utils.matchCodeSet(measurement.codes.pCLOCD, labInfo.pCLOCD,
		errorContainer)) {
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
 *                single lab entry from hQuery patient object
 * @param minDate
 *                Start of date range to examine
 * @param maxDate
 *                End of date range to examine
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
labs.isDateInRange = function(measurement, minDate, maxDate, errorContainer) {
    // check for valid input, if invalid then we can't operate on the
    // measurement, return false.
    if (utils.isUndefinedOrNull(measurement) || 
	    utils.isUndefinedOrNull(measurement.start_time) || utils.isUndefinedOrNull(minDate, maxDate)) {
	utils
		.info(
			"Invalid or incomplete data passed to labs.isDateInRange:"
				+ (utils.isUndefinedOrNull(measurement) ? " measurement = \""
					+ measurement + "\""
					: "")
				+ (!utils.isUndefinedOrNull(measurement)
					&& utils
						.isUndefinedOrNull(measurement.start_time) ? " measurement.start_time = \""
					+ measurement.start_time + "\""
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
    return (measurement.start_time * 1000 > minDate
	    && measurement.start_time * 1000 < maxDate);
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
 *                If false, labs in the range [valueBottom, valueTop] will be
 *                considered a match. If true, labs OUTSIDE the range
 *                [valueBottom, valueTop] will be considered a match.
 * @param valueUnits
 *                The units that the value must be specified in for a
 *                measurement to be a match
 * @param errorContainer
 *                ErrorContainer to use for storing any errors or output
 * 
 */
labs.isValueInRange = function(measurement, valueBottom, valueTop,
	valueComplement, valueUnits, errorContainer) {
    // check if there is a value defined

    if (!utils.isUndefinedOrNull(measurement)
	    && !utils.isUndefinedOrNull(measurement.values)
	    && (measurement.values.length > 0)) {

	// check values
	var value;
	for (var valueCtr = 0; valueCtr < measurement.values.length; valueCtr++) {
	    value = measurement.values[valueCtr]
	    // check for correct units
	    // utils.info("Units " + value.units, errorContainer);
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
    return false;
}
