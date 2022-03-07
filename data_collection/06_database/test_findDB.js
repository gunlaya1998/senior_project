//CRUD create read update delete
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectID

const connectionURL = 'mongodb://gun:0851100225@mars.mikelab.net:27017/?authSource=admin'
const databaseName = 'tourist_map'

// #--Edit your configuration here ------------------------------
// const username = urllib.parse.quote_plus('gun')
// const password = urllib.parse.quote_plus('0851100225')
// const auth_db = urllib.parse.quote_plus('admin')
// const server = urllib.parse.quote_plus('mars.mikelab.net')
// const port = urllib.parse.quote_plus('27017')
// #-------------------------------------------------------------
// clickstream_client = MongoClient(f'mongodb://{username}:{password}@{server}:{port}/?authSource={auth_db}')
// # clickstream_collection = clickstream_client['newsfeed2']
// tourist_collection = clickstream_client['tourist_map']

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connet to DB')
    }
    const db = client.db(databaseName)
    
    db.collection('Ranking_Province').findOne(
        {
            "provinceId": 1
        },(err, pid) => {
            if (err) {
                return console.log('Unable to fetch')
            }
            console.log(pid)
        }
    )

    db.collection('Ranking_Province').find({provinceId: 2}).toArray((err,pid) => {
        if(err) return console.log(err)
        console.log(pid)
    })

})