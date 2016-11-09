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
	 * Base criteria: just active patient
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);

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
