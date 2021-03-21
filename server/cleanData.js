function preProcess(data) {
  let reg = new RegExp('to release funds against a blanket po [0-9]+ to pay invoice no. [0-9]+');
  if (reg.test(data.toLowercase())) {
    data = data.replace(reg, "");
  }
}

function postProcess(data) {
  let thisData = data

  if (thisData.DESCRIPTOR == 0) {
    thisData.DESCRIPTOR = "";
  }

  thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.toString();
  if (thisData.PRODUCT_NAME.charAt(0) === '.') thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.slice(1);
  if (thisData.PRODUCT_NAME.charAt(0) === '%') thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.slice(1);
  if (thisData.PRODUCT_NAME.charAt(0) === '~') thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.slice(1);
  if (thisData.PRODUCT_NAME.charAt(0) === '#') thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.slice(1);

  thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.replace(/(\\\*)+/, "");


  if (thisData.PRODUCT_NAME.indexOf(" ") === 0) thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.slice(1);
  thisData.PRODUCT_NAME = thisData.PRODUCT_NAME.replace(/\d\d\\\//, "");

  if (thisData.PRODUCT_NAME === '0') thisData.PRODUCT_NAME = 'Misc.';
  if (thisData.PRODUCT_NAME === 'GLOVE') thisData.PRODUCT_NAME = 'GLOVES';

  // console.log(thisData.ENTRY_ID, thisData.PRODUCT_NAME.charAt(0) !== '.')
  
  thisData.REQUESTOR_DEPARTMENT = Number(thisData.REQUESTOR_DEPARTMENT);
  thisData.ITEM_DESC = (thisData.ITEM_DESC).replace("\"\\\"", "");
  thisData.ITEM_DESC = (thisData.ITEM_DESC).replace("\"", "");
  thisData.ITEM_DESC = thisData.ITEM_DESC.replace(/  |\r\n|\n|\r/gm, '');
  
  thisData.UNIT_PRICE = (thisData.UNIT_PRICE).replace(/\D/g,'');
  thisData.UNIT_PRICE = Number(thisData.UNIT_PRICE);

  thisData.ITEM_TOTAL_AMOUNT = (thisData.ITEM_TOTAL_AMOUNT).replace(/\D/g,'');
  thisData.ITEM_TOTAL_AMOUNT = Number(thisData.ITEM_TOTAL_AMOUNT);
  
  thisData.PO_NO = (thisData.PO_NO).replace("\n", "");
  thisData.PO_NO = (thisData.PO_NO).replace(/\D/g,'');
  thisData.PO_NO = Number(thisData.PO_NO);

  thisData.ISSUE_DATE = (thisData.ISSUE_DATE).split(" ")[0];
  thisData.ISSUE_DATE = (thisData.ISSUE_DATE).replace("\\", "");
  thisData.ISSUE_DATE = (thisData.ISSUE_DATE).replace("/", "-");
  let year = thisData.ISSUE_DATE.substr(thisData.ISSUE_DATE.length - 4);
  thisData.ISSUE_DATE = (thisData.ISSUE_DATE).slice(0, -5);
  if (thisData.ISSUE_DATE.charAt(2) != "-") thisData.ISSUE_DATE = "0" + thisData.ISSUE_DATE;
  if (thisData.ISSUE_DATE.charAt(4) == "-") thisData.ISSUE_DATE = thisData.ISSUE_DATE.slice(0, 2) + "0" + thisData.ISSUE_DATE.slice(2, -1);
  thisData.ISSUE_DATE = year + "-" + thisData.ISSUE_DATE;

  thisData.VENDOR_CODE = (thisData.VENDOR_CODE).replace("V", "");
  thisData.VENDOR_CODE = Number(thisData.VENDOR_CODE);

  thisData.PO_QUANTITY = (thisData.PO_QUANTITY).replace(/\D/g,'');
  thisData.PO_QUANTITY = Number(thisData.PO_QUANTITY);


  return thisData;
}

module.exports = { preProcess, postProcess };
