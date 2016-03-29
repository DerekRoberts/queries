/**
* Query Title: HDC-0956
* Query Type:  Ratio
* Initiative:  Population Health
* Description: Percentage with cerebrovascular disease
*/
function map( patient ){

  // Query logic
  var query = {

    // Variables
    codeSet : dictionary.conditions.cerebrovascularDisease,

    // Active patient? Thing?
    denominator: function( patient, date ){
      return profile.active( patient, date );
    },
    // Other things?
    numerator: function( patient, date, denominator ) {
      return denominator && conditions.hasRegex( patient, this.codeSet );
    }
  };
  // Emit results based on query above
  emitter.ratio( patient, query );
}
