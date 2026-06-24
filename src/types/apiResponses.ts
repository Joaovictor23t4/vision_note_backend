export type ApiSuccessDTO = {
    timestamp: string;
    code: number;
    httpStatus: string;
    status: string;
    data: unknown[] | unknown | true;
}

export type ApiErrorDTO = {
    timestamp: string;
    code: number;
    httpStatus: string;
    status: string;
    message: string
}