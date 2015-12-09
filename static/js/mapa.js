lds["map"] = (function(){
    var map;
    var initMap = errorMap;
    var distancia = 7;
    $(function() {
        var sliderui = $( "#slider-vertical" ).slider({
          orientation: "vertical",
          range: "min",
          min: 0,
          max: 100,
          value: 7,
          slide: function( event, ui ) {
            distancia = Number(($( "#amount" ).val( ui.value )).val());
            setTimeout(verifyGeo, 1500);
          }
        });
        $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
    });

    function verifyGeo() {
        if(navigator) {
            $('#institution_subscribe').removeAttr('disabled');
            return navigator.geolocation.getCurrentPosition(successMap, errorMap);
        }
        errorMap();
    }
 
    function errorMap() {
        $('.slider').css({"display": "none"});
        var loc = new Object();
        loc.coords = {latitude: -30.058860, longitude: -51.167885};
        loc.distancia = 50;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: loc.coords.latitude, lng: loc.coords.longitude},
            zoom: 12
        });
        
        getLocations(loc, createMarkers);
    }

    function successMap(loc) {
        $('.slider').css({"display": "inline"});
        loc.distancia = distancia;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: loc.coords.latitude, lng: loc.coords.longitude},
            zoom: 12
        });
        var marker = new google.maps.Marker({
                map: map,
                position: {lat: loc.coords.latitude, lng: loc.coords.longitude},
                title: "Usuário",
                icon: './img/usuario.png'

        });
        getLocations(loc, createMarkers);
        
    }
    
    function createMarkers(data) {
        data.instituicoes.forEach(marker);
    }


    function marker(instituicao) {
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
    }
    
    
    function getLocations(loc, callback){
        var result = {lat: loc.coords.latitude, lng: loc.coords.longitude, dist: loc.distancia};
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
            $('#welcome').remove();
            
            $('#content').empty();
            $('#content').addClass('empty');

            return Number($(this).attr('data-permicao')) ? verifyGeo() : errorMap();
        });
    
    });

    lds.io.on('saved_geo', function(data) {
        marker(data);
    });
    
    return {
        initMap: initMap,
        createMarkers: createMarkers
    };
})();

