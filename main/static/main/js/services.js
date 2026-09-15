const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab =>
    tab.addEventListener('click', () => tabClicked(tab))
);

const firstTab = tabs[0];

if (firstTab) {
    firstTab.classList.add('active');
}

const tabClicked = (tab) => {

    const contents = document.querySelectorAll('.content');
    const tabs = document.querySelectorAll('.tab-btn');

    contents.forEach(content => content.classList.remove('show'));
    tabs.forEach(tab => tab.classList.remove('active'));

    const category = tab.dataset.category;
    const content = document.querySelector(`.content[data-category="${category}"]`);

    content.classList.add('show');
    tab.classList.add('active');
}