/**
 * Query Title: HDC-1903_Lab-FBS46+
 * Query Type:  Ratio
 */
function map(patient) {

    // Query logic
    var query = {

	minAge : 46,
	glucoseFasting : dictionary.labs.glucoseFasting,

	/**
	 * Denominator
	 * 
	 * Base criteria: - 46 years old or older
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge);

	},

	/**
	 * Numerator
	 * 
	 * Additional criteria: - fasting blood sugar recorded ---> in
	 * last 3 years
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 3);
	    var maxDate = date;

	    var glucoseFasting = labs.hasLabInDateRange(patient, minDate,
		    maxDate, this.glucoseFasting, errorContainer);

	    return (denominator && glucoseFasting);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
