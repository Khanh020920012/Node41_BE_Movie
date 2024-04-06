import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ResponseService {
  // Utility function to handle responses
  sendResponse(data: any, statusCode: number, message: string) {
    return {
      statusCode: statusCode,
      message: message,
      data: data,
    };
  }

  // Function to throw a bad request exception
  throwBadRequestException(message: string) {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
