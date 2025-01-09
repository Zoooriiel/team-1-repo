function topicCategory() {
    return new Array("Showcase", "Help", "Q&A")
};

function plantCategory() {
    return new Array("Cactus", "Succulents", "Trees", "Creepers", "Moss")
};

const topicArr = topicCategory();
const plantArr = plantCategory();

const topicList = document.querySelector(".topic-dropdown");
const plantList = document.querySelector(".plant-dropdown");

for (let index = 0; index < topicArr.length; index++) {
    topicList.options[index + 1] = new Option(topicArr[index], topicArr[index]);
}

for (let index = 0; index < plantArr.length; index++) {
    plantList.options[index + 1] = new Option(plantArr[index], plantArr[index]);
}

