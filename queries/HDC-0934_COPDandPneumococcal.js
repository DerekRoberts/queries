/**
 * Query Title: HDC-0934 COPDandPneumococcal
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	pneumococcal : dictionary.immunizations.pneumococcal,
	copd : dictionary.conditions.COPD,

	/**
	 * Denominator
	 * 
	 * Base criteria: just active patient
	 */
	denominator : function(patient, date, err) {
	    return profile.active(patient, date);
	},
	/**
	 * Numerator
	 * 
	 * Additional criteria: - has COPD and pneumococcal vaccination
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var copd = conditions.hasActiveCondition(patient, date, this.copd,
		    errorContainer);
	    
	    var pneumococcal = immunizations.hasActiveImmunization(patient,
		    date, this.pneumococcal, errorContainer);
	    
	    return denominator && copd && pneumococcal;
	}
    };
    // Emit results based on query above
    emitter.ratio(patient, query);
}
