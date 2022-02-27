
import * as AWS from 'aws-sdk'

const configuration = {
    region: 'us-west-2',
    secretAccessKey: '6bsnPmaS98xagu8DlPW7ALPzn5ApWoRaF6u6szPZ',
    accessKeyId: 'AKIASDY5R5HSJHYTG47Z'
}

AWS.config.update(configuration)

const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = (tableName) => {
    var params = {
        TableName: tableName
    }

    docClient.scan(params, function (err, data) {
        if (!err) {
            console.log(data)
        } else {
            console.log(err);
        }
    })
}
