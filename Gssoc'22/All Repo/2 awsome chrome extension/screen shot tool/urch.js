function fench_groumer() {
    if (gerCher_cher.bgtor.bel_velr.dumMunaf) {
        gerCher_cher.bgtor.bel_velr.dumMunaf = false;
        gerCher_cher.eeCs.isDrawingMode = !gerCher_cher.eeCs.isDrawingMode;
        $('#siNger').parent().addClass('resRepsa');
        $('#miGre').parent().addClass('resRepsa');
        $('#ziVel').parent().removeClass('resRepsa');
        $('#dismFre').parent().removeClass('resRepsa');
        $('#ubNier').parent().removeClass('resRepsa');
        $('#crop').parent().removeClass('resRepsa');
        $('.sedDe').removeClass('resRepsa');
    }
}

$('#ubNier').on('click', function() {
    fench_groumer();
    chrome.downloads.download({filename: 'new_img.png', url: gerCher_cher.eeCs.toDataURL()}, function() {
        chrome.storage.local.get('duplaBi', function({duplaBi}) {
            chrome.storage.local.set({'duplaBi': duplaBi + 1});
        });
    })
});

$('#ziVel').on('click', function() {
    fench_groumer();
    let surem = new fabric.IText('Enter text', { fontSize:22, left:20, top:20, radius:10, borderRadius: '25px', hasRotatingPoint: true });
    gerCher_cher.bgtor.zerver = [];
    $('#isReta').parent().removeClass('resRepsa');
    $('#secReta').parent().addClass('resRepsa');
    gerCher_cher.bgtor.curmTuir.push(surem);
    gerCher_cher.eeCs.add(surem).setActiveObject(surem);
    gerCher_cher.eeCs.renderAll()
});


$('#secReta').on('click', function() {
    fench_groumer();
    let searcher_ercher = gerCher_cher.bgtor.zerver[gerCher_cher.bgtor.zerver.length - 1];
    gerCher_cher.bgtor.zerver.splice(gerCher_cher.bgtor.zerver.length - 1, 1)
    if (!(gerCher_cher.bgtor.zerver.length > 0)) $('#secReta').parent().addClass('resRepsa');
    $('#isReta').parent().removeClass('resRepsa');
    if (searcher_ercher && searcher_ercher.hasOwnProperty('url')) {
        gerCher_cher.bgtor.curmTuir.push({width: gerCher_cher.bgtor.dist_gunas.width,height: gerCher_cher.bgtor.dist_gunas.height,url: gerCher_cher.bgtor.dist_gunas.toDataURL()});
        if (searcher_ercher.width > window.innerWidth * 0.85) {
            searcher_ercher.width = window.innerWidth * 0.85;
            searcher_ercher.height = window.innerHeight * 0.85;
        }
        if (gerCher_cher.bgtor.curmTuir.length === 0) $('.isReta').parent().addClass('resRepsa')
        fench_gr(searcher_ercher.url, searcher_ercher.width, searcher_ercher.height);
    } else {
        gerCher_cher.bgtor.curmTuir.push(searcher_ercher);
        gerCher_cher.eeCs.add(searcher_ercher).setActiveObject(searcher_ercher);
        gerCher_cher.eeCs.renderAll()
    }
});

function fench_dir(pesma_re) {
    fabric.Image.fromURL(pesma_re, function(rer_re) {
        rer_re.set({selectable: false,hasRotatingPoint: false,objectCaching: false});
        gerCher_cher.bgtor.dist_gunas = rer_re
        gerCher_cher.eeCs.add(rer_re);
        gerCher_cher.eeCs.hoverCursor = 'default';
        gerCher_cher.eeCs.renderAll();
    });
}

