/*******Fetch******/

async function getCards() {
  let url = "https://jsonplaceholder.typicode.com/albums";
  let response = await fetch(url);

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

async function showPostsCards() {
  const postsContainer = document.querySelector(".tasks");
  posts = await getCards();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("card");
    postEl.innerHTML = `
                <div class="number">${post.id}</div>
                <div class="post-info">
                    <h2 class="post-title">${post.title}</h2>
                </div>
            `;
    postsContainer.appendChild(postEl);
  });
  cardsPerView(16);
}
showPostsCards();

function cardsPerView(itemsPerPage) {
  let pagination = document.querySelector(".pagination ul");
  let cards = document.querySelectorAll(".card");

  const pagCount = Math.ceil(cards.length / itemsPerPage);
  if (pagCount > 1) {
    showPages(pagCount, pagination);
    const list = document.querySelectorAll(".pagination-items");
    let currentPage = 1;
    let start = funcGetStart(cards.length, currentPage, itemsPerPage);
    let end = funcGetEnd(currentPage, itemsPerPage);
    renderCards(start, end, cards);
    for (let li of list) {
      li.addEventListener("click", function () {
        if (this.classList.contains("active")) {
          return;
        } else {
          for (let lis of list) {
            lis.classList.remove("active");
          }
          this.classList.add("active");
          currentPage = this.id;
          start = funcGetStart(cards.length, currentPage, itemsPerPage);
          end = funcGetEnd(currentPage, itemsPerPage);
          renderCards(start, end, cards);
        }
      });
    }
  }
}

function renderCards(start, end, cards) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  for (let i = start - 1; i <= end - 1; i++) {
    if (cards[i]) {
      cards[i].style.display = "block";
    }
  }
}
function funcGetEnd(currentPage, itemsPerPage) {
  return currentPage * itemsPerPage;
}
function funcGetStart(length, currentPage, itemsPerPage) {
  return (currentPage - 1) * itemsPerPage + 1;
}
function showPages(numOfPage, pagination) {
  for (let i = 1; i <= numOfPage; i++) {
    let item_element = document.createElement("li");
    item_element.classList.add("pagination-items");
    item_element.id = i;
    item_element.innerHTML = i;
    if (i === 1) {
      item_element.className += " active";
    }
    pagination.appendChild(item_element);
  }
}
