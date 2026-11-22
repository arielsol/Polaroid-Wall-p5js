let nodes = [];
let nodeLabels = [];
let nodeConnections = [];
let draggingNode = null;
let hoveredNode = null;
let offsetX = 0,
  offsetY = 0;
let zoom = 1;
let frameCounter = 0;
let lastMouseX, lastMouseY;
let isPanning = false;
let handFont;
let wallTexture;

let love, destination, journey, work, ending, direct;

let mediaAssets = [];

let mediaSources = [
  { front: "assets/img1.jpg", back: "assets/score1.jpg" },
  { front: "assets/img2.jpg", back: "assets/score2.jpg" },
  { front: "assets/img3.gif", back: "assets/score3.jpg" },
  { front: "assets/img4.jpg", back: "assets/score4.jpg" },
  { front: "assets/img5.jpg", back: "assets/score5.jpg" },
  { front: "assets/img6.jpg", back: "assets/score6.jpg" },
  { front: "assets/img7.jpg", back: "assets/score7.jpg" },
  { front: "assets/img8.jpg", back: "assets/score8.jpg" },
  { front: "assets/img9.jpg", back: "assets/score9.jpg" },
  { front: "assets/img10.jpg", back: "assets/score10.jpg" },
  { front: "assets/img11.jpg", back: "assets/score11.jpg" },
  { front: "assets/img12.jpg", back: "assets/score12.jpg" },
  { front: "assets/img13.jpg", back: "assets/score13.jpg" },
  { front: "assets/img14.jpg", back: "assets/score14.jpg" },
  { front: "assets/img15.gif", back: "assets/score15.jpg" },
  { front: "assets/img16.jpg", back: "assets/score16.jpg" },
  { front: "assets/img17.jpg", back: "assets/score17.jpg" },
  { front: "assets/img18.jpg", back: "assets/score18.jpg" },
  { front: "assets/img19.jpg", back: "assets/score19.jpg" },
  { front: "assets/img20.jpg", back: "assets/score20.jpg" },
  { front: "assets/img21.jpg", back: "assets/score21.jpg" },
  { front: "assets/img22.jpg", back: "assets/score22.jpg" },
  { front: "assets/img23.jpg", back: "assets/score23.jpg" },
  { front: "assets/img24.jpg", back: "assets/score24.jpg" },
  { front: "assets/img25.jpg", back: "assets/score25.jpg" },
  { front: "assets/img26.jpg", back: "assets/score26.jpg" },
  { front: "assets/img27.jpg", back: "assets/score27.jpg" },
  { front: "assets/img28.jpg", back: "assets/score28.jpg" },
  { front: "assets/img29.jpg", back: "assets/score29.jpg" },
  { front: "assets/img30.gif", back: "assets/score30.jpg" },
  { front: "assets/img1.jpg", back: "assets/score31.jpg" },
  { front: "assets/img32.jpg", back: "assets/score32.jpg" },
];