$('#crop').on('click', function() {
    fench_groumer();
    if ($(this).attr('src') === '/surcher/puha/den/geiser.png') {
        gerCher_cher.bgtor.bel_velr.grent = true;
        gerCher_cher.bgtor.zerver = [];
        if (gerCher_cher.bgtor.curmTuir.length > 0) gerCher_cher.bgtor.curmTuir.push({ width: gerCher_cher.bgtor.dist_gunas.width, height: gerCher_cher.bgtor.dist_gunas.height, url: gerCher_cher.bgtor.dist_gunas.toDataURL()})
        gerCher_cher.dsCaxzzx = {
            width: gerCher_cher.bgtor.dist_gunas.width,
            height: gerCher_cher.bgtor.dist_gunas.height,
            url: gerCher_cher.eeCs.toDataURL()
        }
        gerCher_cher.bgtor.curmTuir.push(gerCher_cher.dsCaxzzx)
        let pulch = []
        for (let gadni = 0; gadni < gerCher_cher.bgtor.curmTuir.length; gadni++) {
            if(gerCher_cher.bgtor.curmTuir[gadni].hasOwnProperty('url')) pulch.push(gerCher_cher.bgtor.curmTuir[gadni])
        }
        gerCher_cher.bgtor.curmTuir = pulch;
        if (gerCher_cher.dsCaxzzx.width > window.innerWidth * 0.85) {
            gerCher_cher.dsCaxzzx.width = window.innerWidth * 0.85;
            gerCher_cher.dsCaxzzx.height = window.innerHeight * 0.85;
        }
        fench_gr(gerCher_cher.dsCaxzzx.url, gerCher_cher.dsCaxzzx.width, gerCher_cher.dsCaxzzx.height)
        gerCher_cher.banvZZu(true, true, true, false, true, true, true, true);
        $('.sedDe').addClass('resRepsa');
        $(this).attr("src", '/surcher/puha/ults/hi.png');
        $('#dismFre').attr("src", '/surcher/puha/ults/rrt.png');
    } else {
        if (gerCher_cher.bgtor.bel_velr.glevber_de && !gerCher_cher.bgtor.distTrikas) {
            return;
        }
        if (gerCher_cher.bgtor.bel_velr.glevber_de) {
            gerCher_cher.bgtor.dist_gunas.cropX = gerCher_cher.bgtor.distTrikas.left;
            gerCher_cher.bgtor.dist_gunas.cropY = gerCher_cher.bgtor.distTrikas.top;
            gerCher_cher.bgtor.dist_gunas.width = gerCher_cher.bgtor.distTrikas.width;
            gerCher_cher.bgtor.dist_gunas.height = gerCher_cher.bgtor.distTrikas.height;
            gerCher_cher.bgtor.dist_gunas.left = gerCher_cher.bgtor.distTrikas.left;
            gerCher_cher.bgtor.dist_gunas.top = gerCher_cher.bgtor.distTrikas.top;
            gerCher_cher.bgtor.bel_velr.glevber_de = false;
            $('.isReta').parent().removeClass('resRepsa');
            gerCher_cher.bgtor.zerver = [];
            $('.secReta').parent().addClass('resRepsa')
            fench_gr(gerCher_cher.bgtor.dist_gunas.toDataURL(), gerCher_cher.bgtor.distTrikas.width, gerCher_cher.bgtor.distTrikas.height);
        }
        $('#ziVel').parent().removeClass('resRepsa');
        $('#ubNier').parent().removeClass('resRepsa');
        $('.sedDe').removeClass('resRepsa');
        $(this).attr("src", '/surcher/puha/den/geiser.png');
        $('#dismFre').attr("src", '/surcher/puha/den/masamo.png');
    }
})

$('#siNger').on('change', function() { 
    gerCher_cher.eeCs.freeDrawingBrush.width = parseInt($(this).val(), 10) ? parseInt($(this).val(), 10) : 1;
})


