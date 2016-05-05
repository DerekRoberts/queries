

/**
 * profile.active Test
 * 
 * @param patient
 */
function map(patient) {

    // Query logic
    var query = {


	denominator : function(patient, date, errorContainer) {
	    return true
	},
	numerator : function(patient, date, denominator, errorContainer) {
	    return denominator
	    && profile.active(patient, date, errorContainer);
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}
