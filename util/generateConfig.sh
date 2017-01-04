#!/bin/bash
#
set -euo pipefail nounset


# Output file and query list from directory contents
#
QUERY_JSON=./queries.json
QUERY_LIST=$(find ../queries/ -regextype posix-extended -regex ".*./HDC-[0-9]{4}.*\.js")


# Set/restore delimiter and sort query list (expanded [*] on delimiter)
#
IFS=$'\n'
QUERY_LIST=$(sort <<<"${QUERY_LIST[*]}")
unset IFS


# Start off query.json object, overwriting any old file
#
echo '{' > ${QUERY_JSON}


# For each query file
#
for q in ${QUERY_LIST}
do
	# Chop file names to build strings
	#
	FILE=${q#../*/*}
	FULL=${FILE%.*}
	NAME=${FILE%%_*}
	DESC=${FULL#*_}
	SAVE=${NAME}.json

	# Ratio queries use the emitter.ratio() fn, otherwise count queries
	#
	if( grep --quiet 'emitter.ratio' ${q} )
	then
		(
			echo '  "'${NAME}'" : '
			echo '  {'
			echo '    "title"       : "'${NAME}'",'
			echo '    "type"        : "ratio",'
			echo '    "description" : "'${DESC}'",'
			echo '    "XMLPath"    : "ReportingCategories.PDC_'${NAME}'"'
			echo '  },'
		) >> ${QUERY_JSON}
	else
		# Count queries are individually named
		#
		if [[ "${NAME}" == "HDC-0001" ]]
		then
			HEADER="PatientCounts"
		elif [[ "${NAME}" == "HDC-1740" ]]
		then
			HEADER="ContactCounts"
		else
			HEADER=${NAME}
		fi

		(
			echo '  "'${HEADER}'" : '
			echo '  {'
			echo '    "title"       : "'${NAME}'",'
			echo '    "type"        : "count",'
			echo '    "description" : "'${DESC}'",'
			echo '    "map"         : '
			echo '    {'
			echo '      "0"  : "ZeroToNine",'
			echo '      "10" : "TenToNineteen",'
			echo '      "20" : "TwentyToTwentyNine",'
			echo '      "30" : "ThirtyToThirtyNine",'
			echo '      "40" : "FortyToFortyNine",'
			echo '      "50" : "FiftyToFiftyNine",'
			echo '      "60" : "SixtyToSixtyNine",'
			echo '      "70" : "SeventyToSeventyNine",'
			echo '      "80" : "EightyToEightyNine",'
			echo '      "90" : "NinetyToOneHundredAndOlder",'
			echo '      "UN" : "UnspecifiedAge"'
			echo '    }'
			echo '  },'
		) >> ${QUERY_JSON}
	fi
done


# Strip trailing comma
#
sed -i '$ s/,$//g' ${QUERY_JSON}


# Finish object
#
echo '}' >> ${QUERY_JSON}


# Notify and done!
#
echo "${QUERY_JSON} successfully created"


# Start of job_params.json objects
#
JOB_PARAMS=./job_params.json
(
	echo '{'
	echo '  "username"       : "maintenance",'
	echo '  "endpoint_names" : ['
	echo '    "00"'
	echo '  ],'
	echo '  "query_titles" : ['
) > ${JOB_PARAMS}


# For each query file
#
for q in ${QUERY_LIST}
do
	# Chop file names to build strings
	#
	FILE=${q#../*/*}
	NAME=${FILE%%_*}
	echo '    "'${NAME}'",' >> ${JOB_PARAMS}
done


# Strip trailing comma
#
sed -i '$ s/,$//g' ${JOB_PARAMS}


# Finish object
#
JOB_PARAMS=./job_params.json
(
	echo '  ]'
	echo '}'
) >> ${JOB_PARAMS}


# Notify and done!
#
echo "${JOB_PARAMS} successfully created"
