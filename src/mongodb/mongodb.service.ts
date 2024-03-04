import { Injectable } from '@nestjs/common';
import { MongoClient, MongoClientOptions } from 'mongodb';
import { EJSON } from 'bson';

/* eslint-disable @typescript-eslint/no-var-requires */
const JSON5 = require('json5');

@Injectable()
export class MongodbService {
    parseEJSON(maybeEJSON?: string): any {
        if (!maybeEJSON) return {};

        return EJSON.parse(JSON.stringify(JSON5.parse(maybeEJSON)));
    }

    async connectToMongodb(connectionString: string) {
        const client = new MongoClient(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as MongoClientOptions);

        try {
            await client.connect();
            const db = client.db();
            console.log('Connected to MongoDB successfully');

            return db;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw new Error('Error connecting to MongoDB');
        }
    }

    async allCollections(connectionString: string) {
        const db = await this.connectToMongodb(connectionString);
        const result = await db.listCollections().toArray();
        return result;
    }

    async findDocuments(connectionString: string, queryOptions: any) {
        const db = await this.connectToMongodb(connectionString);
        const result = await db
            .collection(queryOptions.collection)
            .find(this.parseEJSON(queryOptions.filter), this.parseEJSON(queryOptions.options))
            .toArray();
        return result;
    }

    async insertDocument(connectionString: string, queryOptions: any) {
        const db = await this.connectToMongodb(connectionString);
        const result = await db
            .collection(queryOptions.collection)
            .insertOne(this.parseEJSON(queryOptions.document), this.parseEJSON(queryOptions.options));
        return result;
    }

    async updateDocument(connectionString: string, queryOptions: any) {
        const db = await this.connectToMongodb(connectionString);
        const result = await db
            .collection(queryOptions.collection)
            .updateOne(
                this.parseEJSON(queryOptions.filter),
                this.parseEJSON(queryOptions.update),
                this.parseEJSON(queryOptions.options)
            );
        return result;
    }

    async deleteDocument(connectionString: string, queryOptions: any) {
        const db = await this.connectToMongodb(connectionString);
        const result = await db
            .collection(queryOptions.collection)
            .deleteOne(this.parseEJSON(queryOptions.filter), this.parseEJSON(queryOptions.options));
        return result;
    }
}
