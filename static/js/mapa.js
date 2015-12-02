lds["map"] = (function(){
    var map;
    var initMap = errorMap;
    
    if (navigator) {
        navigator.geolocation.getCurrentPosition(successMap, errorMap);
    }
    else{
        errorMap();
    }
 
    function errorMap() {
        var loc = new Object();
        loc.coords = {latitude: -30.058860, longitude: -51.167885};
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: loc.coords.latitude, lng: loc.coords.longitude},
            zoom: 12
        });
        
        getLocations(loc, createMarkers);
    }

    function successMap(loc) {
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: loc.coords.latitude, lng: loc.coords.longitude},
                zoom: 12
            });
            
            getLocations(loc, createMarkers);
        
    }
    
    function createMarkers(data) {
        
        data.instituicoes.forEach(function(instituicao) {
            instituicao.mylatlong = {lat: instituicao.geolocation[0], lng: instituicao.geolocation[1]};
            instituicao.marker = new google.maps.Marker({
                map: map,
                position: instituicao.mylatlong,
                title: instituicao.name
            });
            
            var contentString = '<h2>'+ instituicao.name +'</h2>' +
                '<p>Endereço: '+instituicao.address+'</p>'+
                '<p>Telefone: '+instituicao.phone+'</p>';
            var infowindow = new google.maps.InfoWindow({
                content: contentString,
                maxWidth: 600
            });
            google.maps.event.addListener(instituicao.marker, 'click', function() {
                infowindow.open(map,instituicao.marker);
            });
        });
    }
    
    
    function getLocations(loc, callback){
        var result = {lat: loc.coords.latitude, lng: loc.coords.longitude};
        $.ajax({
            url: "instituicao/proximos",
            data: result,
            method: "GET",
            dataType: "json",
            success: callback
        });
        //$.get( "instituicao/proximos", localizacao)
        //    .done(callback);
    }
    
    return {
        initMap: initMap,
        createMarkers: createMarkers
    };
})();

