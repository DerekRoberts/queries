/**
 * Query Title: HDC-1950 Digoxin Medication Use-Age 65+
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: This measure shows the percentage of active patients, 65 years and older, 
 * with an active medication for Digoxin.
 */
function map(patient) {

	// Query logic
	var query = {

	    /**
		 * Definition of Digoxin medication from dictionary
		 */
		digoxin : dictionary.meds.digoxin,

		/**
		 * Age contraint
		 */
	    minAge : 65,

	    /**
		 * Denominator:
		 * Count of number of active patients, age 65 and older documented in the EMR
		 */
	    denominator : function(patient, date, errorContainer) {
		    return profile.active(patient, date) && profile.ages.isMin( patient, date, this.minAge );
	    },
	    /**
		 * Numerator:
		 * Count of the number of active patients age 65 and older with an active 
		 * medication for Digoxin
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
