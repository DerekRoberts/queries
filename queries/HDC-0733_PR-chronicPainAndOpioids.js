/**
* Query Title: HDC-733
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients with chronic pain, 21+,
*              how many have an active opioids prescription?
*/
function map( pt ){

  // Query logic
  var query = {

    // Variables
    minAge      : 21,
    condition   : dictionary.conditions.painChronic,
    medication  : dictionary.meds.opioid,

    // Active patient? Age 21+? Chronic pain?
    denominator: function( pt, date, err ){
      return profile.active( pt, date ) &&
        profile.ages.isMin( pt, date, this.minAge, err ) &&
        conditions.hasActiveCondition( pt, date, this.condition, err );
    },
    // Has opioid prescription?
    numerator: function( pt, date, denominator, err ) {
      return denominator &&
        medications.hasActiveMed( pt, date, this.medication, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
