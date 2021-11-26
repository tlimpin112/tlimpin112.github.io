function geocode() {
    var location = document.getElementById('ipinput').value;
    axios.get('https://api.ipfind.com/', {
        params: {
            ip: location,
            auth: 'efb0771c-9a9f-4a3f-808a-8dfaa1ee937d'
        }
    })
        .then(function (response) {
            console.log(response)

            //formatted address
            var lat = response.data.latitude;
            var latOutput = `
            <ul class = "list-group">
                <li class = "list-group-item">${lat}</li>
            </ul>
        `;
            var long = response.data.longitude;
             var longOutput = `
             <ul class = "list-group">
                 <li class = "list-group-item">${long}</li>
             </ul>
         `;

            //output to app
            document.getElementById('formattedaddlat').innerHTML = latOutput
            document.getElementById('formattedaddlong').innerHTML = longOutput
            var map = L.map('map').setView([latOutput, longOutput], 13);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmVudGlpY2Vkd2F0ZXIiLCJhIjoiY2t3ZnFkY2V2MGdydDJvbXB5NWF0dXZtaSJ9.9HwuYTrQREI1wmTfShkFyw', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'your.mapbox.access.token'
            }).addTo(mymap);

            L.marker([latOutput, longOutput]).addTo(map)
                .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                .openPopup();

        })
        .catch(function (error) {
            console.log(error);
        });
}