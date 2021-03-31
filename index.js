const fs = require('fs');
const rakdb = {}

rakdb.yenidb = (payload) => {
    fs.writeFile(payload + ".json", '[]', function (err, data) {
        if (err) throw err;
    })
}


var addToObject = function (obj, key, value, index) {

    var temp = {};
    var i = 0;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {

            if (i === index && key && value) {
                temp[key] = value;
            }

            temp[prop] = obj[prop];

            i++;

        }
    }

    if (!index && key && value) {
        temp[key] = value;
    }

    return temp;

};


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
                    const element = Object.keys(params)
                    const values = Object.values(params)
                    const index = oldData.map(a => a[0].data[0][element]).indexOf(values[0])
                    if (index < 0) {
                        return 'Bulunamadı'
                    }
                    return {
                        veri: oldData[index][0],
                        sok: function (paramss, params2) {
                            oldData[index][0].data[0][paramss].push(params2)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index][0]
                        },
                        cikar: function (paramss, parmass2) {
                            const cikarilacak = oldData[index][0].data
                            const element = Object.keys(parmass2)
                            const values = Object.values(parmass2)
                            const idx = cikarilacak[0][paramss].map(a => a[element]).indexOf(values[0])
                            if (idx < 0) {
                                return 'Kardeşim bu bulunamadı'
                            }
                            cikarilacak[0][paramss].splice(idx, 1)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return cikarilacak[0]
                        },
                        güncelle: function (element, value) {
                            const oldVeri = oldData[index][0].data[0]
                            oldData[index][0].data.splice(0, 1)
                            var yeniveri = addToObject(oldVeri, element, value)
                            oldData[index][0].data.push(yeniveri)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return yeniveri
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
                    if (index < 0) {
                        return 'Bulunamadı'
                    }
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
                        sok: function (paramss, params2) {
                            oldData[index][0].data[0][paramss].push(params2)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index][0]
                        },
                        cikar: function (paramss, parmass2) {
                            const cikarilacak = oldData[index][0].data
                            const element = Object.keys(parmass2)
                            const values = Object.values(parmass2)
                            const idx = cikarilacak[0][paramss].map(a => a[element]).indexOf(values[0])
                            if (idx < 0) {
                                return 'Kardeşim bu bulunamadı'
                            }
                            cikarilacak[0][paramss].splice(idx, 1)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return cikarilacak[0]
                        },
                        güncelle: function (element, value) {
                            const oldVeri = oldData[index][0].data[0]
                            oldData[index][0].data.splice(0, 1)
                            var yeniveri = addToObject(oldVeri, element, value)
                            oldData[index][0].data.push(yeniveri)
                            fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return yeniveri
                        }
                    }
                } catch (err) {
                    console.error(err)
                    fs.writeFileSync(payload + '.json', JSON.stringify(veriman, null, 2), function (err, data) {
                        if (err) throw err;
                    })
                }
            },
            icindemi: function(key, value) {
                const data = fs.readFileSync(payload + ".json", "utf-8")
                var oldData = JSON.parse(data)
                const index = oldData.map(a => a[0].data[0][key]).includes(value)
                return index
            }
        }
    } catch (err) {
        //console.error(err)

    }
}



module.exports = rakdb;