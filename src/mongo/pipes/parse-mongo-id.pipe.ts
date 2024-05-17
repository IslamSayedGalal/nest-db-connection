import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    const isValidMongoId = /^[0-9a-fA-F]{24}$/.test(value);
    if (!isValidMongoId) {
      throw new BadRequestException(`Invalid mongo id: ${value}`);
    }
    return value;
  }
}