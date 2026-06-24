import { FastifyInstance } from "fastify";
import { INoteRepository, Note } from "../interfaces/notes";
import { NoteCreateDTO, NoteUpdateDTO } from "../types/notes";
import { ErrorReturn } from "../interfaces/global";

export class NoteRepository implements INoteRepository {
    private app: FastifyInstance;

    constructor(app: FastifyInstance) {
        this.app = app;
    }

    async findAll(): Promise<Note[]> {
        return await this.app.prisma.note.findMany();
    }
    async findById(id: string): Promise<Note | null> {
        const note = await this.app.prisma.note.findUnique({
            where: { id }
        });

        return note;
    }
    async create(id: string, note: NoteCreateDTO): Promise<Note | ErrorReturn> {
        try {
            const newNote = await this.app.prisma.note.create({
                data: {id, ...note}
            });
            return newNote;
        } catch(e) {
            const error: ErrorReturn = {
                name: e instanceof Error ? e.name : String(e),
                status: "CREATE_ERROR",
                message: e instanceof Error ? e.message : String(e)
            };
            return error;
        }
    }
    async update(id: string, note: NoteUpdateDTO): Promise<Note | ErrorReturn> {
        try {
            const updateNote = await this.app.prisma.note.update({
                where: { id },
                data: note
            });
            return updateNote;
        } catch(e) {
            const error: ErrorReturn = {
                name: e instanceof Error ? e.name : String(e),
                status: "UPDATE_ERROR",
                message: e instanceof Error ? e.message : String(e)
            };
            return error;
        }
    }
    async delete(id: string): Promise<Boolean | ErrorReturn> {
        try {
            await this.app.prisma.note.delete({
                where: { id }
            });
            return true;
        } catch(e) {
            const error: ErrorReturn = {
                name: e instanceof Error ? e.name : String(e),
                status: "UPDATE_ERROR",
                message: e instanceof Error ? e.message : String(e)
            };
            return error;
        }
    }
}