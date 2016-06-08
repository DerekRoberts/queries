/**
 * Query Title: HDC-1136  Lab LDL <= 2.6 with Diabetes
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	diabetes : dictionary.conditions.diabetes,
	ldl : dictionary.labs.cholesterolLDL,
	maxValue : 2.6,

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
	 * Additional criteria: - LDL <= 2.6 mmol/L --> in last year
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 1);
	    var maxDate = date;

	    var ldl = labs.hasLabInDateRangeWithValue(patient, minDate,
		    maxDate, this.ldl, null, this.maxValue, false, "mmol/L", false,
		    errorContainer);

	    return (denominator && ldl);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
