lds["map"] = (function(){
    var map;
    var initMap = errorMap;
    
    if (navigator) {
        navigator.geolocation.getCurrentPosition(successMap, errorMap);
    }
    else{
        errorMap();
    }
 
    function errorMap(loc) {
        loc.coords.latitude = -30.058860;
        loc.coords.longitude = -51.167885;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: loc.coords.latitude, lng: loc.coords.longitude},
            zoom: 12
        });
        
        getLocations(loc, createMarkers);
    }

    function successMap(loc) {
        initMap = function(){
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: loc.coords.latitude, lng: loc.coords.longitude},
                zoom: 12
            });
            
            getLocations(loc, createMarkers);
        };
        
    }
    
    function createMarkers(instituicoes) {
        
        instituicoes.forEach(function(instituicao) {
            instituicao.mylatlong = {lat: instituicao.geolocation[0], lng: instituicao.geolocation[1]};
            instituicao.marker = new google.maps.Marker({
                map: map,
                position: instituicao.mylatlong,
                title: instituicao.name
            });
        });
    }
    
    function getLocations(loc, callback){
        var localizacao = [];
        localizacao.push(loc.coords.latitude);
        localizacao.puch(loc.coords.longitude)
        $.get( "instituicao/proximos", localizacao)
            .done(callback);
    }
    
    return {
        initMap: initMap,
        createMarkers: createMarkers
    };
})();