function preload() {
  handFont = loadFont("assets/permanent-marker-latin-400-normal.ttf");
  wallTexture = loadImage("assets/wallsmall.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
  textSize(14);

  love = color(255, 101, 175);
  destination = color(139, 179, 135);
  journey = color(255, 254, 136);
  work = color(103, 114, 224);
  ending = color(125, 5, 140);
  direct = color(0, 0, 0);

  nodeLabels = [
    "I Already Know\nHow This Ends",
    "Tall Elevator, DTLA",
    "Mid-20s at the Turn\nof Spring",
    "The Apps",
    "A Phone Call \nwith HR",
    "Eyes in \nWest Hollywood",
    "Onboarding",
    "Red Kia, \nEmpty Touch",
    "New Feelings \nfor You",
    "In the Halloween \nUber",
    "The Urge to Text \nat Every Red Light",
    "Afterparty at \nVenice Beach Bars",
    "The 101 to the 405",
    "Wedding Gigs \nin Santa Susana",
    "Carbonated Strawber-\nries Picnic",
    "24-Hour \nInstagram Story",
    "View of the Hollywood \nSign from the Roof \nof my Apartment",
    "Temporary Lover on \nVacation in LA",
    "A Glass with a \nStranger in The Hague",
    "Sunset Soundbaths, \nMalibu",
    "New Year's Eve \nwith Family",
    "The Talking Stage",
    "Malibu Burning",
    "Roko \n(Across the Country)",
    "The Reality of a \nJob Description",
    "Chibi \n(Across the Country)",
    "Thr Fourth and \nFinal Date",
    "Formal Letter of \nResignation",
    "Funeral Gigs \nin Glendale",
    "Back to Chicago on \nthe Southwest Chief",
    "How This Ends",
    "After the End",
  ];

  for (let i = 0; i < 32; i++) {
    let x = width / 2;
    let y = height / 2;
    nodes.push(new Node(x, y, nodeLabels[i], null, null));
  }

  loadNodeMedia(0);
  loadNodeMedia(1);

  nodeConnections = [
    { from: 0, to: 4, color: love },
    { from: 4, to: 6, color: love },
    { from: 6, to: 8, color: love },
    { from: 8, to: 11, color: love },
    { from: 11, to: 15, color: love },
    { from: 15, to: 18, color: love },
    { from: 18, to: 19, color: love },
    { from: 19, to: 22, color: love },
    { from: 22, to: 27, color: love },
    { from: 2, to: 3, color: destination },
    { from: 3, to: 6, color: destination },
    { from: 6, to: 12, color: destination },
    { from: 12, to: 17, color: destination },
    { from: 17, to: 19, color: destination },
    { from: 19, to: 23, color: destination },
    { from: 2, to: 8, color: journey },
    { from: 8, to: 10, color: journey },
    { from: 10, to: 13, color: journey },
    { from: 13, to: 16, color: journey },
    { from: 16, to: 21, color: journey },
    { from: 21, to: 30, color: journey },
    { from: 4, to: 5, color: work },
    { from: 5, to: 7, color: work },
    { from: 7, to: 14, color: work },
    { from: 14, to: 20, color: work },
    { from: 20, to: 25, color: work },
    { from: 25, to: 28, color: work },
    { from: 28, to: 29, color: work },
    { from: 1, to: 23, color: ending },
    { from: 23, to: 24, color: ending },
    { from: 24, to: 26, color: ending },
    { from: 26, to: 27, color: ending },
    { from: 27, to: 28, color: ending },
    { from: 28, to: 31, color: ending },
    { from: 31, to: 32, color: ending },
    { from: 1, to: 31, color: direct },
    { from: 24, to: 26, color: direct },
    { from: 9, to: 27, color: direct },
    { from: 7, to: 28, color: direct },
    { from: 20, to: 23, color: direct },
    { from: 14, to: 29, color: direct },
  ];
}

function draw() {
  background(0);
  if (wallTexture) {
    imageMode(CORNER);
    image(wallTexture, 0, 0, width, height);
  }

  translate(offsetX, offsetY);
  scale(zoom);

  for (let conn of nodeConnections) {
    let fromNode = nodes[conn.from];
    let toNode = nodes[conn.to];
    if (fromNode && toNode) {
      stroke(conn.color);
      strokeWeight(2);
      line(fromNode.x, fromNode.y, toNode.x, toNode.y);
    }
  }

  let adjustedMouseX = (mouseX - offsetX) / zoom;
  let adjustedMouseY = (mouseY - offsetY) / zoom;
  hoveredNode = null;
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].isMouseOver(adjustedMouseX, adjustedMouseY)) {
      hoveredNode = nodes[i];
      break;
    }
  }

  for (let i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].mediaFront) nodes[i].display(true);
  }

  frameCounter++;
  if (frameCounter % 120 === 0) {
    for (let node of nodes) {
      let img = node.flipped ? node.mediaBack : node.mediaFront;
      if (img?.elt?.src?.endsWith(".gif")) {
        restartGif(img);
      }
    }
  }
}

function restartGif(oldImg) {
  const src = oldImg.elt.src;
  const w = oldImg.width;
  const h = oldImg.height;
  const x = oldImg.position().x;
  const y = oldImg.position().y;

  oldImg.remove();

  const newImg = createImg(`${src.split("?")[0]}?t=${Date.now()}`, () => {
    newImg.hide();
    newImg.style("pointer-events", "none");
  });
  newImg.size(w, h);
  newImg.position(x, y);

  for (let node of nodes) {
    if (node.mediaBack === oldImg) node.mediaBack = newImg;
    if (node.mediaFront === oldImg) node.mediaFront = newImg;
  }
}

function mouseWheel(event) {
  zoom += event.delta * -0.001;
  zoom = constrain(zoom, 0.5, 3);
}

function mousePressed() {
  draggingNode = null;
  let adjustedMouseX = (mouseX - offsetX) / zoom;
  let adjustedMouseY = (mouseY - offsetY) / zoom;

  for (let i = 0; i <= nodes.length - 1; i++) {
    let node = nodes[i];
    if (node.isMouseOver(adjustedMouseX, adjustedMouseY)) {
      draggingNode = node;
      return;
    }
  }

  draggingNode = "pan";
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  isPanning = false;
}

