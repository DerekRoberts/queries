/**
 * Query Title: HDC-1954 Morphine, combinations Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description: This measure shows the percentage of active patients with an active medication for 
 * Morphine, combinations.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Morphine, combinations medication from dictionary
		 */
		morphineCombinations : dictionary.meds.morphineCombinations,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Morphine, combinations.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.morphineCombinations,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
