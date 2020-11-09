

var mymap = L.map('mapid').setView([0, 0], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2FtdWVsbmUiLCJhIjoiY2tnajRkanUxMDQycjJwbGx3cGF0a3MxNyJ9.TfMAFSO_KmPbKScxe371lw'
}).addTo(mymap);


$.getJSON('https://api.ipify.org?format=json', function (data) {
    getIpData(data.ip);
});








function getIpData(ip) {
    $(function(){
        
        var xmlhttp = new XMLHttpRequest();
        var url = "https://geo.ipify.org/api/v1?apiKey=at_PgfYjyZDDbnyWjybdXsibQcp7D3bn&ipAddress=" + ip;
        xmlhttp.open("GET", url, true);
    
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var ipData = JSON.parse(this.responseText);
    
                var lat = ipData.location.lat;
                var lng = ipData.location.lng;
    
                data.ip = ipData.ip;
                $("#ip-address").text(data.ip);
                data.isp = ipData.isp;
                $("#isp").text(data.isp);
                data.location = ipData.location.city;
                $("#location").text(data.location);
                data.timezone = ipData.location.timezone;
                $("#timezone").text(data.timezone);
    
                mymap.setView([lat, lng], 13);
                var marker = L.marker([lat,lng]).addTo(mymap);
    
            }
        };
        xmlhttp.send();

    });

}


var data = {
    ip: "",
    location: "",
    timezone: "",
    isp: ""
}


$("form").submit(function (e) {
    e.preventDefault();
    var ip = document.getElementById("ip").value;
    console.log(ip);
    getIpData(ip);
});