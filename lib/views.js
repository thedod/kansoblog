/**
 * Show functions to be exported from the design doc.
 */
exports.blogposts_by_created = {
    map: function (doc) {
        if (doc.type === 'blogpost') {
            emit(doc.created, doc.title);
        }
    }
};
exports.escaped_by_created = {
    map: function (doc) {
        if (doc.type === 'blogpost') {
            emit(doc.created, escape(doc.text));
        }
    }
};
