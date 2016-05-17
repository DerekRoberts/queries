/**
 * Query Title: HDC-0022
 * Query Type:  Ratio
 * Description: Fasting BS 3y, 46+
 */
function map(patient) {

    // Query logic
    var query = {

	// Age restraint
	minAge : 46,
	fastingBloodSugar : dictionary.labs.glucoseFasting,

	/**
	 * Denominator
	 *
	 * Base criteria: - 46+ years old
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge);
	},

	/**
	 * Numerator
	 *
	 * Additional criteria: - has had fasting glucose (blood sugar) recorded
	 * --> tested in the last three years
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 3);
	    var maxDate = date;

	    var fastingBloodSugar = labs.hasLabInDateRange(
		    patient, minDate, maxDate, this.fastingBloodSugar,
		    errorContainer);

	    return (denominator && fastingBloodSugar);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
