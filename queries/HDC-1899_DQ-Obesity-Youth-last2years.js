/**
 * Query Title: HDC-1899 
 * Query Type: Ratio 
 * Description: Of patients 12-19, how
 * many have a BMI or WC recorded.
 */
function map(patient) {

    // Query logic
    var query = {

	// Age restraint
	minAge : 12,
	maxAge : 19,
	waistCircumference : dictionary.observations.waistCircumference,
	bmi : dictionary.observations.bodyMassIndex,

	/**
	 * Denominator
	 * 
	 * Base criteria: - age 12 - 19
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge)
		    && profile.ages.isMax(patient, date, this.maxAge);
	},
	/**
	 * Numerator
	 * 
	 * Additional criteria: - has waist circumference recorded in last 2 years
	 * OR - has BMI recorded in last 2 years
	 * 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 2);
	    var maxDate = date;
	    
	    var waistCircumference = observations.hasObservationInDateRange(
		    patient, minDate, maxDate, this.waistCircumference,
		    errorContainer);

	    var bmi = observations.hasObservationInDateRange(
		    patient, minDate, maxDate, this.bmi,
		    errorContainer);
	    
	    return denominator
		    && (waistCircumference || bmi);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
