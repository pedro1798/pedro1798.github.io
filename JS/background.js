const images = [
  "0.jpg",
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "6.jpg",
  "7.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "15.jpg",
];

const todaysImage = images[Math.floor(Math.random() * images.length)];

const backgroundImage = document.createElement("img");

backgroundImage.src = `img/${todaysImage}`;

backgroundImage.width = "200";
backgroundImage.length = "200";

document.body.appendChild(backgroundImage);
