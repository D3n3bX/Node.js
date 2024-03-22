// Creamos models donde importamos todos los models que tenemos, asi solo tenemos que importar este archivo
const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storageModel: require('./nosql/storage')
}

module.exports = models