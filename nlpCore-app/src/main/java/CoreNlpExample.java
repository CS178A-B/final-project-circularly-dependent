import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.util.CoreMap;

import java.util.*;


public class CoreNlpExample {

    public static void main(String[] args) {
        // creates a StanfordCoreNLP object, with POS tagging, lemmatization, NER, parsing, and coreference resolution
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, pos, lemma, ner, parse, dcoref");
        StanfordCoreNLP pipeline = new StanfordCoreNLP(props);

        // read some text in the text variable
        String text = "Hello, my first name is Jason. Using my green compact car," +
                " I drove to the store yesterday and bought some paleo groceries.";

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

                if(pos.matches("JJ") || pos.matches("NN") || pos.matches("NNS")) { //extract nouns only
                    //System.out.println(String.format("Print: word: [%s] pos: [%s] ne: [%s]", word, pos, ne));
                    System.out.print(String.format(" %s", word));
                    if(pos.matches("NN") || pos.matches("NNS")){
                        System.out.println();
                    }
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
    //(Optional) args[2]:
    //              This optional value is the range entry specifier. This value
    //              if specified is the last entry this generator will process.
    //              If not specified this program will default to a constant
    //              value int endEntry.
    public static void main(String[] args) {

        String in_file = null;
        String out_file = null;
        //Check args[] make sure we have 2 or 3.
        if(args.length == 2 || args.length == 3){
            in_file = args[0];
            out_file = args[1];
        } else{
            System.out.println("Json generator requires 2 to 3 arguments to be specified");
            return;
        }
        System.out.println(in_file + " " + out_file);
//        in_file = "testdata";
//        out_file = "outdata.txt";
        // using || double pipe as delimiter. This is the delimiter of the input data
        String delimiter = "\\|\\|";


        //Partitioning functionality: these 2 variables are for if we want to process a section of data from the csv
        int startEntry = 1;//this is not the exact cell in the csv. In the csv the exact cell is off by +1
        //ie: to specify cell 21 in the csv, type in 20.

        //This is the max entry. If args[2] is not specified then this value will be the default value.
        //If we want to attempt the entire file make this number very high, like 1000000
        //There is control in place for overextending this value so don't worry
        int endEntry = 10;//excluded entry
        //get last argument if it is specified
        if(args.length == 3){
            endEntry = Integer.parseInt(args[2]);
        }
        //to stop at entry 33, type in 34, this will be 34 in the csv so this will be the exact cell in the csv

        //Generic Read and Write to file
        PrintWriter writer = null;
        try {
            writer = new PrintWriter(out_file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        Scanner read = null;
        try{
            read = new Scanner (new File(in_file));
        } catch (FileNotFoundException e){
            e.printStackTrace();
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
