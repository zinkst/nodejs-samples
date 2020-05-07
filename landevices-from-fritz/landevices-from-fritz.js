const fs = require('fs')
const path = require('path')

function extractLandevices() {
    var fbConfig
    // fs.readFile('./fritzbox_config.json', 'utf8', (err, jsonString) => {
    //     if (err) {
    //         console.log("File read failed:", err)
    //         return
    //     }
    //     try {
    //         fbConfig = JSON.parse(jsonString)
    //     } catch (err) {
    //         console.log('Error parsing JSON string:', err)
    //     }
    // })
    const workDir="/links/Gemeinsam/Burghalde/HeimNetz/FritzBox-6591/"
    var srcFile = path.join(workDir, 'fritzbox_config.json')
    try {
        const jsonString = fs.readFileSync(srcFile)
        fbConfig = JSON.parse(jsonString)
    } catch (err) {
        console.log(err)
        return
    }
    let landevices = fbConfig.landevices.landevices
    let landevices_formatted = []
    for (let index = 0; index <= 34; index++) {
        let element = landevices[index];
        let new_entry = { "name": element.name, "mac": element.mac }
        landevices_formatted.push(new_entry)
    }
    const landevicesJsonString = JSON.stringify(landevices_formatted, null, 2)
    // console.log(landevicesJsonString)
    
    var tgtFile = path.join(workDir, 'landevices.json')
    fs.writeFile(tgtFile, landevicesJsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

extractLandevices()