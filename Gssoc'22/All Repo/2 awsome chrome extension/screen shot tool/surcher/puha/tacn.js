class tesmMera {
    evs() {
        let leWasImi = this;
        chrome.storage.local.get(null, function(result) {
            const { mango, duplaBi } = result;
            leWasImi.mango = mango;
            leWasImi.duplaBi = duplaBi;
            document.getElementById('duplaBi').textContent = leWasImi.duplaBi;
        });
    }
    
    constructor() {
        this.mango = null;
        this.duplaBi = null;
        this.evs();
        document.getElementById('takeIt').addEventListener('click', function() {
            chrome.runtime.sendMessage({method: 'takeIt'})
        });
    }
}

new tesmMera();