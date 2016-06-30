/**
 * Emit functions for queries and error handling
 */

// Strict mode
"use strict";


var emitter = emitter || {};

/**
 * Prepares the value passed to be emitted as a entry value
 * 
 * @param {(number|boolean)} value The value to be prepared
   @returns {number}
 */
emitter.prepareValueForEmit = function(value) {
    if(value === true) {
	return 1.0;
    } else if(value === false) {
	return 0.0;
    } else {
	return value;
    }
}


/**
 * Run retroactive ratio query and emit results. Numerator and denominator
 * functions should return true or false for each patient.
 *
 * @param patient -
 *                hQuery patient object
 * @param query -
 *                query object containing numerator and denominator objects, and
 *                variables required to use them
 *
 * @return none
 */
emitter.ratio = function(patient, query) {
    // Emit variables
    var denominator = 'Value not provided', numerator = 'Value not provided', jsonEmit = {
	doctor : patient.json.primary_care_provider_id,
	type   : 'Ratio',
	result : 'Value not provided'
    };

    // Error object
    var errorContainer = {
	// Whether patient was excluded from the query due to invalid data
	invalid : false,
	// Whether an error was encountered while processing patient
	error : false,
	// Whether a warning was encountered while processing patient
	warning : false,
	// Whether an information message was created while processing patient
	info : false,
	// Any error messages created while processing patient
	errorMessages : [],
	// Any warning messages created while processing patient
	warningMessages : [],
	// Any information messages created while processing patient
	infoMessages : []
    }

    // Counter (date) variables
    var i = defaults.dates.start(), end = defaults.dates.end();
    for (; i < end; i.setMonth(i.getMonth() + 1)) {
	denominator = query.denominator(patient, i, errorContainer);
	numerator = query.numerator(patient, i, denominator, errorContainer);

	if (errorContainer.invalid) {
	    // Patient was marked as invalid at some point during processing.
	    // Ensure patient is excluded from indicator correctly
	    denominator = false;
	    numerator = false;
	}

	jsonEmit.date = i.getTime().toString();
	jsonEmit.result = "denominator";
	emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(denominator));

	jsonEmit.result = "numerator";
	emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(numerator));

	jsonEmit.result = "invalid";
	emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(errorContainer.invalid));

	utils.emitErrorContainer(errorContainer, jsonEmit.doctor);
    }
};

/**
 * Run retroactive ratio count query and emit results. Numerator and denominator
 * should return counts for each patient.
 *
 * @param patient -
 *                hQuery patient object
 * @param query -
 *                query object containing numerator and denominator objects, and
 *                variables required to use them
 *
 * @return none
 */
emitter.ratioCount = function(patient, query) {
    // Emit variables
    var denominator = 'Value not provided', numerator = 'Value not provided', jsonEmit = {
	doctor : patient.json.primary_care_provider_id,
	type   : 'Ratio',
	result : 'Value not provided'
    };

    // Error object
    var errorContainer = {
	// Whether patient was excluded from the query due to invalid data
	invalid : false,
	// Whether an error was encountered while processing patient
	error : false,
	// Whether a warning was encountered while processing patient
	warning : false,
	// Whether an information message was created while processing patient
	info : false,
	// Any error messages created while processing patient
	errorMessages : [],
	// Any warning messages created while processing patient
	warningMessages : [],
	// Any information messages created while processing patient
	infoMessages : []
    }

    // Counter (date) variables
    var i = defaults.dates.start(), end = defaults.dates.end();
    for (; i < end; i.setMonth(i.getMonth() + 1)) {
	denominator = query.denominator(patient, i, errorContainer);
	numerator = query.numerator(patient, i, denominator, errorContainer);

	if (errorContainer.invalid) {
	    // Patient was marked as invalid at some point during processing.
	    // Ensure patient is excluded from indicator correctly
	    denominator = 0;
	    numerator = 0;
	}

	jsonEmit.date = i.getTime().toString();
	jsonEmit.result = "denominator";
	emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(denominator));

	jsonEmit.result = "numerator";
	emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(numerator));

	jsonEmit.result = "invalid";
	emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(errorContainer.invalid));

	utils.emitErrorContainer(errorContainer, jsonEmit.doctor);
    }
};

/**
 * Run retroactive ratio code count query and emit results. Separate results
 * will be emitted for every code encountered and will be differentiated by an
 * addition "code" parameter.
 *
 *
 * @param patient -
 *                hQuery patient object
 * @param query -
 *                query object containing codeMap, numerator, and denominator
 *                objects, and variables required to use them
 * @return none
 */
emitter.ratioCodeCount = function(patient, query) {
    // Emit variables
    var denominator = 'Value not provided', numerator = 'Value not provided', jsonEmit = {
	doctor : patient.json.primary_care_provider_id,
	type : 'CodeCount',
	code : code,
	result : 'Value not provided'
    };

    // Error object
    var errorContainer = {
	// Whether patient was excluded from the query due to invalid data
	invalid : false,
	// Whether an error was encountered while processing patient
	error : false,
	// Whether a warning was encountered while processing patient
	warning : false,
	// Whether an information message was created while processing patient
	info : false,
	// Any error messages created while processing patient
	errorMessages : [],
	// Any warning messages created while processing patient
	warningMessages : [],
	// Any information messages created while processing patient
	infoMessages : []
    }

    // Counter (date) variables
    var i = defaults.dates.start(), end = defaults.dates.end();
    for (; i < end; i.setMonth(i.getMonth() + 1)) {
	// Get codemap for patient and date with counts for all codes
	var fullCodeMap = query.codeMap(patient, i, errorContainer);

	if (!(fullCodeMap == undefined)) {
	    // We have a codeMap to traverse

	    // Loop through each of the codesets included in the outermost map
	    var codeSets = Object.keys(fullCodeMap);
	    for (var codeSetCtr = 0; codeSetCtr < codeSets.length; codeSetCtr++) {
		// Get codeset for this iteration of this loop
		var codeSet = codeSets[codeSetCtr];

		// Loop through each of the codes in the current codeset
		var codes = Object.keys(fullCodeMap[codeSet]);
		for (var codeCtr = 0; codeCtr < codes.length; codeCtr++) {
		    // Get code for this iteration of this inner loop
		    var code = codes[codeCtr];

		    // Obtain the count of occurrences of the current code
		    var codeCount = fullCodeMap[codeSet][code];

		    // Get numerator and denominator values
		    denominator = query.denominator(patient, i, errorContainer);
		    numerator = query.numerator(patient, i, denominator,
			    codeSet, code, codeCount, errorContainer);

		    if (errorContainer.invalid) {
			// Patient was marked as invalid at some point during
			// processing.
			// Ensure patient is excluded from indicator correctly
			denominator = 0;
			numerator = 0;
		    }

		    jsonEmit.date = i.getTime().toString();
		    // Set additional code parameter to differentiate emits
		    jsonEmit.code = codeSet + "_" + code;

		    jsonEmit.result = "denominator";
		    emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(denominator));

		    jsonEmit.result = "numerator";
		    emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(numerator));

		    jsonEmit.result = "invalid";
		    emit(JSON.stringify(jsonEmit), emitter.prepareValueForEmit(errorContainer.invalid));

		}
	    }
	}

	// Emit errorContainer only once for query
	utils.emitErrorContainer(errorContainer, jsonEmit.doctor, null, true,
		code);
    }
};
