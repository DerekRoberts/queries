#!/bin/bash
#
set -euo pipefail nounset

QUERY_LIST=$(find ../queries/ -regextype posix-extended -regex ".*./HDC-[0-9]{4}.*\.js")
for q in ${QUERY_LIST}
do
	FULL=${q:11}
	NAME=${q:11:8}
	DESC=${q:20:-3}
	SAVE=${NAME}.json
	if [ -f ./${SAVE} ]
	then
		echo "${SAVE} already exists"
	else
		(
			echo -e '{'
			echo -e '\t"type"         : "QUERY",'
			echo -e '\t"name"         : "'${NAME}_${DESC}'",'
			echo -e '\t"title"        : "'${NAME}'",'
			echo -e '\t"description"  : "'${DESC}'",'
			echo -e '\t"display_name" : "'${DESC}'",'
			echo -e '\t"query_type"   : "RATIO",'
			echo -e '\t"map"          : "queries/'${FULL}'",'
			echo -e '\t"reduce"       : "queries/ReduceRatio.js"'
			echo -e '}'
		) > ./${SAVE}
		echo "${SAVE} successfully created"
	fi
done
