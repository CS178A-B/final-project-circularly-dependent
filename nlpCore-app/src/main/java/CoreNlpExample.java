//.xls Read, Excel 97-2003
//...


//Core NLP
import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.*;
import edu.stanford.nlp.util.CoreMap;

//other
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;
import org.json.JSONObject;
//import java.util.Scanner;


public class CoreNlpExample {

    public static JSONObject getGrouping(String text){
        JSONObject group = new JSONObject();
        group.put("Product", "");
        group.put("Descriptor", "");
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
                        //group.put("Product", String.format("%s ", word));
                        group.put("Product",
                                group.get("Product").toString().concat(String.format("%s ", word)));
                        noun_fill = true;
                    }
                    else if(pos.matches("JJ")){  //caputre adjectives
                        //System.out.println();
                        if(noun_fill){
                            consecutive = false;
                        }
                        group.put("Descriptor",
                                group.get("Descriptor").toString().concat(String.format("%s ", word)));
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
        String filename = "testdata";
        String delimiter = "\\|\\|";  // using || double pipe as delimiter

        Scanner read = null;
        try{
            read = new Scanner (new File(filename));
        } catch (FileNotFoundException e){
            e.printStackTrace();
        }

        read.useDelimiter(delimiter);

        String text = "";
        JSONObject group;

        for(int i = 1; i <= 16; i++){
            text = read.next();
        }
        //System.out.println(text);//DEBUG
        //group = getGrouping(text);
        //System.out.println(group);
        while(read.hasNext()){
            //System.out.println(text);//DEBUG
            group = getGrouping(text);
            //System.out.println(group.get("Product"));
            //System.out.println(group.get("Descriptor"));
            System.out.println(group);
            for(int i = 1; i <= 9; i++){
                if(read.hasNext()){
                    text = read.next();
                }
            }
        }

        // read some text in the text variable
//        String text = "Hello, my first name is Jason. Using my green compact car," +
//                " I drove to the store yesterday and bought some paleo groceries." +
//                " rubber gloves";
        //System.out.print("]");


    }
}

