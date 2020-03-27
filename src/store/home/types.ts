import {
    composeTypes,
} from 'iron-redux';

/**
 * types
 */
const prefix = 'home/';

enum BasicTypes {
    book,
    author,
    clearFetchBook,
    clearFetchAuthor
}

enum FetchTypes {
    fetchBook,
    fetchAuthor,
}

const Types = composeTypes({
    prefix,
    BasicTypes,
    FetchTypes,
});

export { Types, prefix };
