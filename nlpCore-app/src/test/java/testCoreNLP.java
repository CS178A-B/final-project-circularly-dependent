import org.json.simple.JSONObject;
import org.junit.Test;
import static org.junit.Assert.*;

public class testCoreNLP {
    @Test
    public void testDescription(){
        JSONObject test = new JSONObject();
        JSONObject against = new JSONObject();

        against.put("DESCRIPTOR", "cruel");
        against.put("PRODUCT_NAME", "world");

        test = CoreNlpExample.getGrouping("Hello cruel world");
        //System.out.println(test);
        assertEquals(test,against);
    }
}
