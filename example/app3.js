function initialize() {

    var coords = [
{'lat' : '-19.909134', 'lon' : '-43.951838'},
{'lat' : '-19.909453', 'lon' : '-43.951822'},
{'lat' : '-19.909564', 'lon' : '-43.952082'},
{'lat' : '-19.909923', 'lon' : '-43.952578'},
{'lat' : '-19.909723', 'lon' : '-43.952738'},
{'lat' : '-19.909943', 'lon' : '-43.952844'},
{'lat' : '-19.91011', 'lon' : '-43.953016'},
{'lat' : '-19.910004', 'lon' : '-43.953185'},
{'lat' : '-19.91009', 'lon' : '-43.953567'},
{'lat' : '-19.91042', 'lon' : '-43.953295'},
{'lat' : '-19.910397', 'lon' : '-43.952985'},
{'lat' : '-19.910472', 'lon' : '-43.952794'},
{'lat' : '-19.910648', 'lon' : '-43.953102'},
{'lat' : '-19.910807', 'lon' : '-43.952894'},
{'lat' : '-19.91116', 'lon' : '-43.952878'},
{'lat' : '-19.911679', 'lon' : '-43.952534'},
{'lat' : '-19.911509', 'lon' : '-43.952155'},
{'lat' : '-19.911337', 'lon' : '-43.95231'},
{'lat' : '-19.911167', 'lon' : '-43.952136'},
{'lat' : '-19.911099', 'lon' : '-43.952459'},
{'lat' : '-19.910926', 'lon' : '-43.952563'},
{'lat' : '-19.910733', 'lon' : '-43.952234'},
{'lat' : '-19.910537', 'lon' : '-43.95229'},
{'lat' : '-19.910503', 'lon' : '-43.95251'},
{'lat' : '-19.910335', 'lon' : '-43.952121'},
{'lat' : '-19.909931', 'lon' : '-43.952002'}
    ];


    var centrePoint = new google.maps.LatLng(-19.910519, -43.952694);

    var mapOptions = {
        zoom: 17,
        center: centrePoint,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var poly;
    var polyHull;
    var convexHull = new ConvexHullGrahamScan();


    poly = new google.maps.Polygon({
        paths: coords.map(function(item){
            return new google.maps.LatLng(item.lat, item.lon);
        }),
        strokeColor: '#000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#000',
        fillOpacity: 0.1
    });


    coords.forEach(function (item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.lat, item.lon),
            map: map
        });
        convexHull.addPoint(item.lon, item.lat);
    });


    if (convexHull.points.length > 0) {
        var hullPoints = convexHull.getHull();



        //Convert to google latlng objects
        hullPoints = hullPoints.map(function (item) {
            return new google.maps.LatLng(item.y, item.x);
        });

        console.log(hullPoints);

        polyHull = new google.maps.Polygon({
            paths: hullPoints,
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000',
            fillOpacity: 0.35
        });

        polyHull.setMap(map);

    }
}

google.maps.event.addDomListener(window, 'load', initialize);