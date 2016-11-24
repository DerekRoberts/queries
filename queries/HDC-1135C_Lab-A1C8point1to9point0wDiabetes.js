/**
 * Query Title: PDC-1135C_LastLab-A1C>8point1<9point0wDiabetes
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	diabetes : dictionary.conditions.diabetes,
	hemoglobinA1C : dictionary.labs.hemoglobinA1C,
	minValue : 8.1,
	maxValue : 9.0,
	
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
	 * Additional criteria: - HGBA1C recorded ---> last value at any time had value >= 8.1% and <= 9.0%
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var maxDate = date;

	    var hemoglobinA1C = labs.hasLabInDateRangeWithValue(patient, null,
		    maxDate, this.hemoglobinA1C, this.minValue, this.maxValue, false, "%", true,  errorContainer);

	    return (denominator && hemoglobinA1C);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
