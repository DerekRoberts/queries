/**
* Query Title: HDC-753
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients with osteoarthritis,
*              how many take acetaminophen?
*/
function map( pt ){

  // Query logic
  var query = {

    // Variables
    condition  : dictionary.conditions.osteoarthritis,
    medication : dictionary.meds.acetaminophen,

    // Active patient? Thing?
    denominator: function( pt, date, err ){
      return profile.active( pt, date )&&
        conditions.hasActiveCondition( pt, date, this.condition, err );
    },
    // Other things?
    numerator: function( pt, date, denominator, err ) {
      return denominator &&
        medications.hasActiveMed( pt, date, this.medication, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
