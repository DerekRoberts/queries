/**
 * Query Title: HDC-0837 DQ-PrescriptionFrequency
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 * 
	 * Total encounter count
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.countEncounters(patient, null, date, errorContainer); 
	},

	/**
	 * Numerator
	 * 
	 * Total medication count 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    return medications.count(patient, null, date, false, errorContainer);

	}

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
