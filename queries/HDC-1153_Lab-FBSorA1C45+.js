/**
 * Query Title: HDC-1153_Lab-FBSorA1C45+
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	minAge : 45,
	hemoglobinA1C : dictionary.labs.hemoglobinA1C,
	glucoseFasting : dictionary.labs.glucoseFasting,

	/**
	 * Denominator
	 * 
	 * Base criteria: - 45 years old or older
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge);

	},

	/**
	 * Numerator
	 * 
	 * Additional criteria: - HGBA1C or fasting blood sugar recorded ---> in
	 * last 3 years
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 3);
	    var maxDate = date;

	    var hemoglobinA1C = labs.hasLabInDateRange(patient, minDate,
		    maxDate, this.hemoglobinA1C, errorContainer);

	    var glucoseFasting = labs.hasLabInDateRange(patient, minDate,
		    maxDate, this.glucoseFasting, errorContainer);

	    return (denominator && (hemoglobinA1C || glucoseFasting));
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
