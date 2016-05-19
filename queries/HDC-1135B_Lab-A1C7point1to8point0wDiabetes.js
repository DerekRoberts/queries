/**
 * Query Title: HDC-1135B_LastLab-A1C>7point1<8point0wDiabetes
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	diabetes : dictionary.conditions.diabetes,
	hemoglobinA1C : dictionary.labs.hemoglobinA1C,
	minValue : 7.1,
	maxValue : 8.0,
	
	/**
	 * Denominator
	 *
	 * Base criteria: - diagnosed with diabetes
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && conditions.hasActiveCondition(patient, date,
			    this.diabetes, errorContainer);

	},

	/**
	 * Numerator
	 *
	 * Additional criteria: - HGBA1C recorded ---> in last 6 months with value >= 7.1% and <= 8.0%
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.monthsBefore(date, 6);
	    var maxDate = date;

	    var hemoglobinA1C = labs.hasLabInDateRangeWithValue(patient, minDate,
		    maxDate, this.hemoglobinA1C, this.minValue, this.maxValue, false, "%", false,  errorContainer);

	    return (denominator && hemoglobinA1C);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
