export declare const hashPassword: (plainPassword: string) => Promise<any>;
export declare const comparePass: (plainPassword: string, ValidPass: string) => Promise<any>;
export declare function paginateResponse(data: any, page: any, limit: any): {
    statusCode: string;
    data: any[];
    count: any;
    currentPage: any;
    nextPage: any;
    prevPage: number;
    totalPage: number;
};
