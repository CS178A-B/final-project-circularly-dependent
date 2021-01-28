//.xls Read, Excel 97-2003
//...


//Core NLP
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.util.CoreMap;

//other
import java.io.*;
import java.util.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
//import java.util.Scanner;


public class CoreNlpExample {


    //This function will return a json object with 2 pieces of data when we pass in the purchase description
    //1: PRODUCT_NAME: this is the first pattern of consecutive nouns in the purchase description
    //2: DESCRIPTOR: this is all the adjectives that exist within the purchase description
    public static JSONObject getGrouping(String text){
        JSONObject group = new JSONObject();
        group.put("PRODUCT_NAME", 0);
        group.put("DESCRIPTOR", 0); //Do you want a json array???
        boolean consecutive = true;//capture 1 set of consecutive nouns
        boolean noun_fill = false;

        // creates a StanfordCoreNLP object, with POS tagging, lemmatization, NER, parsing, and coreference resolution
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, pos, lemma, ner, parse, dcoref");
        StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

        // create an empty Annotation just with the given text
        Annotation document = new Annotation(text);

        // run all Annotators on this text
        pipeline.annotate(document);

        // these are all the sentences in this document
        // a CoreMap is essentially a Map that uses class objects as keys and has values with custom types
        List<CoreMap> sentences = document.get(CoreAnnotations.SentencesAnnotation.class);

        //System.out.println("[");
        for(CoreMap sentence: sentences) {
            // traversing the words in the current sentence
            // a CoreLabel is a CoreMap with additional token-specific methods

            for (CoreLabel token: sentence.get(CoreAnnotations.TokensAnnotation.class)) {
                // this is the text of the token
                String word = token.get(CoreAnnotations.TextAnnotation.class);
                // this is the POS tag of the token
                String pos = token.get(CoreAnnotations.PartOfSpeechAnnotation.class);
                // this is the NER label of the token
                String ne = token.get(CoreAnnotations.NamedEntityTagAnnotation.class);

//                try{
//                    System.out.println(String.format("Print: word: [%s] pos: [%s] ne: [%s]", word, pos, ne));//DEBUG
//                } catch(NullPointerException no){
//                    System.out.println("HERE");
//                }

                //capture nouns or adjectives otherwise check if we have nouns and break consecutive chain
                if(pos.matches("JJ") ||
                        pos.matches("NN") ||
                        pos.matches("NNS")||
                        pos.matches("NNP")||
                        pos.matches("NNPS")) { //extract nouns and adjectives only
                    //System.out.println(String.format("Print: word: [%s] pos: [%s] ne: [%s]", word, pos, ne));//DEBUG
                    //System.out.print(String.format(" %s", word));//DEBUG
                    //group += (String.format("%s ", word));

                    //capture consecutive nouns
                    if((pos.matches("NN") ||
                            pos.matches("NNS")||
                            pos.matches("NNP")||
                            pos.matches("NNPS"))
                            && consecutive){
                        //System.out.println();
                        //group.put("PRODUCT_NAME", String.format("%s ", word));
                        if(group.get("PRODUCT_NAME").equals(0)){
                            group.put("PRODUCT_NAME",String.format("%s", word));
                        }
                        else {
                            group.put("PRODUCT_NAME",
                                    group.get("PRODUCT_NAME").toString().concat(String.format(" %s", word)));
                        }
                        noun_fill = true;
                    }

                    //caputre adjectives
                    if(pos.matches("JJ")){
                        //System.out.println();
                        if(group.get("DESCRIPTOR").equals(0)){
                            group.put("DESCRIPTOR", String.format("%s", word));
                        }
                        else{
                            group.put("DESCRIPTOR",
                                    group.get("DESCRIPTOR").toString().concat(String.format(" %s", word)));
                        }
                    }
                }
                else if(noun_fill){
                    consecutive = false;
                }
            }
            //System.out.print(", ");
            // this is the parse tree of the current sentence
            //Tree tree = sentence.get(TreeAnnotation.class);

            // this is the Stanford dependency graph of the current sentence
            //SemanticGraph dependencies = sentence.get(CollapsedCCProcessedDependenciesAnnotation.class);
        }
        return group;
    }



