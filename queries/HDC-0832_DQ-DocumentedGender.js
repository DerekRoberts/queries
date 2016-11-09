/**
 * Query Title: HDC-0832 DQ-DocumentedGender
 * Query Type:  Ratio
 * Query Description: % of patients with no documented gender
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
	 * Additional criteria: - gender is not documented
	 */
	numerator : function(patient, date, denominator, errorContainer) {

	    var gender = profile.gender.getGender(patient, errorContainer);
	    
	    var genderUndocumented = (gender == 'undefined');

	    return (denominator && genderUndocumented);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
