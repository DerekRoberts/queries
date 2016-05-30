/**
* Query Title: HDC-734
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients an active opioid prescription, 21+,
*              how many do not have chronic pain?
*/
function map( pt ){

  // Query logic
  var query = {

    // Variables
    minAge      : 21,
    medication  : dictionary.meds.opioid,
    condition   : dictionary.conditions.painChronic,

    // Active patient? 21+? Opioid prescription?
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) &&
        profile.ages.isMin( pt, date, this.minAge, err ) &&
        medications.hasActiveMed( pt, date, this.medication, err );
    },
    // Do not have chronic pain?
    numerator: function( pt, date, denominator, err ) {
      return denominator &&
        !conditions.hasActiveCondition( pt, date, this.condition, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
