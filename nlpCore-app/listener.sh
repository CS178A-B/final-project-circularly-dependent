IN_FILE="../server/client-to-nlp/newData.json"
OUT_FILE="../server/nlp-to-server/outdata.json"
LOG_FILE="../server/process_log"
URL="http://localhost:4000/nlpSignal"
while [ 1 ]; do
	echo "Waiting..."
	inotifywait $IN_FILE -e attrib
	CURRENT_TIME=$(date "+%Y.%m.%d-%H:%M:%S")
	# maybe log username information in the future
	echo "$IN_FILE was modified at: $CURRENT_TIME"
	echo "$IN_FILE was modified at: $CURRENT_TIME" >> $LOG_FILE
	echo "Executing process.sh"
	# We can add multi processing functionality here...
	# sh or exec ? then exit or something idr
	./process_update.sh
	curl -v ${URL}
	#curl -F data=@${OUT_FILE} ${URL}
done
