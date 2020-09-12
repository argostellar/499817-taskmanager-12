import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteSortingTemplate} from "./view/site-sorting.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskAddTemplate} from "./view/task-add.js";
import {createLoadButtonTemplate} from "./view/load-button.js";
import {createBoardTemplate} from "./view/board.js";
import {createBoardSortingTemplate} from "./view/board-sorting.js";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSiteSortingTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardContainer = siteMainElement.querySelector(`.board`);
const boardSorting = boardContainer.querySelector(`.board__filter-list`);
const boardList = boardContainer.querySelector(`.board__tasks`);

render(boardList, createTaskAddTemplate(), `beforeend`);

for (let i = TASK_COUNT; i > 0; i--) {
  render(boardList, createTaskTemplate(), `beforeend`);
}

render(boardSorting, createBoardSortingTemplate(), `beforeend`);
render(boardContainer, createLoadButtonTemplate(), `beforeend`);
