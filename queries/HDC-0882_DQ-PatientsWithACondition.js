/**
 * Query Title: HDC-0882 DQ-PatientsWithACondition
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 * 
	 * Base criteria: just active patient
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);

	},

	/**
	 * Numerator
	 * 
	 * Additional criteria: at least one coded condition entry
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var noConditions = conditions.noConditions(patient, date, true, errorContainer);

	    return (denominator && !noConditions);
	},

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
