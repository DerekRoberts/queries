/**
 * Query Title: HDC-1958 Codeine,combinations with psycholeptics Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description:  This measure shows the percentage of active patients with an active medication for Codeine,combinations with psycholeptics.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Codeine, combinations with psycholeptics medication from dictionary
		 */
		codeineCombinationsWithPsycholeptics : dictionary.meds.codeineCombinationsWithPsycholeptics,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Codeine,combinations 
		 * with psycholeptics.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.codeineCombinationsWithPsycholeptics,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
