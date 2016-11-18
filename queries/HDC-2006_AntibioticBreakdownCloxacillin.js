/**
 * Query Title: HDC-2001
 * Query Type:  Ratio
 * Initiative:  Antibiotic Breakdown
 * Description: Cloxacillin over all antibiotics, back one year
 */
function map( patient ){

  // Query logic
  var query = {

    // Variables
    medDenom : dictionary.meds.antibiotic,
    medNum   : dictionary.meds.antibioticCloxacillin,
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
