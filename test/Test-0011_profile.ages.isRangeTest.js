/**
 * profile.ages.isRange Test
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
	    && profile.ages.isRange(patient, date, 10, 65, errorContainer);
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}
