/**
 * Query Title: HDC-0919 Hypertension & BP in last yr
 * Query Type:  Ratio
 * Description: Active patients with hypertension (based on problem list) 
 * who have a blood pressure measurement documented within the past 12 months
 */
function map(patient) {

    // Query logic
    var query = {

	hypertension : dictionary.conditions.hypertension,
	bpDiastolic : dictionary.observations.bloodPressureDiastolic,
        bpSystolic  : dictionary.observations.bloodPressureSystolic,

	/**
	 * Denominator
	 *
	 * Base criteria: - diagnosed with hypertension
	 */
	denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date)
		    && conditions.hasActiveCondition(patient, date,
			    this.hypertension, errorContainer);

	},

	/**
	 * Numerator
	 *
	 * Additional criteria: - Blood pressure recorded ---> in last year
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	      var minDate = utils.yearsBefore( date, 1 );
	      var maxDate = date;

	      var hasBPD  = observations.hasObservationInDateRange(
		      patient, minDate, maxDate, this.bpDiastolic, errorContainer
	      );

	      var hasBPS  = observations.hasObservationInDateRange(
		      patient, minDate, maxDate, this.bpSystolic, errorContainer
	      );

	      return (denominator && hasBPD && hasBPS);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
