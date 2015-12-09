var lds = {};


lds.io = io();


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
            if (o[this.name] !== undefined) {
                        if (!o[this.name].push) {
                                        o[this.name] = [o[this.name]];
                                    }
                        o[this.name].push(this.value || '');
                    } else {
                                o[this.name] = this.value || '';
                            }
        });
    return o;
};





lds.subscribe = (function() {

    'use strict'

    $('#institution_subscribe').on('click', function() {
        $.ajax({
            url: 'cadastro-instituicao',
            method: 'GET',
            success: function(data) {
                $('#content').html(data);
                $('#content').removeClass('empty');
            }
        });
    });

    $('#content').on('submit', 'form[name="formInstitution"]', function(event) {
        event.preventDefault();
        var body = $(this).serializeObject();

        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': body.address}, function(result, status) {
            if(status == google.maps.GeocoderStatus.OK) {
                body.geolocation = [];
                body.geolocation.push(result[0].geometry.location.lat());
                body.geolocation.push(result[0].geometry.location.lng());

                $.ajax({
                    url: 'cadastro-instituicao',
                    method: 'POST',
                    data: body,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data);
                        lds.io.emit('geolocation', body);
                        $('#content').empty();
                        $('#content').addClass('empty');
                    }
                });
            }
            else {
                alert("Não foi possível encontrar a localização:\n" + status);
                return ;
            }
        });

    });

})();
