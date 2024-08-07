// Web SDK
import { Client, Account } from 'appwrite'

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // API Endpoint
    .setProject('66abe7c20017d2b09ddd') // project ID

const account = new Account(client)

export { account }
export { ID } from 'appwrite'
