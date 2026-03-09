sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"booksdemo/test/integration/pages/BooksList",
	"booksdemo/test/integration/pages/BooksObjectPage"
], function (JourneyRunner, BooksList, BooksObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('booksdemo') + '/test/flpSandbox.html#booksdemo-tile',
        pages: {
			onTheBooksList: BooksList,
			onTheBooksObjectPage: BooksObjectPage
        },
        async: true
    });

    return runner;
});

