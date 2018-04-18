const $ = require('jquery');

function rss(setState, url, stateStr) {
    $.ajax(url, {
        accepts: {
            xml: "application/rss+xml"
        },
        dataType: 'xml'
    })
    .done(function (response) {
        if (response) {
            let unparsedItems = Array.from(response.querySelectorAll('item'));
            let image = response.querySelector('image').querySelector('url').textContent;
            let items = unparsedItems.map(function (i) {
                return {
                    'title': i.querySelector('title').textContent,
                    'url': i.querySelector('link').textContent,
                    'description': i.querySelector('description').textContent.replace(/<img[^>]*>/g, ""),
                    'image': image,
                    'pubDate': i.querySelector('pubDate').textContent,
                    'isFavorite': false
                }
            });
            setState(stateStr, items);
        }
    });
}

export default rss;