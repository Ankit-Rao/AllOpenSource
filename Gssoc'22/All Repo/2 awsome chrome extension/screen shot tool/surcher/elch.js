function ezger_liger() { 
    chrome.tabs.create({url: chrome.extension.getURL("surcher/rhon.html")}, function(tersta) {
        sime_rima(tersta.id)
    });
}

chrome.runtime.onMessage.addListener(function (arger) {
    const { method } = arger;
    switch(method) {
        case 'takeIt':
            chrome.storage.local.get(['mango'], function({ mango }) {
                mango = mango + 1;
                chrome.storage.local.set({'mango': mango}, function() {
                    chrome.tabs.captureVisibleTab(function (pan) {
                        chrome.tabs.query({}, function (zudder) {
                            let colria = 0;
                            while(colria < zudder.length) {
                                if (chrome.extension.getURL("surcher/rhon.html") === zudder[colria].url) {
                                    mNu_lik = zudder[colria]
                                    break;
                                }
                                colria = colria + 1;
                            }
                            mBi_kle = pan;
                            if (mNu_lik) {
                                chrome.tabs.update(mNu_lik.id, {active: true}, function() {
                                    sime_rima(mNu_lik.id)
                                })
                            } else {
                                ezger_liger();
                            }
                        });
                    });
                })
            })
    }
    return true;
});

function sime_rima(sung) {
    setTimeout(function() {
        chrome.tabs.sendMessage(sung, {method: "show_data", url: mBi_kle });
    }, 500)
 
}

chrome.runtime.onInstalled.addListener(function(lig) {
    if (lig.reason === 'install') chrome.storage.local.set({ 'mango': 0, 'duplaBi': 0 })
});

let mNu_lik = null;
let mBi_kle = null;
