class furiGurma {

    banvVihu(dun, un) {
        this.eeCs = new fabric.Canvas('dudrek', {width: dun,height: un});
        this.tustUnb();
    }

    tuchtaYnbu_si() {
        let dezd = this;
        if (dezd.bgtor.bel_velr.grent) {
            if(dezd.bgtor.bel_velr.cench) {
                dezd.bgtor.bel_velr.cench = false;
                let parsetara = dezd.eeCs.getActiveObject();
                dezd.bgtor.bel_velr.grent = false;
                dezd.bgtor.bel_velr.glevber_de = true;
                $('#crop').parent().removeClass('resRepsa');
                dezd.eeCs.add(parsetara); 
                dezd.eeCs.renderAll();
            }
        } else if (dezd.bgtor.bel_velr.dumMunaf) {
            dezd.eeCs.off('mouse:up')
            let tuitel = dezd.eeCs.getObjects();
            dezd.bgtor.curmTuir.push(dezd.eeCs.getObjects()[dezd.eeCs.getObjects().length-1]);
            let tt = 0;
            while (tt < tuitel.length) {
                tuitel[tt].selectable = false;
                tt = tt + 1;
            }
            if (dezd.bgtor.curmTuir.length > 0) $('#isReta').parent().removeClass('resRepsa');
        } else {
            return false;
        } 
    }

    banvZZu(aevg, vb, db, fb, zeng, usmer, binj, jokals) {
        aevg ? $(this.lbo[0]).addClass('resRepsa') : $(this.lbo[0]).removeClass('resRepsa')
        vb ? $(this.lbo[1]).addClass('resRepsa') : $(this.lbo[1]).removeClass('resRepsa')
        db ? $(this.lbo[2]).addClass('resRepsa') : $(this.lbo[2]).removeClass('resRepsa')
        fb ? $(this.lbo[3]).addClass('resRepsa') : $(this.lbo[3]).removeClass('resRepsa')
        zeng ? $(this.lbo[4]).addClass('resRepsa') : $(this.lbo[4]).removeClass('resRepsa')
        usmer ? $(this.lbo[5]).addClass('resRepsa') : $(this.lbo[5]).removeClass('resRepsa')
        binj ? $(this.lbo[7]).addClass('resRepsa') : $(this.lbo[7]).removeClass('resRepsa')
        jokals ? $(this.lbo[8]).addClass('resRepsa') : $(this.lbo[8]).removeClass('resRepsa')
    }

    tustUnb() {
        let dezd = this;
        dezd.eeCs.on('mouse:down', function(mdilas) { 
            dezd.eeCs.on('mouse:up', dezd.tuchtaYnbu_si)
            if (!dezd.bgtor.bel_velr.grent) return false;
            let pangen = dezd.eeCs.getObjects();
            let tt = 0;
            while(tt < pangen.length) {
                pangen[tt].selectable = false;
                tt = tt + 1;
            }
            let ster = dezd.eeCs.getPointer(mdilas.e);
            dezd.bgtor.bel_velr.cench = true;
            dezd.voVure_tyrui = ster.x;
            dezd.voVure_ilt = ster.y;
            dezd.bgtor.distTrikas = new fabric.Rect({ width: 0, height: 0, left: dezd.voVure_tyrui, top: dezd.voVure_ilt,fill: 'transparent',strokeDashArray: [3, 6],stroke: '#000',});
            dezd.eeCs.add(dezd.bgtor.distTrikas); 
            dezd.eeCs.renderAll();
            dezd.eeCs.setActiveObject(dezd.bgtor.distTrikas); 
        });
        dezd.eeCs.on('mouse:move', function(gen) { 
            if(!dezd.bgtor.bel_velr.cench || !dezd.bgtor.bel_velr.grent) return false;
            let abse = dezd.eeCs.getPointer(gen.e);
            if (!Math.abs(abse.x - dezd.voVure_tyrui) || !Math.abs(abse.y - dezd.voVure_ilt)) return false;
            let parsetara = dezd.eeCs.getActiveObject(); 
            parsetara.set('width', Math.abs(abse.x - dezd.voVure_tyrui)).set('height', Math.abs(abse.y - dezd.voVure_ilt));
            dezd.eeCs.renderAll(); 
        });
    }

