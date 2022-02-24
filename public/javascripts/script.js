var mymap = L.map('map', {
 center: [48.866667, 2.333333],
 zoom: 4
}
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mymap);

var cities = document.getElementsByClassName('list-group-item');

for(let i=0; i<cities.length; i++) {
    var lon = cities[i].dataset.lon
    var lat = cities[i].dataset.lat
    var cityname = cities[i].dataset.cityname

  var marker = L.marker([lat,lon],).addTo(mymap).bindPopup(cityname);
}