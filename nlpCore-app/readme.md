# Deep Capitalizer Data Processor
### Dependencies defined in nlpCore-app
* Apache Maven
```bash
sudo apt install maven
mvn --version
```
* Java Developer version (any version should work)
```bash
sudo apt install default-jdk
javac -version
```
* Crontab: Automate tasks on a scheduled basis (Not using cron anymore)
```bash
sudo apt-get install cron
0 */2 * * *  /home/user/process_update.sh
```

* inotify-tools
```bash
sudo apt install inotify-tools
```


### What is it?
This is Deep capitalizer back end code base. Utilizing Stanford's CoreNLP Library this code should process a .json file from the front end's csv of the City of Riverside's purchase data to a usable json for the front end of Deep Capitalizer. When ran on a server this code should execute based on the cron job's specified time.

[Stanford Core NLP](https://stanfordnlp.github.io/CoreNLP/)

## How to Run
To run make sure the dependencies are installed. Based on Ubuntu versions the Stanford CoreNLP version may need to be updated. The pom.xml is where this will be done
* Ubuntu 20.04 (default) - pom.xml 
```
line:31 <version>4.2.0</version>
line:36 <version>4.2.0</version>
```
* Ubuntu 16.04 - pom.xml change 
```
line:31 <version>3.2.0</version>
line:36 <version>3.2.0</version>
```

If you are running the server and client then you can forget everything else and in the ```.../nlpCore-app``` directory run
```bash
chmod u+x ./listener.sh
./listener.sh
```
This will listen for when the server changes the file in ```.../server/client-to-nlp/newData.json``` file and will process the json data when the update is made to that file. That file changes automatically when the client uploads a csv file through the front end home page.

## Testing and Tinkering

Testing information is done with travis CI in the .yml file in the root directory.
```
mvn clean install
mvn -Dtest=testCoreNLP test #Tests all
```
The testing class is in ```final-project-circularly-dependent/nlpCore-app/src/test/java/testCoreNLP.java``` This is where we can add more testing methods.

From the ```.../nlpCore-app``` directory run
```bash
chmod u+x process_update.sh
./process_update
```
This file should execute (so you don't need to execute this)
```
mvn clean install
mvn exec:java -Dexec.args="../server/testdata outdata.txt 1 5"
```

You may need to edit the arguments in the ```process_update.sh``` file depending on what entries cells you would like to process in the json file. More argument details are in the ```process_update.sh``` and ```CoreNlpExample.java```.

## Errors and Crashes
Strictly for this data processor, if a crash does occur the error log should state the last cell that was processed. Afterwards run the program either trying the cell that the program crashed on or by skipping that cell. If there is a crash due to poor data processing the processor should successfully write the json up to that cell.
