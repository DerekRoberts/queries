
/**
 * profile.gender Test
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
	    && (profile.gender.getGender(patient, errorContainer) == 'male');
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}
