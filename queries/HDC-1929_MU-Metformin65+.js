/**
 * Query Title: HDC-1929
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, have an active medication for Metformin
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Minimum age
		 */
	    minAge : 65,

	    /**
		 * Definition of metformin medication from dictionary
		 */
	    metformin : dictionary.meds.metformin,

	    /**
		 * Denominator
		 * 
		 * Base criteria: 
		 * - active patient
		 * - 65 years old
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date)
		            && profile.ages.isMin(patient, date, this.minAge);
	    },
	    /**
		 * Numerator
		 * 
		 * Additional criteria: 
		 * - Has metformin medication
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.metformin,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
