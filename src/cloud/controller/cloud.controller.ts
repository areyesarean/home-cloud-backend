import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  destinationFile,
  fileFilter,
  renameImage,
  proccessRoute,
} from '../functions/cloud.functions';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { promises, mkdirSync } from 'fs';

@Controller('cloud')
export class CloudController {
  @Post('upload/:route')
  @UseInterceptors(
    FilesInterceptor('files', 3, {
      storage: diskStorage({
        destination: destinationFile,
        filename: renameImage,
      }),
      fileFilter: fileFilter,
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File,
    @Res() res: Response,
  ) {
    const logger = new Logger();
    logger.log('Files upload successfull');
    return res.status(HttpStatus.OK).json({
      message: 'Files is Saves',
      files: files.filename,
    });
  }

  @Get(':route?')
  async showFolder(@Param() route: string, @Res() res: Response) {
    route = route['route'];
    const dirPath = proccessRoute(route);
    const content = { files: [], directories: [] };

    try {
      const dir = await promises.opendir(dirPath);
      for await (const dirent of dir) {
        if (dirent.isDirectory()) {
          content.directories.push(dirent.name);
        } else {
          content.files.push(dirent.name);
        }
      }
    } catch (error) {
      console.error(error);
    }

    return res.json({
      path: dirPath,
      content,
    });
  }

  @Get('mkdir/:route?')
  createFolder(@Param() route: string, @Res() res: Response) {
    route = route['route'];
    const dirPath = proccessRoute(route);
    try {
      mkdirSync(dirPath, { recursive: true });
      const logger = new Logger();
      logger.log('Folder create successfull');
      return res.json({
        path: dirPath,
        folderName: route.split('-').pop(),
      });
    } catch (error) {
      console.log('ERROR', error);
    }
  }
}
