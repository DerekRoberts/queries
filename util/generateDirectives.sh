#!/bin/bash
#
set -euo pipefail nounset


# Target directory and source query list
#
DIRECTIVES="../directives"
QUERY_LIST=$(find ../queries/ -regextype posix-extended -regex ".*./HDC-[0-9]{4}.*\.js")


# For each query file
#
COUNT=0
for q in ${QUERY_LIST}
do
	# Chop file names to build strings
	#
	FILE=${q#../*/*}
	FULL=${FILE%.*}
	NAME=${FILE%%_*}
	DESC=${FULL#*_}
	SAVE=${NAME}.json
	HERE=${DIRECTIVES}/${SAVE}

	# Only create files that don't exist
	#
	if [ -f ./${HERE} ]
	then
		echo "${SAVE} already exists"
	else
		if( grep --quiet 'emitter.ratio' ${q} )
		then
			# Ratio queries use the emitter.ratio() function
			#
			(
				echo -e '{'
				echo -e '\t"type"         : "QUERY",'
				echo -e '\t"name"         : "'${NAME}_${DESC}'",'
				echo -e '\t"title"        : "'${NAME}'",'
				echo -e '\t"description"  : "'${DESC}'",'
				echo -e '\t"display_name" : "'${DESC}'",'
				echo -e '\t"query_type"   : "RATIO",'
				echo -e '\t"map"          : "queries/'${FULL}'.js",'
				echo -e '\t"reduce"       : "queries/ReduceRatio.js"'
				echo -e '}'
			) > ${HERE}
		else
			# ...Otherwise they're count/stratified queries
			(
				echo -e '{'
				echo -e '\t"type"         : "QUERY",'
				echo -e '\t"name"         : "'${NAME}_${DESC}'",'
				echo -e '\t"title"        : "'${NAME}'",'
				echo -e '\t"description"  : "'${DESC}'",'
				echo -e '\t"display_name" : "'${DESC}'",'
				echo -e '\t"query_type"   : "STRATIFIED",'
				echo -e '\t"map"          : "queries/'${FULL}'.js",'
				echo -e '\t"reduce"       : "queries/ReduceCount.js"'
				echo -e '}'
			) > ${HERE}

		fi
		echo "${SAVE} successfully created"
	fi

	# Increment count
	#
	((COUNT+=1))
done


# Output results
#
echo
echo "Total queries: ${COUNT}"
echo
