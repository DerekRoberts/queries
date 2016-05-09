/**
 * Query Title: HDC-0009 Query Type: Ratio Description: BMI-WC Check, 20+
 */

function map(patient) {

    // Query logic
    var query = {

	// Age restraint
	minAge : 20,
	waist : dictionary.observations.waistCircumference,
	bmi : dictionary.observations.bodyMassIndex,
	height : dictionary.observations.height,
	weight : dictionary.observations.weight,

	/**
	 * Denominator
	 * 
	 * Base criteria: - age 20+
	 */
	denominator : function(patient, date, errorContainer ) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge);
	},
	/**
	 * Numerator
	 * 
	 * Additional criteria: - has Waist circuference OR - has BMI OR - has
	 * height AND has weight ---> ALL documented in last 2 years
	 * 
	 */
	numerator : function(patient, date, denominator, errorContainer ) {
	    var minDate = new Date(date.getFullYear() - 2, date.getMonth(),
		    date.getDate());
	    return denominator
		    && (observations.hasObservationInDateRange(patient,
			    minDate, date, this.waist, errorContainer)
			    || observations.hasObservationInDateRange(patient,
				    minDate, date, this.bmi, errorContainer) || (observations
			    .hasObservationInDateRange(patient, minDate, date,
				    this.height, errorContainer) && observations
			    .hasObservationInDateRange(patient, minDate, date,
				    this.weight, errorContainer))

		    );
	}
    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}


