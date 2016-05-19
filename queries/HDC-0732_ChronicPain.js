/**
 * Query Title: HDC-0732_ChronicPain
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	painChronic : dictionary.conditions.painChronic,

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
	 * Additional criteria: - has chronic pain condition
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var painChronic = conditions.hasActiveCondition(patient, date,
		    this.painChronic, errorContainer);

	    return (denominator && painChronic);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
