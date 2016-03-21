/**
 * Query Title: HDC-1921_HMG-CoA65+
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: This metric shows the percentage of active patients, 65 and
 *              over, on an active medication for an HMG-CoA reductase
 *              inhibitors (statins)
 */
function map( patient ){

  // Query logic
  var query = {

    // Minimum age
    minAge: 65,

    // Active patient? Age?
    denominator: function( patient, date ){
      return activePatient( patient, date ) && ages.isMin( patient, date, this.minAge );
    },
    // Active statin?
    numerator: function( patient, date, denominator ) {
      return denominator && medications.hasActiveStatin( patient, date );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
