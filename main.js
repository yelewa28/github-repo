let theInput = document.querySelector(".get-repo input"),
  getButton = document.querySelector(".get-repo .get-button"),
  reposData = document.querySelector(".show-data");

getButton.onclick = getRepos;
document.onkeyup = function (e) {
  if (e.key === "Enter") {
    getRepos();
  }
};

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((repos) => repos.json())
      .then((repos) => {
        reposData.innerHTML = "";
        let reposCount = document.createElement("div");
        reposCount.textContent = `You Have ${repos.length} Repositories`;
        reposCount.classList.add("repos-count");
        reposData.append(reposCount);

        repos.forEach((repo) => {
          let mainDiv = document.createElement("div");
          mainDiv.classList.add("repo-box");

          let repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);

          let theUrl = document.createElement("a");
          theUrl.textContent = "Visit";
          theUrl.setAttribute(
            "href",
            `https://github.com/${theInput.value}/${repo.name}`
          );
          theUrl.setAttribute("target", "_blank");
          mainDiv.appendChild(theUrl);

          let starsSpan = document.createElement("span");
          starsSpan.textContent = `Stars ${repo.stargazers_count}`;
          mainDiv.appendChild(starsSpan);

          reposData.appendChild(mainDiv);
        });
      });
  }
}
