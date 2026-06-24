import { FastifyReply, FastifyRequest } from "fastify";
import { Note } from "../interfaces/notes";
import { NoteCreateDTO, NoteRetrieveDTO, NoteUpdateDTO } from "../types/notes";
import { NoteService } from "../services/notes";
import { ApiErrorDTO, ApiSuccessDTO } from "../types/apiResponses";
import { FindByIdDTO } from "../types/global";
import { ErrorReturn } from "../interfaces/global";

export class NoteController {
    constructor(private service: NoteService) {}

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        const notes: Note[] = await this.service.findAll();

        const response: ApiSuccessDTO = {
            timestamp: new Date().toISOString(),
            code: 200,
            httpStatus: "OK",
            status: "SUCCESS",
            data: notes
        }
        return reply.status(200).send(response);
    }
    async findById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const dto: FindByIdDTO = {
            id: request.params.id
        }
        const note: NoteRetrieveDTO | null = await this.service.findById(dto);

        if (note == null) {
            const response: ApiSuccessDTO = {
                timestamp: new Date().toISOString(),
                code: 200,
                httpStatus: "OK",
                status: "SUCCESS",
                data: {}
            }
            return reply.status(200).send(response);
        }

        const response: ApiSuccessDTO = {
            timestamp: new Date().toISOString(),
            code: 200,
            httpStatus: "OK",
            status: "SUCCESS",
            data: note
        };
        return reply.status(200).send(response);
    }
    async create(request: FastifyRequest<{ Body: { title: string, content: string } }>, reply: FastifyReply) {
        const dto: NoteCreateDTO = {
            title: request.body.title,
            content: request.body.content,
        };

        const note: NoteRetrieveDTO | ErrorReturn = await this.service.create(dto);

        if ('status' in note) {
            const response: ApiErrorDTO = {
                timestamp: new Date().toISOString(),
                code: 400,
                httpStatus: "BAD_REQUEST",
                status: note.status,
                message: note.message
            }
            return reply.status(400).send(response);
        }

        const response: ApiSuccessDTO = {
            timestamp: new Date().toISOString(),
            code: 201,
            httpStatus: "CREATED",
            status: "SUCCESS",
            data: note
        }
        return reply.status(201).send(response);
    }

    async update(request: FastifyRequest<{ Body: { title?: string, content?: string}, Params: { id: string } }>, reply: FastifyReply) {
        const dto: NoteUpdateDTO = {
            title: request.body.title,
            content: request.body.content
        }

        const note: NoteRetrieveDTO | ErrorReturn = await this.service.update(request.params.id, dto);

        if ('status' in note) {
            const response: ApiErrorDTO = {
                timestamp: new Date().toISOString(),
                code: 400,
                httpStatus: "BAD_REQUEST",
                status: note.status,
                message: note.message
            }
            return reply.status(400).send(response);
        }

        const response: ApiSuccessDTO = {
            timestamp: new Date().toISOString(),
            code: 200,
            httpStatus: "OK",
            status: "SUCCESS",
            data: note
        }
        return reply.status(200).send(response);
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const hasDelete: Boolean | ErrorReturn = await this.service.delete(request.params.id);
        
        if (typeof hasDelete != "boolean" && 'status' in hasDelete) {
            const response: ApiErrorDTO = {
                timestamp: new Date().toISOString(),
                code: 400,
                httpStatus: "BAD_REQUEST",
                status: hasDelete.status,
                message: hasDelete.message
            }
            return reply.status(400).send(response);
        }
        const response: ApiSuccessDTO = {
            timestamp: new Date().toISOString(),
            code: 200,
            httpStatus: "OK",
            status: "SUCCESS",
            data: true
        }
        return reply.status(200).send(response);
    }
}