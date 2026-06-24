import { Note } from "../interfaces/notes";
import { NoteRepository } from "../repositories/notes";
import { NoteCreateDTO, NoteRetrieveDTO, NoteUpdateDTO } from "../types/notes";
import { ErrorReturn } from "../interfaces/global";
import { FindByIdDTO } from "../types/global";
import { randomUUID } from "node:crypto";

export class NoteService {
    private repository: NoteRepository;

    constructor(repository: NoteRepository) {
        this.repository = repository;
    }

    async findAll(): Promise<Note[]> {
        return await this.repository.findAll();
    }

    async findById(dto: FindByIdDTO): Promise<NoteRetrieveDTO | null> {
        const note: Note | null = await this.repository.findById(dto.id); 
        if (note == null) {
            return null;
        }
        return this.toRetrieveDTO(note);
    }

    async create(note: NoteCreateDTO): Promise<NoteRetrieveDTO | ErrorReturn> {
        const id: string = randomUUID();

        const newNote = await this.repository.create(id, note);

        if ('status' in newNote) {
            return newNote;
        }
        
        return this.toRetrieveDTO(newNote);
    }

    async update(id: string, note: NoteUpdateDTO): Promise<NoteRetrieveDTO | ErrorReturn> {
        const updateNote = await this.repository.update(id, note);

        if ('status' in updateNote) {
            return updateNote;
        }
        return this.toRetrieveDTO(updateNote);
    }

    async delete(id: string): Promise<Boolean | ErrorReturn> {
        return await this.repository.delete(id);
    }

    private toRetrieveDTO(note: Note): NoteRetrieveDTO {
        return {
            id: note.id,
            title: note.title,
            content: note.content,
            created_at: note.created_at.toISOString(),
            updated_at: note.updated_at.toISOString()
        }
    }
}