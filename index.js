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
        const veriman = JSON.parse(data)
        return {
            veri: veriman,
            ekle: function (payload2) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    let databro = [{ _id: [], data: [] }]
                    databro[0].data.push(payload2)
                    databro[0]._id.push(JSON.stringify(Date.now()))
                    oldData.push(databro)
                    fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                        return 'Başarılı'
                    })
                    return databro
                } catch (err) {
                    //console.error(err)

                }
            },
            bul: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    console.log(params)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params[0]._id[0])
                    return {
                        veri: oldData[index][0],
                        sok: function(paramss){
                            oldData[index][0].data.push(paramss)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index][0]
                        },
                        cikar: function(err, paramss){
                            const anan = oldData[index].map(a => a.data).includes({ anal: 'sex' })
                            console.log(oldData[index][0].data.findIndex(a => a === paramss))
                            return anan
                        }
                    }
                } catch (error) {

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
                    fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                        if (err) console.error(err)
                    })
                    return 'Başarılı Şekilde silindi';
                } catch (err) {
                    //console.error(err)
                }
            },
            idbul: function (params) {
                try {
                    const data = fs.readFileSync(payload + ".json", "utf-8")
                    var oldData = JSON.parse(data)
                    const index = oldData.map(a => a[0]._id[0]).indexOf(params)

                    return {
                        veri: oldData[index][0],
                        degistir: function (param) {
                            try {
                                const array = []
                                array.push(param)
                                oldData[index][0].data = array
                                fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                    if (err) console.error(err)
                                })
                                return oldData[index][0]
                            } catch (err) { 

                            }
                        },
                        sok: function(param) {
                            oldData[index][0].data.push(param)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index][0]
                        }
                    }
                } catch (err) {
                    console.error(err)
                    fs.writeFileSync(payload + '.json', JSON.stringify(veriman, null, 2), function (err, data) {
                        if(err) throw err;
                    })
                }
            },
        }
    } catch (err) {
        //console.error(err)
        
    }
}



module.exports = rakdb;