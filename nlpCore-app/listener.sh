
IN_FILE="../server/client-to-nlp/newData.json"
OUT_FILE="../server/nlp-to-server/outdata.json"
LOG_FILE="../server/process_log"

START_ENTRY="1"
END_ENTRY="10"


while [ 1 ]; do
	echo "READY..."
	inotifywait -m $IN_FILE -e attrib |
		while true; do
			break
		done
	CURRENT_TIME=$(date "+%Y.%m.%d-%H:%M:%S")
	echo "$IN_FILE was modified at: $CURRENT_TIME"
	echo "$IN_FILE was modified at: $CURRENT_TIME" >> $LOG_FILE
	echo "Executing process.sh"
	# We can add multi processing functionality here...
	# sh or exec ? then exit or something idr
	./process_update.sh
	
	#curl -v http://localhost:4000/test
done
	
