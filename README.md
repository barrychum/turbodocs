# Markdown CMS

This project is a simple Content Management System (CMS) for managing and viewing markdown files with tags. It includes a search functionality to find markdown files based on tags and renders the markdown files for reading. The project uses `Fuse.js` for fuzzy search and `marked.js` for rendering markdown to HTML.

## Project Structure

```
/your-repo-name
├── index.html
├── /css
│   └── styles.css
├── /js
│   └── scripts.js
├── /markdowns
│   ├── file1.md
│   ├── file2.md
│   ├── /subfolder
│   │   ├── file3.md
│   │   └── /assets
│   │       └── image.png
│   └── index.json
└── generate_index.py
```

### Files and Directories

- **index.html**: The main HTML file that includes the structure of the web page and links to the external CSS and JavaScript files.
- **/css/styles.css**: Contains the CSS styles for the project.
- **/js/scripts.js**: Contains the JavaScript code for fetching markdown files, searching, and rendering markdown content.
- **/markdowns**: Directory containing markdown files and an index.json file.
  - **file1.md**, **file2.md**: Sample markdown files.
  - **/subfolder/file3.md**: A markdown file inside a subfolder.
  - **/subfolder/assets/image.png**: An image file referenced in file3.md.
  - **index.json**: Contains a list of markdown files and their tags.
- **generate_index.py**: A Python script to generate the index.json file for all markdown files.

## Features

- **Fuzzy Search**: Search markdown files by tags using `Fuse.js`.
- **Markdown Rendering**: Render markdown files to HTML using `marked.js`.
- **Responsive UI**: Simple and responsive user interface with search and results display.

## Getting Started

### Prerequisites

- Python 3.x
- A web browser

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Start the local server:
   ```
   python3 -m http.server 8000
   ```

3. Open your web browser and go to `http://localhost:8000`.

### Usage

1. **Search**: Enter tags in the search field to find relevant markdown files.
2. **View**: Click on a search result to view the markdown file content.

### Adding New Markdown Files

1. Add your markdown files to the `/markdowns` directory.
2. Update the `index.json` file manually or run the `generate_index.py` script to regenerate the index.

### Running `generate_index.py`

To automatically generate the `index.json` file for all markdown files, run:
```
python3 generate_index.py
```

## Example Markdown File

Here is an example of a markdown file with an image:

**/markdowns/subfolder/file3.md**
```
---
tags: example, image
---

# Markdown File 3

This is a sample markdown file.

Here is an image:

![Description of the image](./image.png)
```

## License

This project is licensed under the MIT License.
