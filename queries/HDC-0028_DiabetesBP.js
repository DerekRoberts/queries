/**
 * Query Title: HDC-0028
 * Query Type:  Ratio
 * Description: DM: w BP<=130/80 1y
 *
 * Duplicate of HDC-1907
 */
function map(patient) {

    // Query logic
    var query = {

	diabetes : dictionary.conditions.diabetes,
	bloodPressureSystolic  : dictionary.observations.bloodPressureSystolic,
	maxBloodPressureSystolic : 130,
	bloodPressureDiastolic  : dictionary.observations.bloodPressureDiastolic,
	maxBloodPressureDiastolic : 80,


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

	    var bloodPressureSystolic = observations.hasObservationInDateRangeWithValue(patient, minDate,
		    maxDate, this.bloodPressureSystolic, null, this.maxBloodPressureSystolic, false, "mm[Hg]", false,
		    errorContainer);
	    var bloodPressureDiastolic = observations.hasObservationInDateRangeWithValue(patient, minDate,
		    maxDate, this.bloodPressureDiastolic, null, this.maxBloodPressureDiastolic, false, "mm[Hg]", false,
		    errorContainer);

	    return (denominator && bloodPressureSystolic && bloodPressureDiastolic);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
