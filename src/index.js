import "./main.scss";

import helper from "./helper";
import confettiPrompt from "./confetti-prompt";

const $ul = document.querySelector("ul");
const $loader = document.querySelector("p.loader");

function getStory(id) {
    return fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    ).then(response => response.json());
}

function getAuthor(username) {
    return fetch(
        `https://hacker-news.firebaseio.com/v0/user/${username}.json`
    ).then(response => response.json());
}

function getTopStoryIds() {
    return fetch(
        `https://hacker-news.firebaseio.com/v0/topstories.json`
    ).then(response => response.json());
}

function getStoryWithAuthor(id) {
    return getStory(id).then(async story => {
        const author = await getAuthor(story.by);

        story.author = author;
        return story;
    });
}

async function fetchTopStories(numerOfStories) {
    const topStoryIds = await getTopStoryIds();

    const topTenStoryIds = topStoryIds.filter(
        (topStoryId, i) => i < numerOfStories
    );

    // A story is now assumed to have an author
    const topTenStoryPromises = topTenStoryIds.map(storyId =>
        getStoryWithAuthor(storyId)
    );

    const topTenStories = await Promise.all(topTenStoryPromises);

    topTenStories.sort((a, b) => a.score > b.score);

    $loader.classList.remove("loading");
    renderStories(topTenStories);
}

const renderStories = stories =>
    stories.forEach((story, i) => renderStory(story, i));

function renderStory({ score, time, title, type, url, author }, i) {
    const liAnimateInInterval = 300;
    const $li = document.createElement("li");

    const formattedDate = helper.getFormattedDate(time * 1000);

    $li.innerHTML = `<li>
        <h2><a href="${url}">${title}</a></h2>
        <p>${formattedDate}</p>
        <p>Score: ${score}</p>
        <p>Username: ${author.id}</p>
        <p>${author.id}'s karma: ${author.karma}</p>
    </li>
    `;

    setTimeout(() => {
        $li.classList.add("visible");
    }, i * liAnimateInInterval);

    $ul.appendChild($li);
}

fetchTopStories(10);
confettiPrompt.init();
