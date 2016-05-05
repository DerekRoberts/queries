
/**
 * profile.activeMedication Test
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
	    && profile.activeMedication(patient, date, 315360000);
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}

