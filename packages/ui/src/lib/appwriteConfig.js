// Web SDK
import { Client, Account } from 'appwrite'

const client = new Client()
    .setEndpoint('<appwrite-api-endpoint>') // API Endpoint
    .setProject('<appwrite-project-id>') // project ID

const account = new Account(client)

export { account }
export { ID } from 'appwrite'
