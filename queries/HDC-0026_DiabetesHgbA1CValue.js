/**
 * Query Title: HDC-0026
 * Query Type:  Ratio
 * Description: DM: w A1C <= 7% 1y
 */
function map(patient) {

    // Query logic
    var query = {

	diabetes : dictionary.conditions.diabetes,
	hemoglobinA1C : dictionary.labs.hemoglobinA1C,

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
	 * Additional criteria: - HGBA1C recorded ---> in last year with value <= 7%
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 1);
	    var maxDate = date;

	    var hemoglobinA1C = labs.hasLabInDateRangeWithValue(patient, minDate,
		    maxDate, this.hemoglobinA1C, null, 7, false, "%", false,  errorContainer);

	    return (denominator && hemoglobinA1C);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
