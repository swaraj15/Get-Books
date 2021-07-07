

  let searchInputEl = document.getElementById("searchInput");

  let searchResultsEl = document.getElementById("searchResults");
  
  let spinnerEl = document.getElementById("spinner");
  
  function createAndAppendSearchResult(result) {
    let { imageLink, title, author } = result;
  
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
  
    let rowEl=document.createElement("div");
    rowEl.classList.add("row");

    let colEl =document.createElement("div");

    let titleEl = document.createElement("a");
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    colEl.appendChild(titleEl);
  
    let titleBreakEl = document.createElement("br");
    colEl.appendChild(titleBreakEl);

    let pEl1 = document.createElement("p");
    pEl1.classList.add("link-description");
    pEl1.textContent=(`Author:: ${author}`);
    colEl.appendChild(pEl1);

    let linkBreakEl = document.createElement("br");
    colEl.appendChild(linkBreakEl);

    let urlEl = document.createElement("img");
    urlEl.src = imageLink;
    urlEl.classList.add("imgc");

    rowEl.appendChild(urlEl);
    rowEl.appendChild(colEl);
    let imgBreakEl = document.createElement("br");
    
    resultItemEl.appendChild(rowEl);
    resultItemEl.appendChild(imgBreakEl);
    searchResultsEl.appendChild(resultItemEl);
  }
  
  function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
  
    for (let result of searchResults) {
      createAndAppendSearchResult(result);
    }
  }
  
  function searchWikipedia(event) {
    if (event.key === "Enter") {
  
      spinnerEl.classList.remove("d-none");
      searchResultsEl.textContent = "";
      let searchInput = searchInputEl.value ;
      let url = `https://apis.ccbp.in/book-store?title=${searchInput}&maxResults=30`;
      let options = {
        method: "GET"
      };
  
      fetch(url, options)
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonData) {
          let { search_results } = jsonData;
          displayResults(search_results);
        });
    }
  }
  
  searchInputEl.addEventListener("keydown", searchWikipedia);