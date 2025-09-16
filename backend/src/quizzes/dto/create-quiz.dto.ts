import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  text: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean; // default false
}

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsEnum(['BOOLEAN', 'INPUT', 'CHECKBOX'])
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  @ArrayMinSize(1)
  answers: CreateAnswerDto[];
}

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  @ArrayMinSize(1)
  questions: CreateQuestionDto[];
}
