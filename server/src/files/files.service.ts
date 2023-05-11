import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fsp from 'fs/promises';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    private async isDirectoryExists(filepath: string): Promise<void> {
        try {
            await fsp.access(filepath, fsp.constants.F_OK);
        } catch (_err) {
            await fsp.mkdir(filepath);
        }
    }

    async createFile(file: Express.Multer.File): Promise<string> {
        try {
            const filename = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static');
            await this.isDirectoryExists(filePath);
            await fsp.writeFile(path.join(filePath, filename), file.buffer);
            return filename;
        } catch (_err) {
            throw new HttpException('error :(', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
