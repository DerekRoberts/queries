/**
 * Query Title: HDC-1931 Digoxin Medication Use-All Ages
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: This measure shows the percentage of active patients with 
 * an active medication for Digoxin.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Digoxin medication from dictionary
		 */
		digoxin : dictionary.meds.digoxin,

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
		 * - Has digoxin medication
		 */
	    numerator : function(patient, date, denominator, errorContainer) {
		    return denominator
		            && medications.hasActiveMed(patient, date, this.digoxin,
		                    errorContainer);
	    }
	};
	
	// Emit results based on query above
	emitter.ratio(patient, query);
}