$('#miGre').on('change', function() {
    gerCher_cher.eeCs.freeDrawingBrush.color = $(this).val();
    if (gerCher_cher.eeCs.freeDrawingBrush.getPatternSrc) gerCher_cher.eeCs.freeDrawingBrush.source = gerCher_cher.eeCs.freeDrawingBrush.getPatternSrc.call(gerCher_cher.eeCs.freeDrawingBrush);
})

function fench_gr(disma, froas, greias) {
    document.getElementsByClassName('canvas-container')[0].remove();
    let esm = document.createElement('canvas');
    esm.setAttribute('id', 'dudrek');
    document.getElementsByClassName('wrapper')[0].prepend(esm);
    gerCher_cher.banvVihu(froas, greias);
    fench_dir(disma);
}


$('#dismFre').on('click', function() {     
    if ($(this).attr('src') === '/surcher/puha/ults/rrt.png') {
        $('.secReta').parent().addClass('resRepsa')
        $('#ziVel').parent().removeClass('resRepsa');
        $('#ubNier').parent().removeClass('resRepsa');
        $('.sedDe').removeClass('resRepsa');
        $(this).attr("src", '/surcher/puha/den/masamo.png');
        $('#crop').attr("src", '/surcher/puha/den/geiser.png');
        $('#crop').parent().removeClass('resRepsa');

        gerCher_cher.bgtor.curmTuir.pop();
        if (gerCher_cher.bgtor.curmTuir.length === 0) {
            $('#isReta').parent().addClass('resRepsa');
        } else {
            $('#isReta').parent().removeClass('resRepsa');
        }
        gerCher_cher.bgtor.zerver = [];
        gerCher_cher.bgtor.distTrikas.visible = false;
        gerCher_cher.bgtor.distTrikas.selectable = false;
        gerCher_cher.bgtor.distTrikas = null;
        gerCher_cher.eeCs.renderAll();
    } else {
        gerCher_cher.eeCs.isDrawingMode = !gerCher_cher.eeCs.isDrawingMode;
        gerCher_cher.bgtor.bel_velr.dumMunaf = true;
        gerCher_cher.bgtor.bel_velr.beBerBas = false;
        gerCher_cher.eeCs.freeDrawingBrush.color = $('#miGre').val();
        gerCher_cher.eeCs.freeDrawingBrush.width = parseInt($('#siNger').val(), 10) || 1;
        gerCher_cher.bgtor.zerver = [];
        $(this).parent().addClass('resRepsa');
        if (!($('#secReta').parent().hasClass('resRepsa'))) {
            $('#secReta').parent().addClass('resRepsa');
        }
        $('#siNger').parent().removeClass('resRepsa');
        $('#miGre').parent().removeClass('resRepsa');
        $('.sedDe').addClass('resRepsa');
    }
})

$('#isReta').on('click', function() {
    fench_groumer();
    let searcher_ercher = gerCher_cher.bgtor.curmTuir.pop();
    $('#secReta').parent().removeClass('resRepsa');
    if (searcher_ercher && searcher_ercher.hasOwnProperty('url')) {
        gerCher_cher.bgtor.zerver.push({width: gerCher_cher.bgtor.dist_gunas.width,height: gerCher_cher.bgtor.dist_gunas.height,url: gerCher_cher.bgtor.dist_gunas.toDataURL()});
        if (searcher_ercher.width > window.innerWidth * 0.85) {
            searcher_ercher.width = window.innerWidth * 0.85;
            searcher_ercher.height = window.innerHeight * 0.85;
        }
        if (gerCher_cher.bgtor.curmTuir.length === 0) $(this).parent().addClass('resRepsa');
        fench_gr(searcher_ercher.url, searcher_ercher.width, searcher_ercher.height);
    } else {
        gerCher_cher.bgtor.zerver.push(searcher_ercher);
        gerCher_cher.eeCs.remove(searcher_ercher);
        gerCher_cher.eeCs.renderAll();
        if (gerCher_cher.bgtor.curmTuir.length === 0) $(this).parent().addClass('resRepsa');
    }
});