function mouseDragged() {
  if (draggingNode === "pan") {
    if (dist(mouseX, mouseY, lastMouseX, lastMouseY) > 5) {
      isPanning = true;
      offsetX += mouseX - lastMouseX;
      offsetY += mouseY - lastMouseY;
    }
  } else if (draggingNode instanceof Node) {
    let adjustedMouseX = (mouseX - offsetX) / zoom;
    let adjustedMouseY = (mouseY - offsetY) / zoom;
    draggingNode.x = adjustedMouseX;
    draggingNode.y = adjustedMouseY;
  }

  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mouseReleased() {
  if (draggingNode instanceof Node) {
    let index = nodes.indexOf(draggingNode);
    if (index >= 0 && index + 2 < nodes.length) {
      loadNodeMedia(index + 2);
    }
  }
  draggingNode = null;
  isPanning = false;
}

function doubleClicked() {
  let adjustedMouseX = (mouseX - offsetX) / zoom;
  let adjustedMouseY = (mouseY - offsetY) / zoom;

  for (let node of nodes) {
    if (node.isMouseOver(adjustedMouseX, adjustedMouseY)) {
      node.flip();
      break;
    }
  }
}

function loadNodeMedia(index) {
  if (index >= mediaSources.length || mediaAssets[index]) return;

  const media = mediaSources[index];
  const isGif = (url) => url.toLowerCase().endsWith(".gif");

  const loadSide = (url, onLoad) => {
    if (isGif(url)) {
      const img = createImg(
        `${url}?t=${Date.now()}`,
        () => {
          img.style("position", "absolute");
          img.style("pointer-events", "none");
          img.hide();
          onLoad(img);
        },
        "anonymous"
      );
    } else {
      loadImage(
        url,
        (img) => onLoad(img),
        () => console.error(`Failed to load image: ${url}`)
      );
    }
  };

  loadSide(media.front, (frontImg) => {
    loadSide(media.back, (backImg) => {
      mediaAssets[index] = { front: frontImg, back: backImg };
      nodes[index].mediaFront = frontImg;
      nodes[index].mediaBack = backImg;
      nodes[index].flipped = random([true, false, false]);
    });
  });
}

class Node {
  constructor(x, y, label, mediaFront, mediaBack) {
    this.x = x;
    this.y = y;
    this.label = label;
    this.mediaFront = mediaFront;
    this.mediaBack = mediaBack;
    this.flipped = false;
    this.size = 200;
  }

  flip() {
    this.flipped = !this.flipped;

    let targetProp = this.flipped ? "mediaBack" : "mediaFront";
    let currentImg = this[targetProp];

    if (currentImg?.elt?.src?.toLowerCase().endsWith(".gif")) {
      const baseSrc = currentImg.elt.src.split("?")[0];
      const newSrc = `${baseSrc}?t=${Date.now()}`;
      const w = currentImg.width;
      const h = currentImg.height;

      currentImg.remove();

      const newImg = createImg(
        newSrc,
        () => {
          newImg.hide();
        },
        "anonymous"
      );

      newImg.size(w, h);
      this[targetProp] = newImg;
    }
  }

  display(showLabel = true) {
    const borderW = this.size * 1.1;
    const borderH = this.size * 1.4;
    const imageH = this.size;

    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y + 10, borderW, borderH, 6);

    imageMode(CENTER);
    let img = this.flipped ? this.mediaBack : this.mediaFront;

    if (img?.elt?.tagName === "IMG") {
      img.show();
      img.style("pointer-events", "none");
      img.position(
        this.x * zoom + offsetX - this.size / 2,
        this.y * zoom + offsetY - (borderH - imageH) / 4 - this.size / 2
      );
      img.size(this.size, this.size);
    } else if (img instanceof p5.Image) {
      image(img, this.x, this.y - (borderH - imageH) / 4, this.size, this.size);
    } else {
      fill(220);
      stroke(100);
      ellipse(this.x, this.y, this.size);
    }

    let otherImg = this.flipped ? this.mediaFront : this.mediaBack;
    if (otherImg?.elt?.tagName === "IMG") otherImg.hide();

    if (showLabel) {
      textFont(handFont);
      textSize(18);
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(this.label, this.x, this.y + borderH / 2 - 30);
    }
  }

  isMouseOver(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size / 2;
  }
}
