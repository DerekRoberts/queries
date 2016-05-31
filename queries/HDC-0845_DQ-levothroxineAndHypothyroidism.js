/**
* Query Title: HDC-0845
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients taking an active levothyroxine,
*              how many have hypothyroidism?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    medication : dictionary.meds.levothyroxine,
    condition  : dictionary.conditions.hypothyroidism,

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
