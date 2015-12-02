lds["map"] = (function(){
    var map;
    var initMap = errorMap;


    function verifyGeo() {
        if(navigator) {
            return navigator.geolocation.getCurrentPosition(successMap, errorMap);
        }
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

    $(window).on('load', function() {
    
        $('.permicao').on('click', function() {
            return Number($(this).attr('data-permicao')) ? verifyGeo() : errorMap();
        });
    
    });
    
    return {
        initMap: initMap,
        createMarkers: createMarkers
    };
})();

