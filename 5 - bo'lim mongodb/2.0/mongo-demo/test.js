// 1. Ko'rsatkich (normalization) -->   mofiqlik Consistency

let author = {
    _id: 123,
    firstName: 'IslomUmar',
    lastName: 'Tilovov',
}

let book = {
    _id: 566,
    title: 'JavaScript asoslari',
    // bu narsa author ga ko'rsatkich bo'lib turubti
    author: 123
}

// 2. Biriktirish (denormalization) --> tezlikni beradi Performance
let book2 = {
    _id: 456,
    title: 'NodeJs asoslarni to\'plami',
    author: {
        _id: 123,
        firstName: 'IslomUmar',
        lastName: 'Tilovov',
    }
}

// 3. 1va2larning catishmasi(hybrid)
let book3 = {
    _id: 456,
    title: 'NodeJs asoslarni to\'plami',
    author: {
        _id: 123,
        firstName: 'IslomUmar',
    }
}

let order = {
    dateTime: '',
    product={
        _id: 446,
        name: 'laptop',
        price: 10
    }
}
// buni kengi unitlarnida amaly mashqlarda ko'rish mumkin