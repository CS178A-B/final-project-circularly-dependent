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
        //System.out.print("]");
    }
}