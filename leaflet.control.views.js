L.Control.Views = L.Control.extend({
        options: {
                collapsed: true,
                position: 'topleft',
                text: '⚓',
                title: 'Views navigator',
                forceSeparateButton: false,
                vcLatLng: [52.03, 19.27],
                vcZoom: 6
        },

        initialize: function (views, options) {
                L.setOptions(this, options);
                this._views = {};
                for (var i in views) {
                        this._addView(views[i], i);
                }

        },
        onAdd: function (map) {
                this._initLayout();
                this._update();
                this._map = map;
                return this._container;
        },

        removeView: function (view, name) {
                delete this._views[L.stamp(view)];
                return this._update();
        },
        addView: function (view, name) {
                this._addView(view, name);
                return this._update();
        },
        reset: function (view, name) {
                this._views = {};
                return this._update();
        },
        _initLayout: function () {
                var className = 'leaflet-control-navigate', container;
                
                container = this._container = L.DomUtil.create('div', className);
                /*
                var toggler = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
                        toggler.href = '#';
                        toggler.title = 'Layers';
                        toggler.innerHTML = '⚓';
                */
                if (!L.Browser.touch) {
                        L.DomEvent
                                .disableClickPropagation(container)
                                .disableScrollPropagation(container);
                } else {
                        L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
                }                

                this._viewsList = L.DomUtil.create('div', className + '-list', this._container);
                return container;
        },

        _update: function () {
                if (!this._container) { return; }
                this._viewsList.innerHTML = '';
                var i, obj;

                for (i in this._views) {
                        obj = this._views[i];
                        this._createButton(obj);
                        /*this._addItem(obj);*/
                }

                return this;
        },    
        _addView: function (view, name) {
                var id = L.stamp(view);
                this._views[id] = {
                        view: view,
                        name: name
                };
        },    
        _createButton: function (obj) {
                var link = L.DomUtil.create('a', 'leaflet-control-navigate-item', this._viewsList);
                link.innerHTML = obj.name;
                link.href = '#';
                link.viewId = L.stamp(obj.view);
                
                L.DomEvent.on(link, 'click', function(){
                            view = this._views[link.viewId].view;
                            if(view.bounds){
                                this._map.fitBounds(view.bounds);
                            }else{
                                this._map.setView(view.center, view.zoom);
                            }
                        }, this);
                return link;
        },
});
/*
L.Map.addInitHook(function () {
        if (this.options.viewsControl) {
                this.viewsControl = L.control.views(this.options.viewsControlOptions);
                this.addControl(this.viewsControl);
        }
});
*/
L.control.views = function (options) {
        return new L.Control.Views(options);
};
