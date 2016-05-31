/**
* Query Title: HDC-0846
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients taking an antigout preparation,
*              how many have gout?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    medication : dictionary.meds.antigout,
    condition  : dictionary.conditions.gout,

    // Active patient? Age restraints?
    denominator: function( patient, date, err ){
      return profile.active( patient, date )&&
        medications.hasActiveMed( patient, date, this.medication, err );
    },
    // Other things?
    numerator: function( patient, date, denominator, err ) {
      return denominator &&
        conditions.hasActiveCondition( patient, date, this.condition, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
