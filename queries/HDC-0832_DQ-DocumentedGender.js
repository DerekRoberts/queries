/**
 * Query Title: HDC-0832 DQ-DocumentedGender
 * Query Type:  Ratio
 * Query Description: % of patients with a documented gender
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
	 * Additional criteria: - gender is documented
	 */
	numerator : function(patient, date, denominator, errorContainer) {

	    var gender = profile.gender.getGender(patient, errorContainer);
	    
	    var genderDocumented = (gender != 'undefined');

	    return (denominator && genderDocumented);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
