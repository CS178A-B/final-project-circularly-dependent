	##Dependencies defined in nlpCore-app
	##Stanford CoreNLP 3.2.0 -corenlp
	##Stanford CoreNLP 3.9.2 -parser
	##apache maven-plugins
	##com.googlecode.json-simple 1.1.1 json-simple


	##Check for maven
##mvn --version

	#Skip this block for now... (may be used later to add arguments, in and out files)
#mvn compile
#mvn exec:java -Dexec.main

	##This is the part that deosnt currently work,
	##check the target folder maybe?
#mvn exec:java -Dexec.mainClass=CoreNlpExample.main




	#####################################################
	# This is the method for compiling the maven project 
	# (quick version: just run uncommented lines)
	#####################################################
##mvn compile
##mvn install
mvn clean install
##mvn package

	#testing (you can skip this)
##mvn -Dmaven.test.skip=true package

	## This is how we run a maven without arguments
#mvn exec:java

	## Since this program has arguments
	## Adding arguments
#mvn exec:java -Dexec.args="<Input file> <Output file> <start entry cell> <Last entry cell>"
	##For example
	#Both should work
#mvn exec:java -Dexec.args="../server/testdata outdata.txt"
mvn exec:java -Dexec.args="../server/testdata outdata.txt 1 5"
##Or example without the last entry number
#mvn exec:java -Dexec.args="testfile outfile.txt"





	#Otherwise Run in Intellij...
	# open Intellij
	# open project
	# navigate to the root of the maven project (ie. final-project-circularly-dependent/nlpCore-app/) and select the pom.xml file to open
	# A prompt should come up asking if you want to open as project or file, select open as project.
	# In Intellij make sure to open the "maven project window" and click on the circular arrows to create the target directory with all the jar files.
	# or you could "try" running the program and it may build it anyway.




