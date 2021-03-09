IN_FILE="../server/client-to-nlp/newData.json"
echo $IN_FILE
inotifywait $IN_FILE -e attrib
echo hello world