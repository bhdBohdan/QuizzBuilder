import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createQuizDto: CreateQuizDto) {
    const { title, description, questions } = createQuizDto;

    const quiz = await this.prismaService.quiz.create({
      data: {
        title,
        description,
        questions: {
          create: questions.map((q) => ({
            text: q.text,
            type: q.type,
            answers: {
              create: q.answers.map((a) => ({
                text: a.text,
                isCorrect: a.isCorrect ?? false,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
            answers: {
              select: {
                id: true,
                text: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    });

    return quiz;
  }

  async findAll(take = 10, skip = 0) {
    return await this.prismaService.quiz.findMany({
      take,
      skip,

      include: {
        questions: {
          include: {
            answers: true,
            _count: true,
          },
        },
        _count: true,
      },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prismaService.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
            _count: true,
          },
        },
        _count: true,
      },
    });
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async remove(id: string) {
    const quiz = await this.findOne(id);
    await this.prismaService.quiz.delete({
      where: {
        id,
      },
    });

    return quiz.id;
  }
}
