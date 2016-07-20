/**
 * Query Title: HDC-1941 Medication Frequency Data Quality
 * Query Type: Unique Description: Emits the units of
 * frequency used to describe medications.
 * 
 * This query is completely unique in both the structure and format of its output. 
 * It is also very simple. Therefore it does not use any of the supporting 
 * functions used by nearly all other queries as none of it would be useful and
 * there is no reason to expand the support functionality for this indicator as
 * such functionality would be used only by this indicator.
 *  
 * If this indicator is ever redesigned to output as a ratio, then it should 
 * incorporate use of the common support functionality.
 * 
 *  Note that, due to its unique structure and format, the output
 *  of this query cannot be consumed by any existing tool and is only useful when
 *  run interactively by a user directly within hQuery. 
 */
function map(patient) {

    var meds = patient.json.medications;

    if (!meds) {
	return;
    }

    var med = null;
    var timing = null;

    for (var m = 0; m < meds.length; m++) {

	med = meds[m];

	if (!med.administrationTiming) {

	    emit(patient.json.primary_care_provider_id + "_noTiming", 1);
	    continue;

	}

	timing = med.administrationTiming;

	if (!timing.frequency) {
	    emit(patient.json.primary_care_provider_id + "_noFrequency", 1);
	} else if (!timing.frequency.numerator) {
	    emit(patient.json.primary_care_provider_id
		    + "_noFrequencyNumerator", 1);
	} else if (!timing.frequency.denominator) {
	    emit(patient.json.primary_care_provider_id
		    + "_noFrequencyDenominator", 1);
	} else if (!timing.frequency.numerator.value) {
	    emit(patient.json.primary_care_provider_id
		    + "_noFrequencyNumeratorValue", 1);
	} else if (!timing.frequency.denominator.unit) {
	    emit(patient.json.primary_care_provider_id
		    + "_noFrequencyDenominatorUnit", 1);
	} else if (!timing.frequency.denominator.value) {
	    emit(patient.json.primary_care_provider_id
		    + "_noFrequencyDenominatorValue", 1);
	} else {
	    emit(patient.json.primary_care_provider_id
		    + "_frequencyDenominatorUnit_"
		    + timing.frequency.denominator.unit, 1);
	}
    }
}
