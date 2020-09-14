import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTaskTemplate} from "./view/task.js";
import {createTaskAddTemplate} from "./view/task-add.js";
import {createLoadButtonTemplate} from "./view/load-button.js";
import {createBoardTemplate} from "./view/board.js";
import {createBoardSortingTemplate} from "./view/board-sorting.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const filters = generateFilter(tasks);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardContainer = siteMainElement.querySelector(`.board`);
const boardSorting = boardContainer.querySelector(`.board__filter-list`);
const boardList = boardContainer.querySelector(`.board__tasks`);

render(boardList, createTaskAddTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(boardList, createTaskTemplate(tasks[i]), `beforeend`);
}

render(boardSorting, createBoardSortingTemplate(), `beforeend`);

if (tasks.length > TASK_COUNT_PER_STEP) {
  render(boardContainer, createLoadButtonTemplate(), `beforeend`);

  let renderedTaskCount = TASK_COUNT_PER_STEP;

  const loadMoreButton = boardContainer.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(boardList, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
