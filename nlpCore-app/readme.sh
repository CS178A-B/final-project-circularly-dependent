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

###################################################################
# A method for compiling the maven project (quick version just run uncommented lines)
###################################################################
##mvn compile
##mvn install
mvn clean install
##mvn package

#testing (you can skip this)
##mvn -Dmaven.test.skip=true package

##This is the part that deosnt currently work, check the target folder maybe?
##mvn exec:java -Dexec.mainClass=CoreNlpExample.main
mvn exec:java


#Otherwise Run in Intellij...
# open Intellij
# open project
# navigate to the root of the maven project (ie. final-project-circularly-dependent/nlpCore-app/) and select the pom.xml file to open
# A prompt should come up asking if you want to open as project or file, select open as project.
# In Intellij make sure to open the "maven project window" and click on the circular arrows to create the target directory with all the jar files.
# or you could "try" running the program and it may build it anyway.




