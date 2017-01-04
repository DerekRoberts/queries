/**
 * Query Title: HDC-1957 Codeine, combinations excl. psycholeptics Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description: This measure shows the percentage of active patients with an active medication for Codeine, combinations excl. psycholeptics.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Codeine,combinations excl. psycholeptics medication from dictionary
		 */
		codeineCombinationsExcludingPsycholeptics : dictionary.meds.codeineCombinationsExcludingPsycholeptics,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Codeine, combinations excl. psycholeptics.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.codeineCombinationsExcludingPsycholeptics,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
