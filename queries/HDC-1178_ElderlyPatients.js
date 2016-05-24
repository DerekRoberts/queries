/**
 * Query Title: HDC-1178 
 * Query Type: Ratio 
 * Description: Number of active patients who are 65 or older.
 */
function map(patient) {

    // Query logic
    var query = {

	// Age to be considered elderly
        elderly : 65,

	/**
	 * Denominator
	 * 
	 * Base criteria: Just active patient check
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);

	},

	/**
	 * Numerator
	 * 
	 * Additional criteria: 65 or older
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var elderly = profile.ages.isMin(patient, date, this.elderly)
	    
	    return (denominator && elderly);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