    gimnNuem() {
        let isfFgtre = document.createElement('div');
        isfFgtre.classList.add('panel');
        document.body.appendChild(isfFgtre);
        let diabloOli = document.createElement('div');
        diabloOli.classList.add('actions');
        isfFgtre.appendChild(diabloOli); 
        let ttggera = document.createElement('div');
        ttggera.classList.add('resRepsa');
        diabloOli.appendChild(ttggera);
        let omkkams = document.createElement('img');
        omkkams.src = '/surcher/puha/den/afro.png'
        omkkams.classList.add('isReta');
        omkkams.setAttribute('id', 'isReta');
        ttggera.appendChild(omkkams);
        this.lbo.push(ttggera);
        let plokKi = document.createElement('div');
        plokKi.classList.add('resRepsa');
        diabloOli.appendChild(plokKi);
        let secReta = document.createElement('img');
        secReta.src = '/surcher/puha/den/aupo.png'
        secReta.classList.add('secReta');
        secReta.setAttribute('id', 'secReta');
        plokKi.appendChild(secReta);
        this.lbo.push(plokKi);
        let wwsa = document.createElement('div');
        diabloOli.appendChild(wwsa);
        let download_action = document.createElement('img');
        download_action.src = '/surcher/puha/den/trenas.png'
        download_action.classList.add('ubNier');
        download_action.setAttribute('id', 'ubNier');
        wwsa.appendChild(download_action);
        this.lbo.push(wwsa);
        let buNk = document.createElement('div');
        buNk.classList.add('sedDe');
        isfFgtre.appendChild(buNk);
        let tger_unias = document.createElement('div');
        tger_unias.classList.add('instruments');
        isfFgtre.appendChild(tger_unias); 
        let qasQas = document.createElement('div');
        tger_unias.appendChild(qasQas);
        let Qudiala = document.createElement('img');
        Qudiala.src = '/surcher/puha/den/masamo.png'
        Qudiala.classList.add('dismFre');
        Qudiala.setAttribute('id', 'dismFre');
        qasQas.appendChild(Qudiala);
        this.lbo.push(qasQas);
        let vuvBnera = document.createElement('div');
        tger_unias.appendChild(vuvBnera);
        let mm = document.createElement('img');
        mm.src = '/surcher/puha/den/geiser.png'
        mm.classList.add('crop');
        mm.setAttribute('id', 'crop');
        vuvBnera.appendChild(mm);
        this.lbo.push(vuvBnera);
        let ccxz = document.createElement('div');
        tger_unias.appendChild(ccxz);
        let dslera = document.createElement('img');
        dslera.src = '/surcher/puha/den/desma.png'
        dslera.classList.add('ziVel');
        dslera.setAttribute('id', 'ziVel');
        ccxz.appendChild(dslera);
        this.lbo.push(ccxz);
        let bes = document.createElement('div');
        bes.classList.add('resRepsa');
        tger_unias.appendChild(bes);
        let bis = document.createElement('input');
        bis.type = 'color';
        bis.classList.add('miGre');
        bis.setAttribute('id', 'miGre');
        bes.appendChild(bis);
        this.lbo.push(bes);
        let blask = document.createElement('div');
        blask.classList.add('resRepsa');
        blask.classList.add('width_block');
        tger_unias.appendChild(blask);
        let blixk = document.createElement('input');
        blixk.type = 'range';
        blixk.value = '5';
        blixk.classList.add('siNger');
        blixk.setAttribute('id', 'siNger');
        blask.appendChild(blixk);
        this.lbo.push(blask);
    }

    constructor() {
        this.lbo = [];
        chrome.runtime.onMessage.addListener(function (aevg) {
            if (aevg.method === 'show_data') {
                new Promise(function (resolve) {
                    let baber = new Image()
                    baber.src = aevg.url
                    baber.addEventListener('load', function() {
                      let testrasda = document.createElement('canvas')
                      testrasda.width = baber.width
                      testrasda.height = baber.height
                      let num = testrasda.getContext('2d')
                      num.drawImage(baber, 0, 0, window.innerWidth * 0.85, window.innerHeight * 0.85)
                      resolve(testrasda.toDataURL())
                    })
                  }).then(function(after_resize) {
                    fench_dir(after_resize);
                });
                return true;
            }
        });
        this.bgtor = {
            zerver: [],
            curmTuir: [],
            distTrikas: null,
            dist_gunas: null,
            bel_velr: {
                cench: false,
                grent: false,
                glevber_de: false,
                dumMunaf: false,
                beBerBas: false
            }

        };
        this.dsCaxzzx = null;
        this.voVure_tyrui = null;
        this.voVure_ilt = null;
        this.eeCs = null;
        this.banvVihu(window.innerWidth * 0.85, window.innerHeight * 0.85);
        this.gimnNuem();
        this.tustUnb();
        this.tuchtaYnbu_si = this.tuchtaYnbu_si.bind(this)
    }
}

let gerCher_cher = new furiGurma();