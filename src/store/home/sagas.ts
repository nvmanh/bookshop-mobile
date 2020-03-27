import { takeLatest, call, put } from 'redux-saga/effects';
import { Types } from './types';
import actions, { author, book } from './actions';
import { fetchService } from '../fetchService';

function* bookService(action: ReturnType<typeof book>){
    const {payload} = action;
    try {
        const api = actions.fetchBook();
        yield* fetchService(api);
    } catch (error) {
        console.log('server', error);
    }
}

function* authorService(action: ReturnType<typeof author>){
    const {payload} = action;
    try {
        const api = actions.fetchAuthor();
        yield* fetchService(api);
    } catch (error) {
        console.log('server', error);
    }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(Types.book, bookService);
  yield takeLatest(Types.author, authorService);
}
