/**
 * Query Title: HDC-0001
 * Query Type:  Pyramid/count
 * Description: Population profile
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
  var genders =[ 'Female', 'Male', 'Unspecified' ],
    agesMin   =[ '0', '10', '20', '30', '40', '50', '60', '70', '80',  '90', 'UN' ],
    agesMax   =[ '9', '19', '29', '39', '49', '59', '69', '79', '89', '120', 'UN' ],
    ageOpts   = agesMin.length - 1,
    indexGdrs,
    indexAges,
    retroAge;

  // Store gender (can't change)
  switch( profile.gender.getGender( patient ).toString().toUpperCase() ){
    case 'FEMALE':
      indexGdrs = 0;
      break;
    case 'MALE' :
      indexGdrs = 1;
      break;
    default:
      indexGdrs = 2;
      break;
  }

  // Monthly results
  var i = defaults.dates.start(),
    end = defaults.dates.end();
  for( ; i < end; i.setMonth( i.getMonth() + 1 )){
    // Array to emit from (by age range, then F/M/UN)
    var mask = [
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ],
      [ 0, 0, 0 ]
    ];

    // Store age at time i
    retroAge = patient.age( i );

    // Add current patients to mask
    if( profile.active( patient, i )){
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
      mask[ indexAges ][ indexGdrs ] = 1;
    }

    // Output mask, arranged by g=gender and a=age
    for( var a = 0; a < agesMin.length; a++ )
    {
      for( var g = 0; g < genders.length; g++ )
      {
        jsonEmit.date = i.getTime();
        jsonEmit.agesMin = agesMin[ a ];
        jsonEmit.agesMax = agesMax[ a ];
        jsonEmit.gender = genders[ g ];
        emit( JSON.stringify(jsonEmit), mask[ a ][ g ]);
      }
    }
  }
}
