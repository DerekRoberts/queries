/**
 * Query Title: Retro-PDC-001
 * Query Type:  Pyramid/count
 * Description: Population Pyramid
 */
function map( patient )
{
  // Physician ID, value type and time interval
  var pid      = patient.json.primary_care_provider_id;
  var type     = 'count';
  var interval = 'TenYearRanges';

  // Indexes
  var index_gdrs;
  var index_ages;

  // Store gender (can't change)
  var gdr = getGender( patient );
  if( gdr.toString().toUpperCase() === 'FEMALE' )
    index_gdrs = 0;
  else if( gdr.toString().toUpperCase() === 'MALE' )
    index_gdrs = 1;
  else
    index_gdrs = 2;

  // Constants
  var all_gdrs =[ 'Female', 'Male', 'Unspecified' ];
  var all_ages =[ 'ZeroToNine', 'TenToNineteen', 'TwentyToTwentyNine', 'ThirtyToThirtyNine', 'FortyToFortyNine',
                  'FiftyToFiftyNine', 'SixtyToSixtyNine', 'SeventyToSeventyNine', 'SeventyToSeventyNine', 'NinetyToOneHundredAndOlder' ];

  // Start, end (now) and counter dates
  var start = new Date(2016, 2, 1);//Remember months are zero indexed
  var end = new Date().getTime();
  var i = new Date( start.getTime() );
  //
  // Monthly results
  for( ; i.getTime() < end; i.setMonth( i.getMonth() + 1 ))
  {
    // Array to emit from (by age range, then FEMALE/MALE/OTHER/UNDEF)
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
      [ 0, 0, 0 ]
    ];

    // Store age and date at time i
    var i_age  = patient.age( i );
    var i_date = i.getTime();

    // Add to mask if values check out
    if(
      activePatient( patient, i )&&
      typeof i_age === 'number' &&
      i_age >= 0
    ){
      // Divide age by ten and round down to get age range
      index_ages = Math.floor( i_age / 10 );

      // Cap off ranges at 90+
      if( index_ages > 9 )
        index_ages = 9;

      // Store in mask
      mask[ index_ages ][ index_gdrs ] = 1;
    }

    // Output mask, arranged by g=gender and a=age
    for( var a = 0; a < all_ages.length; a++ )
    {
      for( var g = 0; g < all_gdrs.length; g++ )
      {
        emit(
          '{ '+
            '"doctor" : "' + pid           + '", ' +
            '"date" : "'   + i_date        + '", ' +
            '"type" : "'   + type          + '", ' +
            '"gender" : "' + all_gdrs[ g ] + '", ' +
            '"range" : "'  + interval      + '", ' +
            '"age_r" : "'  + all_ages[ a ] + '", ' +
            '"amcare_xml_path" : "ScoreCard.PatientCounts.'  + all_gdrs[ g ] + "." + interval + "." + age_r + '" ' +
          '}',
          mask[ a ][ g ]
        );
      }
    }
  }
}
