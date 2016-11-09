/**
 * Query Title: HDC-0004 Undocumented Birthdate
 * Query Type:  Ratio
 * Query Description: Count active patients with no date of birth
 * 
 * Duplicate of HDC-0834 DQ-UndocumentedBirthdate 
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
