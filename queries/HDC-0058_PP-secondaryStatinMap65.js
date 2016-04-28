/**
 * Query Title: HDC-0056
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: Of active patients, 65+, on a statin,
 *              how many have had a cardiac event?
 */
function map( patient ){

  // Query logic
  var query = {

    // Med codes and age restraints
    medication : dictionary.meds.statin,
    condition  : dictionary.conditions.cardiacEvent,
    minAge     : 65,

    // Active patient? Age?
    denominator: function( patient, date, err ){
      return
        profile.active( patient, date ) &&
        profile.ages.isMin( patient, date, this.minAge ) &&
        medications.hasActiveMed( patient, date, this.medication, err );
      },
    // Active statin?
    numerator: function( patient, date, denominator, err ) {
      return
        denominator &&
        conditions.hasActiveCondition( patient, date, this.condition, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
