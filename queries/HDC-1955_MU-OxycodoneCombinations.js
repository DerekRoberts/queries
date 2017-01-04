/**
 * Query Title: HDC-1955 Oxycodone, combinations Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description: This measure shows the percentage of active patients with an active medication for Oxycodone, combinations.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Oxycodone, combinations medication from dictionary
		 */
		oxycodoneCombinations : dictionary.meds.oxycodoneCombinations,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Oxycodone, combinations.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.oxycodoneCombinations,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
