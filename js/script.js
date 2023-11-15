const body = document.querySelector("body");
body.textContent = " ";

//function to fetch data from data.json
async function loadJsonFile() {
  try {
    const response = await fetch("./data/data.json");
    const data = await response.json();
    //   const linkData = data.linkData;
    return data;
  } catch (eroare) {
    console.log("Eraoare la returnarea JSON: ", eroare);
  }
}

// moved in data.json
// let linksData = [
//   {
//     text: "00 Home",
//     url: "./",
//   },
//   {
//     text: "01 Destination",
//     url: "./destination",
//   },
//   {
//     text: "02 Crew",
//     url: "./crew",
//   },
//   {
//     text: "03 Technology",
//     url: "./technology",
//   },
// ];

function createAndAppendLink(text, url, parent) {
  //creare si initializarea <a>-urilor
  const link = document.createElement("a"); //a este tag-ul pt link in html
  link.textContent = text;
  link.setAttribute("href", url);

  //crearea si initializarea <li>-urilor
  const liElement = document.createElement("li");
  liElement.appendChild(link);
  parent.appendChild(liElement);
}

async function initializarePagina() {
  const data = await loadJsonFile();
  console.log(data);

  if (data) {
    //creare header
    const headerElement = document.createElement("header");
    body.appendChild(headerElement);
    //creare si adaugare logo
    const logo = document.createElement("img");
    logo.src = "../assets/shared/logo.svg";
    const line = document.createElement("img");
    line.src = "../assets/shared/line.svg";
    headerElement.appendChild(logo);
    headerElement.appendChild(line);

    //adaugare nav si ul
    const ulElement = document.createElement("ul");
    const navElement = document.createElement("nav");

    data.linksData.forEach((linkData) => {
      return createAndAppendLink(linkData.text, linkData.url, ulElement);
    });

    navElement.appendChild(ulElement);
    headerElement.appendChild(navElement);

    //-----------------------------
    //creare si adaugare home-container class
    const homeContainer = document.createElement("div");
    homeContainer.classList.add("home-container");
    
    //creare si adaugare text-container
    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");
    homeContainer.appendChild(textContainer);

    //creare si adaugare upTitle
    const upTitle = document.createElement("h4");
    upTitle.textContent = data.home.upTitle;
    textContainer.appendChild(upTitle);

    //creare si adaugare title
    const title = document.createElement("h1");
    title.textContent = data.home.title;
    textContainer.appendChild(title);
    //creare si adaugare paragraf
    const paragraph = document.createElement("p");
    paragraph.textContent = data.home.paragraph;
    textContainer.appendChild(paragraph);

    //creare si adaugare exploreBtn
    const exploreBtn = document.createElement("button");
    exploreBtn.textContent = data.home.exploreBtn;
    homeContainer.appendChild(exploreBtn);

    body.appendChild(homeContainer);

  }
}
initializarePagina();
