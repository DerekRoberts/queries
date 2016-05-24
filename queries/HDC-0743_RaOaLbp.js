/**
 * Query Title: HDC-0743_RaOaLbp
 * Query Type:  Ratio
 * Query Description: The percentage of patients with a diagnosis of Rheumatoid Arthritis (RA), 
 * Osteoarthritis (OA), or Lower Back Pain (LBP).
 */
function map(patient) {

    // Query logic
    var query = {

	rheumatoid : dictionary.conditions.rheumatoid,
	osteoarthritis : dictionary.conditions.osteoarthritis,
	painBackLower : dictionary.conditions.painBackLower,
	/**
	 * Denominator
	 * 
	 * Base criteria: just active patient
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);

	},

	/**
	 * Numerator
	 * 
	 * Additional criteria: - has Rheumatoid Arthritis (RA), 
	 * Osteoarthritis (OA), or Lower Back Pain (LBP) pain condition
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var rheumatoid = conditions.hasActiveCondition(patient, date,
		    this.rheumatoid, errorContainer);

	    var osteoarthritis = conditions.hasActiveCondition(patient, date,
		    this.osteoarthritis, errorContainer);

	    var painBackLower = conditions.hasActiveCondition(patient, date,
		    this.painBackLower, errorContainer);

	    return (denominator && (rheumatoid || osteoarthritis || painBackLower));
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
