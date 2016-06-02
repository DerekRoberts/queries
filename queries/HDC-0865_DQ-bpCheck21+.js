/**
* Query Title: HDC-0865
* Query Type:  Ratio
* Initiative:  Practice Reflection
* Description: Of patients 21+,
*              how many have their pressure recorded in the last 3y?
*/

function map( pt ) {

  // Query logic
  var query = {

    // Age restraint
    minAge      : 21,
    bpDiastolic : dictionary.observations.bloodPressureDiastolic,
    bpSystolic  : dictionary.observations.bloodPressureSystolic,

    // Active?  Age?
    denominator : function( pt, date, err ){
      return profile.active( pt, date )&&
        profile.ages.isMin( pt, date, this.minAge );
    },

    // Both observations?
    numerator  : function( pt, date, denominator, err ){
      var minDate = utils.yearsBefore( date, 3 );
      var maxDate = date;

      var hasBPD  = observations.hasObservationInDateRange(
        pt, minDate, maxDate, this.bpDiastolic, err
      );

      var hasBPS  = observations.hasObservationInDateRange(
        pt, minDate, maxDate, this.bpSystolic, err
      );

      return denominator && hasBPD && hasBPS;
    },

  };

  // Emit results based on query above
  emitter.ratio(pt, query);
}
