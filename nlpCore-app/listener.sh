
IN_FILE=../server/client-to-nlp/newData.json
LOG_FILE=../server/process_log

#until $(curl --output IN_FILE --silent --head --fail http://myhost:myport); do
#	printf '.'
#	sleep 5
#done

inotifywait -m $IN_FILE -e attrib |
	while read dir action file; do
		CURRENT_TIME=$(date +%Y.%m.%d - %H:%M:%S)
		echo "$IN_FILE was modified at $CURRENT_TIME"
		echo "$IN_FILE was modified at $CURRENT_TIME" >> $LOG_FILE
		echo "Executing process.sh"
		#We cann add multi processing functionality here...
		# using sh
		./process_update.sh
	done

