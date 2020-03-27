import {
    createAction,
    createFetchAction,
    Method,
} from 'iron-redux';
import { Types } from './types';
import API from '../../config/Apis';

/**
 |--------------------------------------------------
 | DEFINE REDUCER ACTION INTERFACE
 |--------------------------------------------------
 */
export interface FetchBookData {
    data: PageBookContent,
    status: number,
    timestamp: string,
    path: string
}

export interface PageBookContent {
    content: Array<Book>,
    totalPages: number,
    totalElements: number,
    size: number,
    numberOfElements: number
}

export interface Book {
    id: number,
    name: string,
    price: number,
    thump: string,
    cover: string,
    shortDescription: string,
    description: string,
    status: string,
}

export interface FetchBookRes<T> {
    data: T,
    status: number,
    timestamp: string,
    path: string
}

export interface FetchBookReq {
    pageNo: number,
    pageSize: number,
    descending: boolean,
    sortBy?: string,
    author?: string,
}
const fetchBook = createFetchAction(Types.fetchBook, API.book, Method.Get)<FetchBookReq, FetchBookRes<FetchBookData>>('fetchBook');

export interface FetchAuthorRes {
    data: string,
}
export interface FetchAuthorReq {
    pageNo: number,
    pageSize: number,
}

const fetchAuthor = createFetchAction(Types.fetchAuthor, API.author, Method.Get)<FetchAuthorReq, FetchAuthorRes>('fetchAuthor');

// fetch state
const clearFetchBook = createAction(Types.clearFetchBook)();

const clearFetchAuthor = createAction(Types.clearFetchAuthor)();

export default {
    fetchBook,
    fetchAuthor,
    clearFetchAuthor,
    clearFetchBook,
};

/**
 |--------------------------------------------------
 | DEFINE SERVICE ACTION INTERFACE
 |--------------------------------------------------
 */

export const book = createAction(Types.book)<FetchBookReq>();
export const author = createAction(Types.author)<FetchAuthorReq>();