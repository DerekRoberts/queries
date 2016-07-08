/**
 * Query Title: HDC-1134 INR Monitoring
 * Query Type:  Ratio
 * Description: This metric shows the percentage of active patients with an active warfarin medication who have NOT had an INR result in the last month.

 */
function map(patient) {

    // Query logic
    var query = {

	warfarin : dictionary.meds.warfarin,
	inr : dictionary.labs.inr,
	
	/**
	 * Denominator
	 *
	 * Base criteria: Active Patients with warfarin medication
	 */
	denominator : function(patient, date, errorContainer) {
	    var warfarin =  medications.hasActiveMed( patient, date, this.warfarin, errorContainer );

	    var active = profile.active(patient, date);
	    
	    return active && warfarin;
	},

	/**
	 * Numerator
	 *
	 * Additional criteria: Does NOT have an INR result in the last month
	 */
	numerator : function(patient, date, denominator, errorContainer) {
	    var minDate = utils.monthsBefore(date, 1);
	    var maxDate = date;

	    var inr = labs.hasLabInDateRange(patient, minDate,
		    maxDate, this.inr,  errorContainer);

	    return (denominator && !inr);
	},

    };

    // Emit results based on query above
    emitter.ratio(patient, query);
}
