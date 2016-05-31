/**
* Query Title: HDC-0843
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of active patients taking an active tiotropium,
*              how many have COPD?
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    condition  : dictionary.conditions.COPD,
    medication : dictionary.meds.tiotropium,

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
