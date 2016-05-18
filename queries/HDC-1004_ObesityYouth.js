/**
 * Query Title: HDC-1004 
 * Query Type: Ratio 
 * Description: Of patients 12-19, how
 * many have their last BMI or WC in obese range?
 */

function map(patient) {

    // Query logic
    var query = {

	// Age restraint
	minAge : 12,
	maxAge : 19,
	waistCircumference : dictionary.observations.waistCircumference,
	waistCircumferenceMaxFemale: 101, 
	waistCircumferenceMaxMale: 95,
	bmi : dictionary.observations.bodyMassIndex,
	bmiMax: 29,

	/**
	 * Denominator
	 * 
	 * Base criteria: - age 12 - 19
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && profile.ages.isMin(patient, date, this.minAge)
		    && profile.ages.isMax(patient, date, this.maxAge);
	},
	/**
	 * Numerator
	 * 
	 * Additional criteria: - has latest waist circumference in obese range
	 * OR - has latest BMI in obese range
	 * 
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 2);
	    var maxDate = date;

	    // Calculate maximum waist circumference based on patient gender
	    var effectiveWaistCircumferenceMax;
	    if(profile.gender.isF(patient, errorContainer)) {
		// Use Female max value 
		effectiveWaistCircumferenceMax = this.waistCircumferenceMaxFemale;
	    } else {
		// Use Male max value
		effectiveWaistCircumferenceMax = this.waistCircumferenceMaxMale;
	    }
	    
	    // Waist circumference check passes if most recent value is outside of the range [0, max]
	    var waistCircumference = observations.hasObservationInDateRangeWithValue (
		    patient, null, null, this.waistCircumference, 0, effectiveWaistCircumferenceMax, true, "cm", true,
		    errorContainer);

	    // BMI check passes if most recent value is outside of the range [0, max]
	    var bmi = observations.hasObservationInDateRangeWithValue (
		    patient, null, null, this.bmi, 0, this.bmiMax, true, null, true,
		    errorContainer);
	    
	    return denominator
		    && (waistCircumference || bmi);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
