##Leaflet Contreol Views
Small pluggin to shift between views.

###Usage?

    themap = L.map('map');
    themap.setView([0,0],0);
    viewMenu = L.control.views().addTo(themap);

    var bruxelles = {
        'center': [[50.839226598386105,4.364662170410156]],
        'zoom': 12
    };
    var grenoble = {
        'bounds':[[45.068671318263945,5.5707550048828125],[45.27730236908757,5.8495330810546875]]
    };

    viewMenu.addView(bruxelles,'Bruxelles');
    viewMenu.addView(grenoble,'Grenoble');

