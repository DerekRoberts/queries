/**
 * Emit functions for queries and error handling
 */

var emitter = emitter || {};

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
	emit(JSON.stringify(jsonEmit), denominator);

	jsonEmit.result = "numerator";
	emit(JSON.stringify(jsonEmit), numerator);

	jsonEmit.result = "invalid";
	emit(JSON.stringify(jsonEmit), errorContainer.invalid);

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
	emit(JSON.stringify(jsonEmit), denominator);

	jsonEmit.result = "numerator";
	emit(JSON.stringify(jsonEmit), numerator);

	jsonEmit.result = "invalid";
	emit(JSON.stringify(jsonEmit), errorContainer.invalid);

	utils.emitErrorContainer(errorContainer, jsonEmit.doctor);
    }
};
