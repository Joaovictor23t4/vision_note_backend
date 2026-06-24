export type NoteCreateDTO = {
    title: string,
    content: string,
}

export type NoteRetrieveDTO = {
    id: string,
    title: string,
    content: string,
    created_at: string,
    updated_at: string
}

export type NoteUpdateDTO = {
    title?: string,
    content?: string
}