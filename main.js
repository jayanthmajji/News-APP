
const API_KEY = "pub_48723489487b6c9865539e2abb2aab44cb873";
const BASE_URL = "https://newsdata.io/api/1/latest";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const url = `${BASE_URL}?apiKey=${API_KEY}&q=${query}`;
    console.log("url ",url);
    const res = await fetch(url);
    console.log("result---",res);
    const data = await res.json();
    bindData(data.results);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article)
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
  console.log();
  const newsImg = cardClone.querySelector("#news-img")
  const newsTitle = cardClone.querySelector("#news-title")
  const newsSource = cardClone.querySelector("#news-source")
  const newsDesc = cardClone.querySelector("#news-desc")
  let dec = String(article.description);
  newsImg.src = article.image_url;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = dec.substring(0,100);

  const date = new Date(article.pubDate).toLocaleString("en-US",{
    timeZone: "Asia/Jakarta",
  })

  newsSource.innerHTML = `<a>${article.source_url}</a>`

  cardClone.firstElementChild.addEventListener("click", () =>{
    window.open(article.link, "_blank")
  })
};
// console.log(newsImg);
let curSelectedNav = null;

function onNavItemClick(id){
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const button = document.getElementById("button");
const input = document.getElementById("news-input");

button.addEventListener("click", () =>{
    const query = input.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})
