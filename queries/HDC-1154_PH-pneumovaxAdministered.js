/**
 * Query Title: HDC-1154
 * Query Type:  Ratio
 * Initiative:  Population Health
 * Description: Of active patients, 65+,
 *              how many have a pneumococcal vaccine in the last 10y?
 */
function map( pt ){

  // Query logic
  var query = {

    // Age restraint and min med count
    minAge : 65,
    imm    : dictionary.immunizations.pneumococcal,

    // Active patient? Age?
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) &&
        profile.ages.isMin( pt, date, this.minAge );
      },
    // Active vaccination in time range?
    numerator: function( pt, date, denominator, err ) {
      var minDate = utils.yearsBefore( date, 10 );
      var maxDate = date;
      return denominator &&
        immunizations.hasImmunizationInDateRange( pt, minDate, maxDate, this.imm, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
