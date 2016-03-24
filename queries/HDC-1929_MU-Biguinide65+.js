/**
 * Query Title: HDC-1929
 * Query Type:  Ratio
 * Initiative:  Med Use
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, have an active medication for a biguanide.
 */
function map( patient ){

  // Query logic
  var query = {

    // Med codes and age restraints
    code   : dictionary.meds.biguanide,
    minAge : 65,

    // Active patient? Age?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.minAge );
    },
    // Active statin?
    numerator: function( patient, date, denominator ) {
      return denominator && medications.hasActiveMed( patient, date, this.code );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
