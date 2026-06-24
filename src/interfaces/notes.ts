import { ErrorReturn } from "./global"
import { NoteCreateDTO, NoteUpdateDTO } from "../types/notes"

export interface Note {
    id: string,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date
}

export interface INoteRepository {
    findAll(): Promise<Note[]>
    findById(id: string): Promise<Note | null>
    create(id: string, note: NoteCreateDTO): Promise<Note | ErrorReturn>
    update(id: string, note: NoteUpdateDTO): Promise<Note | ErrorReturn>
    delete(id: string): Promise<Boolean | ErrorReturn>
}