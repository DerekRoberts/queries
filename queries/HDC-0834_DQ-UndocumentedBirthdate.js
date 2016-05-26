/**
 * Query Title: HDC-0834 DQ-UndocumentedBirthdate
 * Query Type:  Ratio
 * Query Description: Count active patients with no date of birth
 * 
 * NOT a duplicate of HDC-0004 Undocumented Birthdate as this query include non-active patients.
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
	 * Additional criteria: - birthdate is undocumented
	 */
	numerator : function(patient, date, denominator, errorContainer) {

	    var birthdate = profile.ages.getBirthdate(patient, errorContainer);

	    var birthdateUndocumented = (birthdate == null);

	    return (denominator && birthdateUndocumented);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
