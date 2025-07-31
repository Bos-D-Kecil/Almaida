<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Almaida Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      font-family: sans-serif;
      color: white;
    }
    #score {
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 24px;
      background: rgba(0,0,0,0.5);
      padding: 10px;
      border-radius: 8px;
    }
    #message {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      background: rgba(0,0,0,0.7);
      padding: 20px;
      border-radius: 12px;
    }
    .hidden {
      display: none;
    }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <div id="message" class="hidden">Selamat, kamu sudah menang! 🧙‍♀️</div>
  <canvas id="gameCanvas"></canvas>
  <script src="https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js"></script>
  <script src="main.js"></script>
</body>
</html>
