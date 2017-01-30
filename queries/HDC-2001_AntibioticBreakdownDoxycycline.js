/**
 * Query Title: HDC-2001
 * Query Type:  Ratio
 * Initiative:  Antibiotic Breakdown
 * Description: Doxycycline over all antibiotics, back one year
 */
function map( patient ){

  // Query logic
  var query = {

    // Variables
    medDenom : dictionary.meds.antibiotic,
    medNum   : dictionary.meds.antibioticDoxycycline,
    backYrs  : 1,

    // Active patient? Thing?
    denominator: function( patient, date, errorContainer ){
      var minDate = utils.yearsBefore( date, this.backYrs );
      var maxDate = date;

      return medications.hasActiveMedInDateRange( patient, minDate, maxDate,
        this.medDenom, errorContainer );
    },

    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      var minDate = utils.yearsBefore( date, this.backYrs );
      var maxDate = date;

      var oneAntibiotic = medications.hasActiveMedInDateRange( patient, minDate,
        maxDate, this.medNum, errorContainer );

      return oneAntibiotic && denominator;
    }
  };

  // Emit results based on query above
  emitter.ratio( patient, query );
}


/**
 * Query Title: HDC-2001 Doxycyline Use in Past Year - All Ages
 * Query Type:  Ratio
 * Domain: Medication Prescribing
 * Sub Domain: Medication Use - Antibiotics
 * Description: This measure shows the percentage of active patients with an active medication for Doxycyline in the last year.
 */
function map( patient ){

  // Query logic
  var query = {

    /**
	 * Definition of Doxycycline medication from dictionary
	 */
	doxycycline   : dictionary.meds.antibioticDoxycycline,

    /**
	 * Denominator:
	 * Count of total number of active patients documented in the EMR.
	 */
    denominator : function(patient, date, errorContainer) {
	    return profile.active(patient, date);
    },

    /**
	 * Numerator:
	 * Count of the number of active patients that have had a medication for Doxycyline in the last year.
	 */
    numerator: function( patient, date, denominator, errorContainer ) {
      var minDate = utils.yearsBefore( date, 1 );
      var maxDate = date;

      var onAntibiotic = medications.hasActiveMedInDateRange( patient, minDate,
        maxDate, this.doxycycline, errorContainer );

      return onAntibiotic && denominator;
    }
  };

  // Emit results based on query above
  emitter.ratio( patient, query );
}
