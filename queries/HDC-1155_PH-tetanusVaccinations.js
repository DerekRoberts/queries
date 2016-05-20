/**
 * Query Title: HDC-1155
 * Query Type:  Ratio
 * Initiative:  Population Health
 * Description: Of active patients, 25+,
 *              how many have a tetanus vaccine in the last 10y?
 */
function map( patient ){

  // Query logic
  var query = {

    // Age restraint and min med count
    minAge : 25,
    imm    : dictionary.immunizations.pneumococcal,

    // Active patient? Age?
    denominator: function( patient, date, err ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge );
      },
    // Active vaccination?
    numerator: function( patient, date, denominator, err ) {
      var minDate = utils.yearsBefore( date, 10 );
      var maxDate = date;
      return denominator && immunizations.hasImmunizationInDateRange( patient, minDate, maxDate, this.imm, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
