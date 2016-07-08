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
	 * Total encounter count in last year
	 */
	denominator : function(patient, date, errorContainer) {
	    var minDate = utils.yearsBefore(date, 1);
	    var maxDate = date;
	    
	    return profile.countEncounters(patient, minDate, maxDate, errorContainer); 
	},

	/**
	 * Numerator
	 * 
	 * Total medication count in last year
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 1);
	    var maxDate = date;

	    return medications.count(patient, minDate, maxDate, false, errorContainer);

	}

    };

    // Emit results based on query above
    emitter.ratioCount(patient, query);
}
