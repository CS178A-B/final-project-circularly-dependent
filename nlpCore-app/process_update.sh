#This should update the OUT_FILE in json format with the new data

#Input file
DATA_FILE="../server/jsonsmalll.json"

#Output file
OUT_FILE="../server/outdata.json"
#Let me know if time is useful or not
#CURRENT_TIME=$(date "+%Y.%m.%d-%H.%M.%S")
#echo "Current Time: $CURRENT_TIME"
#OUT_FILE=$OUT_FILE.$CURRENT_TIME

# How many entries do you want to process feel free to put 100000 here as the code base will stop at the EOF
#start entry 1 is the first data cell
START_ENTRY="1"
END_ENTRY="10"
#DATA_COUNT="5"

#mvn clean
#mvn compile
#mvn install
mvn clean install

# This is how we run a maven without arguments
#mvn exec:java

# Previous Execs may not work anymore
#mvn exec:java -Dexec.main
#mvn exec:java -Dexec.mainClass=CoreNlpExample.main

# Adding arguments
#mvn exec:java -Dexec.args="<Input file> <Output file> <start entry cell> <Last entry cell>"
mvn exec:java -Dexec.args="${DATA_FILE} ${OUT_FILE} ${START_ENTRY} ${END_ENTRY}"

#For example
#Both should work
#mvn exec:java -Dexec.args="../server/testdata outdata.txt"
#mvn exec:java -Dexec.args="../server/testdata outdata.txt 1 5"

#Or example without the last entry number
#mvn exec:java -Dexec.args="testfile outfile.txt"



#Otherwise Run in Intellij...
# open Intellij
# open project
# navigate to the root of the maven project (ie. final-project-circularly-dependent/nlpCore-app/) and select the pom.xml file to open
# A prompt should come up asking if you want to open as project or file, select open as project.
# In Intellij make sure to open the "maven project window" and click on the circular arrows to create the target directory with all the jar files.
# or you could "try" running the program and it may build it anyway.

echo "New JSON file: $OUT_FILE"



#perform POST Request, maybe?
URL=""

curl -F ${OUT_FILE} ${URL}



