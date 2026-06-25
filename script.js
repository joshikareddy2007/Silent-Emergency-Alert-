function sendAlert() {

    navigator.geolocation.getCurrentPosition(pos => {

        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        let contacts = [
            document.getElementById("c1").value,
            document.getElementById("c2").value
        ];

        fetch("http://localhost:5000/send-alert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                latitude: lat,
                longitude: lon,
                contacts: contacts
            })
        })
        .then(res => res.text())
        .then(data => document.getElementById("status").innerText = data);

    });
}
