
import * as AWS from 'aws-sdk'

export const fetchData = async (tableName) => {

    const access = process.env.REACT_APP_ACCESS_KEY
    const secret = process.env.REACT_APP_SECRET_KEY
    const configuration = {
        region: 'us-west-2',
        secretAccessKey: secret,
        accessKeyId: access
    }

    AWS.config.update(configuration)

    const docClient = new AWS.DynamoDB.DocumentClient()

    var params = {
        TableName: tableName
    }

    try {
        let promise = await docClient.scan(params).promise()
        console.log(promise.Items)
        var myData = promise.Items[promise.Items.length - 1]
        //console.log(myData)
    } catch (err) {
        console.log(err);
    }
    return myData;
}
