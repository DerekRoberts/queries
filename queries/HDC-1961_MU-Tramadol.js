/**
 * Query Title: HDC-1961 Tramadol Use - All Ages
 * Query Type:  Ratio
 * Initiative:  Opioid Medication Use
 * Description:  This measure shows the percentage of active patients with an active medication for Tramadol.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Tramadol medication from dictionary
		 */
			tramadol : dictionary.meds.tramadol,


	    /**
		 * Denominator:
		 * Count of total number of active patients documented in the EMR.
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date);
	    },
	    
	    /**
		 * Numerator:
		 * Count of the number of active patients that have an active medication for Tramadol.
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.tramadol,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}