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

    public static JSONObject getGrouping(String text){
        JSONObject group = new JSONObject();
        group.put("PRODUCT_NAME", 0);
        group.put("DESCRIPTOR", 0); //Do you want a json array???
        boolean consecutive = true;//capture consecutive nouns
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

                if(pos.matches("JJ") ||
                        pos.matches("NN") ||
                        pos.matches("NNS")||
                        pos.matches("NNP")||
                        pos.matches("NNPS")) { //extract nouns and adjectives only
                    //System.out.println(String.format("Print: word: [%s] pos: [%s] ne: [%s]", word, pos, ne));//DEBUG
                    //System.out.print(String.format(" %s", word));//DEBUG
                    //group += (String.format("%s ", word));
                    if((pos.matches("NN") ||
                            pos.matches("NNS")||
                            pos.matches("NNP")||
                            pos.matches("NNPS"))
                            && consecutive){   //capture consecutive nouns
                        //System.out.println();
                        //group.put("PRODUCT_NAME", String.format("%s ", word));
                        if(group.get("PRODUCT_NAME").equals(0)){
                            group.put("PRODUCT_NAME",String.format("%s ", word));
                        }
                        else {
                            group.put("PRODUCT_NAME",
                                    group.get("PRODUCT_NAME").toString().concat(String.format("%s ", word)));
                        }
                        noun_fill = true;
                    }
                    else if(pos.matches("JJ")){  //caputre adjectives
                        //System.out.println();
                        if(noun_fill){
                            consecutive = false;
                        }
                        if(group.get("DESCRIPTOR").equals(0)){
                            group.put("DESCRIPTOR", String.format("%s ", word));
                        }
                        else{
                            group.put("DESCRIPTOR",
                                    group.get("DESCRIPTOR").toString().concat(String.format("%s ", word)));
                        }
                    }
                    else{
                        if(noun_fill){
                            consecutive = false;
                        }
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



    public static void main(String[] args) {
        String in_file = "testdata";
        String out_file = "outdata";
        String delimiter = "\\|\\|";  // using || double pipe as delimiter

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

        read.useDelimiter(delimiter);

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
        int entryCount = 0;//track entries in the data

        while(read.hasNext()){
            purchase = new JSONObject();

            purchase.put("ENTRY_ID", ++entryCount);
            for(int i = 0; i < 10; i++){
                purchase.put(purchaseData[i], 0);
                if(read.hasNext()){
                    text = read.next();
                    //System.out.println(text);//DEBUG
                    purchase.put(purchaseData[i], text);

                    //description
                    if(i == 6){
                        //System.out.println(text);
                        description = text;
                    }
                }
            }
            product = getGrouping(description);

            //option 1 (nested)
            purchase.put("PRODUCT", product);

            //option 2 (not nested)
            //purchase.put("DESCRIPTOR", product.get("DESCRIPTOR"));
            //purchase.put("PRODUCT_NAME", product.get("PRODUCT_NAME"));


            purchases.add(purchase);
            //System.out.println(product.get("Product"));
            //System.out.println(product.get("Descriptor"));
            //System.out.println(product);
            //writer.println(product);
        }
        root.put("PURCHASES", purchases);
        writer.println(root.toJSONString());

        writer.close();
    }
}

