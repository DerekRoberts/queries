/**
 * Emit functions for queries and error handling
 */

var emitter = emitter || {};

/**
 * Run retroactive ratio query and emit results
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
	category : 'ReportingCategories',
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
    var i = dictionary.defaults.dates.start(), end = dictionary.defaults.dates
	    .end();
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
	
	utils.emitErrorContainer(errorContainer);
    }
};

