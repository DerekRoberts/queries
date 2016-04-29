/**
 * Query Title: HDC-0056
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: Of active patients, 65+, with impaired renal function,
 *              how many are on digoxin?
 */
function map( patient ){

  // Query logic
  var query = {

    // Med codes and age restraints
    medication : dictionary.meds.digoxin,
    condition  : dictionary.conditions.impairedRenalFunction,
    minAge     : 65,

    // Active patient? Age?
    denominator: function( patient, date, err ){
      return
        profile.active( patient, date ) &&
        profile.ages.isMin( patient, date, this.minAge ) &&
        conditions.hasActiveCondition( patient, date, this.condition, err );
    },
    // Active statin?
    numerator: function( patient, date, denominator, err ) {
      return
        denominator &&
        medications.hasActiveMed( patient, date, this.medication, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
