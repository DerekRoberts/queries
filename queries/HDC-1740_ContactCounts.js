/**
* Query Title: HDC-1740
* Query Type:  Pyramid/count
* Description: Count/encounter profile
*/
function map( patient )
{
    // Physician ID, category type and other emit fields
    var jsonEmit = {
        doctor      : patient.json.primary_care_provider_id,
        category    : 'TenYearRanges',
        date        : 'Value not provided',
        agesMin     : 'Value not provided',
        agesMax     : 'Value not provided'
    };

    // Constants and index variables
    var agesMin =[ '0', '10', '20', '30', '40', '50', '60', '70', '80',  '90', 'UN' ],
        agesMax =[ '9', '19', '29', '39', '49', '59', '69', '79', '89', '120', 'UN' ],
        ageOpts = agesMin.length - 1,
        indexAges,
        retroAge;

    // Monthly results
    var i = dictionary.defaults.dates.start(),
      end = dictionary.defaults.dates.end();
    for( ; i < end; i.setMonth( i.getMonth() + 1 )){
        // Array to emit from (by age range)
        var mask = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];

        // Store age at time i
        retroAge = patient.age( i );

        // Add current patients to mask
        if( typeof retroAge === 'number' && retroAge >= 0 ){
            // Divide age by ranges, caping off 90+, but...
            indexAges = Math.floor( retroAge / ageOpts );
            if( indexAges > ageOpts )
            indexAges = ageOpts - 1;
        }
        else {
            // ...reserve the final spot for unspecified age
            indexAges = ageOpts;
        }
        // Store in mask
        mask[ indexAges ] = profile.countEncountersByMonth( patient, i );

        // Output mask, arranged by a=age
        for( var a = 0; a < agesMin.length; a++ )
        {
            jsonEmit.date = i.getTime();
            jsonEmit.agesMin = agesMin[ a ];
            jsonEmit.agesMax = agesMax[ a ];
            emit( JSON.stringify(jsonEmit), mask[ a ]);
        }
    }
}
