/**
 * Query Title: HDC-0014
 * Query Type:  Ratio
 * Initiative:  Population Health
 * Description: Of active patients, 65+,
 *              how many have a pneumococcal vaccine?
 */
function map( patient ){

  // Query logic
  var query = {

    // Age restraint and min med count
    minAge : 65,
    imm    : dictionary.immunizations.pneumococcal,

    // Active patient? Age?
    denominator: function( patient, date, err ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge, err );
      },
    // Active vaccination?
    numerator: function( patient, date, denominator, err ) {
      return denominator && immunizations.hasActiveImmunization( patient, date, this.imm, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
