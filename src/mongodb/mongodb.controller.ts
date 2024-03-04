import { Controller, Post, Body, Get } from '@nestjs/common';
import { MongodbService } from './mongodb.service';

@Controller('/mongodb') 
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}

  @Post('/connect') 
  async connectToMongoDB(@Body() connectionInfo: { connectionString: string }) {
    const connectionString = connectionInfo.connectionString;
    await this.mongodbService.connectToMongodb(connectionString);
    return { message: 'Connection established successfully' };
  }

  @Post('/collections')
  async listCollections(@Body() connectionInfo: { connectionString: string }) {
    return await this.mongodbService.allCollections(connectionInfo.connectionString);
  }

  @Post('/findMany')
  async findAll(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.findDocuments(connectionInfo.connectionString, connectionInfo.queryOptions);
  }

  @Post('/insert')
  async insertOne(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.insertDocument(connectionInfo.connectionString, connectionInfo.queryOptions);
  }

  @Post('/update')
  async updateOne(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.updateDocument(connectionInfo.connectionString, connectionInfo.queryOptions);
  }

  @Post('/delete')
  async deleteOne(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.deleteDocument(connectionInfo.connectionString, connectionInfo.queryOptions);
  }
}