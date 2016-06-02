/**
 * Query Title: HDC-0836_DQ-CodedMedications
 * Query Type:  Ratio
 * Description: % of medication entries that are coded
 */
function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 * 
	 * Total medication count
	 */
	denominator : function(patient, date, errorContainer) {
	    return medications.count(patient, null, date, false, errorContainer);
	},

	/**
	 * Numerator
	 * 
	 * Total coded medication count 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    return medications.count(patient, null, date, true, errorContainer);

	},

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
