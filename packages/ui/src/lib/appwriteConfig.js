// Web SDK
import { Client, Account } from 'appwrite'

const client = new Client()
    .setEndpoint('<appwrite_api_endpoint>') // API Endpoint
    .setProject('<appwrite_project_id>') // project ID

const account = new Account(client)

export { account }
export { ID } from 'appwrite'
