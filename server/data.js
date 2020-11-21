const { getCurves } = require('crypto')
const fs = require('fs')

class DeepCapitalizer {

    getCSV() {
        let path = './RS-20170701-20190630.csv'
        let content = fs.readFileSync(path, 'utf8')
        console.log(content)
    }

}

exports.DeepCapitalizer = DeepCapitalizer