const fs = require('graceful-fs')
const pify = require('pify');

const rakdb = {}

rakdb.format = (payload) => {
    fs.writeFile(payload + ".json", '[]', function (err, data) {
        if (err) throw err;
    })
}

const yaz = pify(fs.writeFileSync)


rakdb.yenidb = (payload) => {
    try {
        fs.readFileSync(payload + '.json', 'utf8')

    } catch (error) {
        steno.writeFile(payload + ".json", '[]', function (err, data) {
            if (err) throw err;
        })
    }
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

const kaydet = (db, data) => {
    yaz(db + '.json', JSON.stringify(data, null, 2), function (err, data) {
        return 'Başarılı'
    })
}


rakdb.getir = (payload) => {
    const data = pify(fs).readFileSync(payload + '.json', 'utf8')
    var oldData = JSON.parse(data)
    try {
        return {
            veri: oldData,
            ekle: function (payload2) {
                try {
                    let databro = []
                    databro.push(payload2)
                    var yeniveri = addToObject(databro[0], '_id', JSON.stringify(Date.now()))
                    oldData.push(yeniveri)
                    kaydet(payload, oldData)
                    return databro
                } catch (err) {
                    //console.error(err)
                }
            },
            bul: function (params) {
                try {
                    const element = Object.keys(params)
                    const values = Object.values(params)
                    const index = oldData.map(a => a[element]).indexOf(values[0])
                    if (index < 0) {
                        return 'Bulunamadı'
                    }
                    return {
                        veri: oldData[index],
                        sok: function (paramss, params2) {
                            oldData[index][paramss].push(params2)
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index]
                        },
                        cikar: function (paramss, parmass2) {
                            const deger = String(parmass2)
                            if (deger === "[object Object]") {
                                var element = Object.keys(parmass2)
                                var value = Object.values(parmass2)
                                const idx = oldData[index][paramss].map(a => a[element]).indexOf(value[0])
                                if (idx < 0) {
                                    return 'Kardeşim bu bulunamadı'
                                }
                                oldData[index][paramss].splice(idx, 1)
                            } else {
                                const idx = oldData[index][paramss].map(a => a).indexOf(deger)
                                if (idx < 0) {
                                    return 'Kardeşim bu bulunamadı'
                                }
                                oldData[index][paramss].splice(idx, 1)
                            }
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                 if (err) console.error(err)
                             })
                            return oldData[index]
                        },
                        güncelle: function (element, value) {
                            const oldVeri = oldData[index]
                            var yeniveri = addToObject(oldVeri, element, value)
                            oldData[index] = yeniveri
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return yeniveri
                        },
                        sil: function (element, value){
                            oldData.splice(index, 1)
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return 'Başarılı Şekilde silindi';
                        }
                    }
                } catch (error) {

                }
            },
            idbul: function (params) {
                try {
                    const index = oldData.map(a => a._id).indexOf(params)
                    if (index < 0) {
                        return 'Bulunamadı'
                    }
                    return {
                        veri: oldData[index],
                        sok: function (paramss, params2) {
                            oldData[index][paramss].push(params2)
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return oldData[index]
                        },
                        cikar: function (paramss, parmass2) {
                            const deger = String(parmass2)
                            if (deger === "[object Object]") {
                                var element = Object.keys(parmass2)
                                var value = Object.values(parmass2)
                                const idx = oldData[index][paramss].map(a => a[element]).indexOf(value[0])
                                if (idx < 0) {
                                    return 'Kardeşim bu bulunamadı'
                                }
                                oldData[index][paramss].splice(idx, 1)
                            } else {
                                const idx = oldData[index][paramss].map(a => a).indexOf(deger)
                                if (idx < 0) {
                                    return 'Kardeşim bu bulunamadı'
                                }
                                oldData[index][paramss].splice(idx, 1)
                            }
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                 if (err) console.error(err)
                             })
                            return oldData[index]
                        },
                        güncelle: function (element, value) {
                            const oldVeri = oldData[index]
                            oldData.splice(index, 1)
                            var yeniveri = addToObject(oldVeri, element, value)
                            oldData[index] = yeniveri
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return yeniveri
                        },
                        sil: function (element, value){
                            oldData.splice(index, 1)
                            yaz(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                                if (err) console.error(err)
                            })
                            return 'Başarılı Şekilde silindi';
                        }
                    }
                } catch (err) {
                    console.error(err)
                    fs.writeFileSync(payload + '.json', JSON.stringify(oldData, null, 2), function (err, data) {
                        if (err) throw err;
                    })
                }
            },
            icindemi: function (key, value) {
                const index = oldData.map(a => a[key]).includes(value)
                return index
            }
        }
    } catch (err) {
        yaz(payload + ".json", JSON.stringify(oldData), function (err, data) {
            if (err) throw err;
        })
    }
}


module.exports = rakdb;