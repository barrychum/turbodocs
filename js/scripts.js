let fuse;
let items;
let selectedResultIndex = -1;

const fetchMarkdownFiles = async () => {
    const response = await fetch('markdowns/index.json');
    items = await response.json();
    const options = {
        keys: ['tags'],
        threshold: 0.3
    };
    fuse = new Fuse(items, options);
};

const adjustRelativePaths = (htmlContent, filePath) => {
    const basePath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
    return htmlContent.replace(/src="(\.\/[^"]+)"/g, (match, p1) => {
        return `src="${basePath}${p1.substring(2)}"`;
    });
};

const renderMarkdown = async (file) => {
    const response = await fetch(`markdowns/${file}`);
    let text = await response.text();
    text = marked.parse(text);
    text = adjustRelativePaths(text, `markdowns/${file}`);
    document.getElementById('content').innerHTML = text;
};

const createResultElement = (item) => {
    const div = document.createElement('div');
    div.className = 'result';
    div.innerHTML = `<span>${item.file}</span>: <span class="tags">${item.tags}</span>`;
    div.onclick = () => selectResult(item, div);
    return div;
};

const selectResult = (item, element) => {
    document.querySelectorAll('.result').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    renderMarkdown(item.file);
    document.getElementById('results').style.display = 'none';
};

const updateResults = (results) => {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    results.forEach((result, index) => {
        const resultElement = createResultElement(result.item);
        if (index === selectedResultIndex) {
            resultElement.classList.add('selected');
        }
        resultsDiv.appendChild(resultElement);
    });
};

const handleKeyDown = (e) => {
    const resultsDiv = document.getElementById('results');
    const results = resultsDiv.querySelectorAll('.result');
    if (e.key === 'ArrowDown') {
        selectedResultIndex = (selectedResultIndex + 1) % results.length;
        updateResults(fuse.search(document.getElementById('search').value));
    } else if (e.key === 'ArrowUp') {
        selectedResultIndex = (selectedResultIndex - 1 + results.length) % results.length;
        updateResults(fuse.search(document.getElementById('search').value));
    } else if (e.key === 'Enter') {
        if (selectedResultIndex >= 0 && selectedResultIndex < results.length) {
            results[selectedResultIndex].click();
        }
    }
};

document.getElementById('search').addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
        const results = fuse.search(query);
        updateResults(results);
        document.getElementById('results').style.display = 'block';
        selectedResultIndex = -1;
    } else {
        document.getElementById('results').style.display = 'none';
    }
});

document.getElementById('search').addEventListener('keydown', handleKeyDown);

// Initial fetch to set up Fuse.js
fetchMarkdownFiles();
