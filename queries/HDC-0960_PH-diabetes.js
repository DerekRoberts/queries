/**
 * Query Title: HDC-0960 
 * Query Type: Ratio 
 * Initiative: Population Health
 * Description: Percentage of patients with diabetes
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of diabetes condition from dictionary
		 */
	    diabetes : dictionary.conditions.diabetes,

	    /**
		 * Denominator
		 * 
		 * Base criteria: 
		 * - active patient
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    /**
		 * Numerator
		 * 
		 * Additional criteria: 
		 * - Has diabetes condition
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && conditions.hasActiveCondition(patient, date,
		                    this.diabetes, errorContainer);
	    }
	};
	// Emit results based on query above
	emitter.ratio(patient, query);
}
