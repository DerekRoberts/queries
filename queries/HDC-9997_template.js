/**
* Query Title: HDC-####
* Query Type:  Ratio
* Description: Things!  Excitement!
* Query Type:  Ratio
* Description: Of patients <blank>,
*              how many <blank>?
*/

function map( patient ){

        // Query logic
        var query = {

                // Restraints
                minAge : 0,
                maxAge : 100,

                // Dictionary values
                condition    : dictionary.conditions.thing,
                immunization : dictionary.immunizations.thing,
                medication   : dictionary.meds.thing,
                observation  : dictionary.observations.thing,
                labResult    : dictionary.labs.thing,

                // Denominator
                denominator : function( patient, date, errorContainer ){
                        return profile.active( patient, date )
                                && profile.ages.isRange(
                                        patient, date, this.minAge, this.maxAge
                                );
                },

                // Numerator
                numerator : function( patient, date, denominator, errorContainer ){
                        var minDate = utils.yearsBefore( date, 2 );
                        var maxDate = date;

                        var example = observations.hasObservationInDateRange(
                                patient, minDate, maxDate, this.observation, errorContainer
                        );

                        return denominator && example;
                },
        };

        // Emit results based on query above
        emitter.ratio( patient, query );
}
