import { Controller, Post, Body, Get } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('MongoDB')
@Controller('/mongodb') 
export class MongodbController {
  constructor(private readonly mongodbService: MongodbService) {}

  @Post('/connect') 
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' }
      },
      required: ['connectionString']
    }
  })
  async connectToMongoDB(@Body() connectionInfo: { connectionString: string }) {
    const connectionString = connectionInfo.connectionString;
    await this.mongodbService.connectToMongodb(connectionString);
    return { message: 'Connection established successfully' };
  }

  @Post('/collections')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' }
      },
      required: ['connectionString']
    }
  })
  async listCollections(@Body() connectionInfo: { connectionString: string }) {
    return await this.mongodbService.allCollections(connectionInfo.connectionString);
  }

  @Post('/findMany')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' },
        queryOptions: { type: 'object' },
      },
      required: ['connectionString', 'queryOptions']
    }
  })
  async findAll(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.findDocuments(connectionInfo.connectionString, connectionInfo.queryOptions);
  }

  @Post('/insert')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' },
        queryOptions: { type: 'object' },
      },
      required: ['connectionString', 'queryOptions']
    }
  })
  async insertOne(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.insertDocument(connectionInfo.connectionString, connectionInfo.queryOptions);
  }

  @Post('/update')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' },
        queryOptions: { type: 'object' },
      },
      required: ['connectionString', 'queryOptions']
    }
  })
  async updateOne(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.updateDocument(connectionInfo.connectionString, connectionInfo.queryOptions);
  }

  @Post('/delete')
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        connectionString: { type: 'string' },
        queryOptions: { type: 'object' },
      },
      required: ['connectionString', 'queryOptions']
    }
  })
  async deleteOne(@Body() connectionInfo: { connectionString: string, queryOptions: any }) {
    return await this.mongodbService.deleteDocument(connectionInfo.connectionString, connectionInfo.queryOptions);
  }
}