/**
 * Query Title: HDC-0831 DQ Encounter Frquency 
 * Query Type:  Ratio
 * Description: % of patients with an encounter in the last 36 months
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
	 * Additional criteria: Encounter in last 3 years 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    
   	    // 3 years ~= 60*60*24*365*3 seconds
	    var window = 94608000;
	    
	    var encounter = profile.activeEncounter(patient, date, window);
	    
	    return (denominator && encounter);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
