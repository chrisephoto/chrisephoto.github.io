resolution = 2; // 2 - standard, 4 - high res
loopTime = 60; //seconds
var currentPageURL,
    currentPage,
    nextPageURL,
    nextPage,
    domList1 = document.querySelectorAll("a[href*='view']"),
    domList2 = document.querySelectorAll(".boot_attr ul li:nth-child(2)");
for (x = domList1.length, y = domList2.length, issueList = new Array, i = 0; i < x; i += 2) tempString = domList1[i].href, issueList.push(tempString);
for (pageList = new Array, j = 0; j < y; j++) tempString = domList2[j].outerHTML, tempPages = tempString.replace(/\D/g, ""), pageList.push(tempPages);

function download(e, t, s) {
    setTimeout(function() {
        const i = document.createElement("a");
        i.href = e, p = "000000" + s, q = p.substring(p.length - 3, p.length), i.download = t + "_" + q, document.body.appendChild(i), i.click(), document.body.removeChild(i)
    }, 200 * s)
}

function generateURLs(e, t, s) {
    for (imageList = [], tempString = issueList[s], tempSplit = tempString.split("/"), issueNumber = tempSplit[5], issueNumberLong = "000000" + issueNumber, issueNumberFormatted = issueNumberLong.substring(issueNumberLong.length - 6, issueNumberLong.length), issueURL = issueNumberFormatted.substring(0, 3) + "/" + issueNumberFormatted.substring(3, 6), l = 1; l <= t; l++) imageList.push("https://lib.as-books.jp/book_html_ssl/000/" + issueURL + "/books/images/" + resolution + "/" + l + ".jpg")
}

function main(e) {
    setTimeout(function() {
        fntempString = issueList[e], fntempSplit = fntempString.split("/"), fnissueNumber = fntempSplit[5], fnissueNumberLong = "000000" + fnissueNumber, fnissueNumberFormatted = fnissueNumberLong.substring(fnissueNumberLong.length - 6, fnissueNumberLong.length), openedWindow = window.open(issueList[e]), generateURLs(issueList[e], pageList[e], e), setTimeout(function() {
            for (m = 0; m < imageList.length; m++) download(imageList[m], fnissueNumberFormatted, m)
        }, 1e4), setTimeout(function() {
            openedWindow.close()
        }, loopTime * 1e3 - 1e3)
    }, loopTime * 1e3 * e)
}

function run() {
    for (k = 0; k < issueList.length; k++) main(k)
}

setTimeout(function() {
    currentPageURL = document.URL
    currentPage = currentPageURL.substring(
        currentPageURL.lastIndexOf("?") + 1,
        currentPageURL.indexOf("&")
    );
    nextPageURL = document.querySelector(".pagination li:last-child a").href
    nextPage = nextPageURL.substring(
        nextPageURL.lastIndexOf("?") + 1,
        nextPageURL.indexOf("&")
    );
    run();
}, 1e3);

setTimeout(function() {
    if (nextPage != currentPage || currentPage === undefined) {
        var newWindow = window.open(nextPageURL);
        setTimeout(function() {
            const newScript = newWindow.document.createElement("script");
            newScript.src = "https://cdn.jsdelivr.net/gh/chrisephoto/AS-Books-Downloader@main/script.js";
            newWindow.document.head.appendChild(newScript);
        }, 5e3);
    };
}, loopTime * 1e3 * 31);
