import('https://unpkg.com/grandeur-js').then(grandeur => {
    const apiKey = "grandeurlzyjijbs0w640ik9cog43v6x";
    const accessKey = "e60f9f8bf9fd76d4a4350137b3f38832e068d6e565bfd96de6943702cc72c253";
    const accessToken = "f6cd9f58726b4da58619a7fd4154d8c17c6855d16d1aebbc091e55f3e46d243a";
    const deviceId = "devicelzzqxida1h8v0ik9655nc4og";

    const project = grandeur.init(apiKey, accessKey, accessToken);

    project.auth().token(accessToken)
      .then(() => {
        project.devices().device(deviceId).data().on('percentageValue', (path, value) => {
          document.getElementById('percentage-value').textContent = value;
        });
      })
      .catch(error => {
        console.error('Login failed:', error);
        document.getElementById('percentage-value').textContent = "Error fetching data";
      });
});