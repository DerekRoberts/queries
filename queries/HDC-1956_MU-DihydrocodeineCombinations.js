/**
 * Query Title: HDC-1956 Dihydrocodeine, combinations Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description: This measure shows the percentage of active patients with an active medication for Dihydrocodeine, combinations.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Dihydrocodeine, combinations medication from dictionary
		 */
		dihydrocodeineCombinations : dictionary.meds.dihydrocodeineCombinations,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Dihydrocodeine, combinations.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.dihydrocodeineCombinations,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
