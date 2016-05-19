/**
 * Query Title: HDC-1907 BloodPressure-Diabetes
 * Query Type:  Ratio
 * Description: DM: w BP<=130/80 1y
 * 
 * Duplicate of HDC-0028
 */
function map(patient) {

    // Query logic
    var query = {

	diabetes : dictionary.conditions.diabetes,
	systolicBloodPressure  : dictionary.observations.systolicBloodPressure,
	maxSystolicBloodPressure : 130,
	diastolicBloodPressure  : dictionary.observations.diastolicBloodPressure,
	maxDiastolicBloodPressure : 80,
	
	
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
	 * Additional criteria:
	 *   - Blood Pressure recorded
	 *     - in last year
	 *     - Systolic <= 130 mm[hg]
	 *       AND
	 *     - Diastolic <= 80 mm[hg]
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.yearsBefore(date, 1);
	    var maxDate = date;

	    var systolicBloodPressure = observations.hasObservationInDateRangeWithValue(patient, minDate,
		    maxDate, this.systolicBloodPressure, null, this.maxSystolicBloodPressure, false, "mm[Hg]", false,
		    errorContainer);
	    var diastolicBloodPressure = observations.hasObservationInDateRangeWithValue(patient, minDate,
		    maxDate, this.diastolicBloodPressure, null, this.maxDiastolicBloodPressure, false, "mm[Hg]", false,
		    errorContainer);

	    return (denominator && systolicBloodPressure && diastolicBloodPressure);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
