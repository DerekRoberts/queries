/**
 * Query Title: HDC-0840 DQ-CodedConditions
 * Query Type:  Ratio
 * Description: % of condition entries that are coded
 */
function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 * 
	 * Total condition count
	 */
	denominator : function(patient, date, errorContainer) {
	    return conditions.count(patient, date, false, errorContainer);
	},

	/**
	 * Numerator
	 * 
	 * Total coded condition count 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    return conditions.count(patient, date, true, errorContainer);

	}

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
