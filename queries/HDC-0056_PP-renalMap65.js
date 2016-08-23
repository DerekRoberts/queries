/**
 * Query Title: HDC-0056
 * Query Type:  Ratio
 * Initiative:  Polypharmacy
 * Description: Of active patients, 65+, with impaired renal function,
 *              how many are on digoxin?
 */
function map( pt ){

  // Query logic
  var query = {

    // Med codes and age restraints
    minAge     : 65,
    condition  : dictionary.conditions.impairedRenalFunction,
    medication : dictionary.meds.digoxin,

    // Active pt? Age?
    denominator: function( pt, date, err ){
      return profile.active( pt, date, err ) &&
        profile.ages.isMin( pt, date, this.minAge, err ) &&
        conditions.hasActiveCondition( pt, date, this.condition, err );
    },
    // Active statin?
    numerator: function( pt, date, denominator, err ) {
      return denominator &&
        medications.hasActiveMed( pt, date, this.medication, err );
    }
  };
  // Emit results based on query above
  emitter.ratio( pt, query );
}
