/**
* Query Title: HDC-0962
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults (20+) with hypertension
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin      : 20,
    condSystem1 : "ICD9",
    condRegex1  : dictionary.conditions.hypertension.ICD9,
    condSystem2 : "SNOMEDCT",
    condRegex2  : dictionary.conditions.hypertension.SNOMEDCT,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator ) {
      return denominator &&
        conditions.hasRegex( patient, this.condSystem1, this.condRegex1 ) &&
        conditions.hasRegex( patient, this.condSystem2, this.condRegex2 );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
