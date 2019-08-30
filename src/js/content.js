(_ => {
    chrome.storage.sync.get({
        myUA: ''
    }, items => {
        setUa = items.myUA;

        if (setUa && setUa !== '') {
            const t = document.createElement("script");

            const defaultUa = navigator.userAgent || '';

            const webkit = defaultUa.match(/AppleWebKit\/[\d\.]+/)[0] || '';
            const chrome = defaultUa.match(/Chrom(e|ium)\/[\d\.]+/)[0] || '';
            const safari = defaultUa.match(/Safari\/[\d\.]+/)[0] || '';

            const ua = setUa
                .replace('%(webkit)', webkit)
                .replace('%(chrome)', chrome)
                .replace('%(safari)', safari);

            t.type = "text/javascript";
            t.text = `navigator.__defineGetter__('userAgent', _ => '${ua}');`;

            if (document.head) {
                document.head.appendChild(t);
            } else if (document.body) {
                document.body.appendChild(t);
            } else if (document.documentElement) {
                document.documentElement.appendChild(t);
            }
        }
    });
})();
