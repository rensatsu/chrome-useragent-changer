(_ => {
    chrome.webRequest.onBeforeSendHeaders.addListener(
        details => {
            for (let i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'User-Agent') {
                    const defaultUa = details.requestHeaders[i].value || '';

                    const webkit = defaultUa.match(/AppleWebKit\/[\d\.]+/)[0] || '';
                    const chrome = defaultUa.match(/Chrom(e|ium)\/[\d\.]+/)[0] || '';
                    const safari = defaultUa.match(/Safari\/[\d\.]+/)[0] || '';

                    if (typeof LinkOptions.settings.myUA != 'undefined' && LinkOptions.settings.myUA && LinkOptions.settings.myUA !== '') {
                        const newUa = LinkOptions.settings.myUA
                            .replace('%(webkit)', webkit)
                            .replace('%(chrome)', chrome)
                            .replace('%(safari)', safari);

                        details.requestHeaders[i].value = newUa;
                    }
                }
            }

            return {
                requestHeaders: details.requestHeaders
            };
        },
        {
            urls: ["<all_urls>"]
        },
        ["blocking", "requestHeaders"]
    );
})();