    //JSON Generator and NLP Processor
    //Turns a csv into a json and adds the necessary product data to the json output
    //To run make sure maven is installed and have the following arguments
    //Input args[0]:
    //              An input file that has cells delimited by a special delimeter.
    //              CSV's normally delimit with with a comma, here we are expecting
    //              a file that delimits with a double pipe ||
    //Output args[1]:
    //              Name of a file this program will write to. This file will be
    //              in JSON format.
    //The next 2 arguments are optional but require each other. Cannot have one without the other
    //(Optional with [3]) args[2]:
    //              This optional value is the range entry specifier. This value
    //              if specified is the START entry this generator will process.
    //              If not specified this program will default to a constant
    //              value int endEntry.
    //(Optional with [2]) args[3]:
    //              This optional value is the range entry specifier. This value
    //              if specified is the END entry this generator will process.
    //              If not specified this program will default to a constant
    //              value int endEntry.
    public static void main(String[] args) {

        String in_file = null;
        String out_file = null;
        
        //Partitioning functionality: these 2 variables are for if we want to process a section of data from the csv
        int startEntry = 1;//this is not the exact cell in the csv. In the csv the exact cell is off by +1
        //ie: to specify cell 21 in the csv, type in 20.

        //This is the max entry. If args[2] is not specified then this value will be the default value.
        //If we want to attempt the entire file make this number very high, like 1000000
        //There is control in place for overextending this value so don't worry
        int endEntry = 10;//excluded entry
        //get last argument if it is specified
        
//        in_file = "testdata";
//        out_file = "outdata.txt";
        // using || double pipe as delimiter. This is the delimiter of the input data
        String delimiter = "\\|\\|";


        //to stop at entry 33, type in 34, this will be 34 in the csv so this will be the exact cell in the csv
        //Check args[] make sure we have 2 or 4.
        switch (args.length){
            case 2:
                in_file = args[0];
                out_file = args[1];
                //start and end entry default to above values
                break;
            case 4:
                in_file = args[0];
                out_file = args[1];
                try{
                    startEntry = Integer.parseInt(args[2]);
                    endEntry = Integer.parseInt(args[3]);
                }
                catch(NumberFormatException nume){
                    System.out.println("Arguments [2] and [3] are not in number format");
                    nume.printStackTrace();
                }
                break;
            default:
                System.out.println("Json generator requires 2 or 4 arguments to be specified");
                return;//exit program
        }

        //Generic Read and Write to file
        PrintWriter writer = null;
        try {
            writer = new PrintWriter(out_file);
        } catch (FileNotFoundException fe) {
            fe.printStackTrace();
        }

        Scanner read = null;
        try{
            read = new Scanner (new File(in_file));
        } catch (FileNotFoundException fe){
           fe.printStackTrace();
        }

        //specified delimiter above
        read.useDelimiter(delimiter);

        //init all the nested data
        JSONObject product;
        JSONObject root = new JSONObject();
        String text = "";
        String description = "";

        //10 wide skip the titles on the csv
        for(int i = 0; i < 10; i++){
            text = read.next();
            //System.out.println(text);//DEBUG
        }
        String purchaseData[] =
                {"PO_NO","ISSUE_DATE","REQUESTOR_DEPARTMENT", "DEPARTMENT_DESC","VENDOR_CODE",
                        "VENDOR_NAME","ITEM_DESC","PO_QUANTITY","UNIT_PRICE","ITEM_TOTAL_AMOUNT"};

        JSONArray purchases = new JSONArray();
        JSONObject purchase;
        int entryCount = 1;//track entries in the data
        while(entryCount < startEntry){
            for(int j = 0; j < 10; j++){
                if(read.hasNext()){
                    text = read.next();
                }
            }
            entryCount++;
        }

        while(read.hasNext() && (entryCount <= endEntry)){
            purchase = new JSONObject();

            purchase.put("ENTRY_ID", entryCount);
            for(int i = 0; i < 10; i++){
                purchase.put(purchaseData[i], 0);
                if(read.hasNext()){
                    text = read.next();
                    //System.out.println(text);//DEBUG
                    if(i == 0){
                        text = text.replace("\n","").replace("\r", "");
                    }
                    purchase.put(purchaseData[i], text);

                    //description
                    if(i == 6){
                        //System.out.println(text);//DEBUG
                        description = text;
                    }
                }
            }
            try{
                product = getGrouping(description);
                purchase.put("DESCRIPTOR", product.get("DESCRIPTOR"));
                purchase.put("PRODUCT_NAME", product.get("PRODUCT_NAME"));
            }catch (NullPointerException ne){
                System.out.println("***** ERROR AT ENTRY: " + entryCount);
                break;
            }


            //option 1 (nested)
            //purchase.put("PRODUCT", product);

            //option 2 (not nested)
//            purchase.put("DESCRIPTOR", product.get("DESCRIPTOR"));
//            purchase.put("PRODUCT_NAME", product.get("PRODUCT_NAME"));


            purchases.add(purchase);
            //System.out.println(product.get("Product"));//DEBUG
            //System.out.println(product.get("Descriptor"));//DEBUG
            //System.out.println(product);//DEBUG
            //writer.println(product);//if you want to write each entry separately. WARNING: This will not be in json format
            System.out.println("Entry: "+ entryCount);
            entryCount++;
        }
        root.put("PURCHASES", purchases);
        writer.println(root.toJSONString());

        writer.close();
    }
}

