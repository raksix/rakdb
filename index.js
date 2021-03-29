const fs = require('fs');
const rakdb = {}

rakdb.yenidb = (payload) => {
    fs.writeFile(payload + ".json", '[]', function (err, data) {
        if (err) throw err;
    })
}


rakdb.getir = (payload) => {
    try {
        const data = fs.readFileSync(payload + '.json', 'utf8')
        return {
            veri: JSON.parse(data),
            ekle: function (payload2) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    let databro = [{ _id: [], data: [] }]
                    databro[0].data.push(payload2)
                    databro[0]._id.push(JSON.stringify(Date.now()))
                    oldData.push(databro)
                    fs.writeFile(payload + '.json', JSON.stringify(oldData), function (err, data) {
                        if (err) console.error(err)
                        return 'Başarılı'
                    })
                    return databro
                } catch (err) {
                    console.error(err)
                }
            },
            sil: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params)
                    oldData.splice(index, 1)
                    if (index < 0) {
                        return 'Kardeşim bu bulunamadı'
                    }
                    fs.writeFile(payload + '.json', JSON.stringify(oldData), function (err, data) {
                        if (err) console.error(err)
                    })
                    return 'Başarılı Şekilde silindi';
                } catch (err) {
                    console.error(err)
                }
            },
            bul: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params)
                    return oldData[index]
                } catch (err) {
                    console.error(err)
                }
            },
            degistir: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params)
                    return 'güncellerim sonra aq'
                } catch (err) { }
            }
        }
    } catch (err) {
        console.error(err)
    }
}



module.exports = rakdb;