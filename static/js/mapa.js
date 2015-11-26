lds["map"] = (function(){
    var map;
    
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -30.058860, lng: -51.167885},
            zoom: 12
        });
        
        lds.map.createMarkers();
    }
    
    function createMarkers() {
        lds.instituicoes.forEach(function(instituicao) {
            instituicao.mylatlong = {lat: instituicao.geolocation[0], lng: instituicao.geolocation[1]};
            instituicao.marker = new google.maps.Marker({
                map: map,
                position: instituicao.mylatlong,
                title: instituicao.name
            });
        });
    }
    
    return {
        initMap: initMap,
        createMarkers: createMarkers
    };
})();

