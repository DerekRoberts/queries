/**
* Query Title: HDC-0943
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Of active patients, 65+,
*              how many have an influenza vaccination in the last 1y?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin  : 65,
    codeSet : dictionary.immunizations.influenza,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator, errorContainer ) {
      minDate = utils.yearsBefore( date, 1 );
      maxDate = date;

      return denominator && immunizations.hasImmunizationInDateRange( patient, minDate, maxDate, this.codeSet, errorContainer );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
