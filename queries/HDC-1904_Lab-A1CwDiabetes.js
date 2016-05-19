/**
 * Query Title: HDC-1904_Lab-A1CwDiabetes
 * Query Type:  Ratio
 * 
 * Duplicate of HDC-0025
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
	 * Additional criteria: - HGBA1C recorded ---> in last six months
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.monthsBefore(date, 6);
	    var maxDate = date;

	    var hemoglobinA1C = labs.hasLabInDateRange(patient, minDate,
		    maxDate, this.hemoglobinA1C, errorContainer);

	    return (denominator && hemoglobinA1C);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
