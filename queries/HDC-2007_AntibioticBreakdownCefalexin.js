/**
 * Query Title: HDC-2007 Cefalexin Use in Past Year - All Ages
 * Query Type:  Ratio
 * Domain: Medication Prescribing
 * Sub Domain: Medication Use - Antibiotics
 * Description: This measure shows the percentage of active patients with an active medication for Cefalexin in the last year. 
 */
function map( patient ){

  // Query logic
  var query = {

    /**
	 * Definition of Cefalexin medication from dictionary
	 */
	cefalexin   : dictionary.meds.antibioticCefalexin,

    /**
	 * Denominator:
	 * Count of total number of active patients documented in the EMR.
	 */
    denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);
    },

    /**
	 * Numerator:
	 * Count of the number of active patients that have had a medication for Cefalexin in the last year.
	 */
    numerator: function( patient, date, denominator, errorContainer ) {
      var minDate = utils.yearsBefore( date, 1 );
      var maxDate = date;

      var onAntibiotic = medications.hasActiveMedInDateRange( patient, minDate,
        maxDate, this.cefalexin, errorContainer );

      return onAntibiotic && denominator;
    }
  };

  // Emit results based on query above
  emitter.ratio( patient, query );
}

