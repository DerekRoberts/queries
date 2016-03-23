/**
* Query Title: HDC-0954
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage of adults (20+) with chronic kidney disease
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    ageMin     : 20,
    condSystem : "ICD9",
    condRegex  : dictionary.conditions.chronicKidneyDisease.ICD9,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date ) && profile.ages.isMin( patient, date, this.ageMin );
    },
    // Other things?
    numerator: function( patient, date, denominator ) {
      return denominator && conditions.hasRegex( patient, this.condSystem, this.condRegex );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
