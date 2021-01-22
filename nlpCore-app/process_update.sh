#This should update the OUT_FILE in json format with the new data

#Input file
DATA_FILE="../server/testdata"

#Output file
OUT_FILE="../server/outdata.json"
#Let me know if time is useful or not
#CURRENT_TIME=$(date "+%Y.%m.%d-%H.%M.%S")
#echo "Current Time: $CURRENT_TIME"
#OUT_FILE=$OUT_FILE.$CURRENT_TIME

# How many entries do you want to process feel free to put 100000 here as the code base will stop at the EOF
DATA_COUNT="5"

mvn clean install
mvn exec:java -Dexec.args="${DATA_FILE} ${OUT_FILE} ${DATA_COUNT}"

echo "New JSON file: $OUT_FILE"

