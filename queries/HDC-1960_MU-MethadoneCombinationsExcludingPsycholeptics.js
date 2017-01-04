/**
 * Query Title: HDC-1960 Methadone,combinations excl. psycholeptics Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description: This measure shows the percentage of active patients with an active medication for Methadone, combinations excl. psycholeptics.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Methadone, combinations excl. psycholeptics medication from dictionary
		 */
		methadoneCombinationsExcludingPsycholeptics : dictionary.meds.methadoneCombinationsExcludingPsycholeptics,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Methadone, combinations excl. psycholeptics.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.methadoneCombinationsExcludingPsycholeptics,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
