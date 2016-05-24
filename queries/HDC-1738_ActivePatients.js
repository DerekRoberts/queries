/**
 * Query Title: HDC-1738 Active Patients 
 * Query Type:  Ratio
 * Description: The ratio of active to inactive patients.
 */
function map(patient) {

    // Query logic
    var query = {

	/**
	 * Denominator
	 * 
	 * Base criteria: Was an active patient at some point before the query date.
	 * This is necessary for retroactive queries as always returning true will 
	 * include patients in the denominator before they joined the practice or
	 * possibly before they were born. 
	 */
	denominator : function(patient, date, errorContainer) {
	    var activeEver = profile.activeEver(patient, date);
	    
	    return activeEver;
	},

	/**
	 * Numerator
	 * 
	 * Additional criteria: Active patient
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var active = profile.active(patient, date);
	    
	    return (denominator && active);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
