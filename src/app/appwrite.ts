import { Client, TablesDB } from 'appwrite';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6aa7c8c70001e00f8287');

export const tablesDB = new TablesDB(client);

export const databaseId = '6aa7c92c000862cc62b1';
export const blogPostsTableId = '6aa7ca0900265650d29a';