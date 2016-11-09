/**
 * Query Title: HDC-0833 DQ-InvalidBirthdate
 * Query Type:  Ratio
 * Query Description: Count active patients with an invalid date of birth,
 * excluding anyone over 120 years old
 */
function map(patient) {

    // Query logic
    var query = {

	maxValidAge : 120,
	
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
	 * Additional criteria: - birthdate is undocumented, invalid, or age is > 120
	 */
	numerator : function(patient, date, denominator, errorContainer) {

	    var birthdate = profile.ages.getBirthdate(patient, errorContainer);

	    var birthdateUndocumented = (birthdate == null);
	    
	    var birthdateInvalid;
	    if(!birthdateUndocumented) {
		if(profile.ages.isMax(patient, date, this.maxValidAge, errorContainer)) {
		    // patient is less than 120 years old, birthday is valid
		    birthdateInvalid = false;
		} else {
		    // patient is greater than 120 years old, birthday is invalid
		    birthdateInvalid = true;
		    
		}
		
	    }

	    return (denominator && (birthdateUndocumented || birthdateInvalid));
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
