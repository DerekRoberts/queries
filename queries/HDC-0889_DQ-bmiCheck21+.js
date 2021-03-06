/**
 * Query Title: HDC-0889
 * Query Type:  Ratio
 * Initiative:  Practice Reflection
 * Description: Of patients 21+,
 *              how many have BMI or WC recorded?
 *
 * Duplicate of HDC-0602 and HDC-0009
 */

function map(patient) {

    // Query logic
    var query = {

	// Age restraint
	minAge : 21,
	waistCircumference : dictionary.observations.waistCircumference,
	bmi : dictionary.observations.bodyMassIndex,
	height : dictionary.observations.height,
	weight : dictionary.observations.weight,

	/**
	 * Denominator
	 *
	 * Base criteria: - age 20+
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge);
	},
	/**
	 * Numerator
	 *
	 * Additional criteria: - has Waist circumference OR - has BMI OR - has
	 * height AND has weight ---> ALL documented in last 2 years
	 *
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 2);
	    var maxDate = date;

	    var waistCircumference = observations.hasObservationInDateRange(
		    patient, minDate, maxDate, this.waistCircumference,
		    errorContainer);

	    var bmi = observations.hasObservationInDateRange(patient, minDate,
		    maxDate, this.bmi, errorContainer);

	    var height = observations.hasObservationInDateRange(patient,
		    minDate, maxDate, this.height, errorContainer);

	    var weight = observations.hasObservationInDateRange(patient,
		    minDate, maxDate, this.weight, errorContainer);

	    return denominator
		    && (waistCircumference || bmi || (height && weight));
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
