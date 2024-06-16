import os
import json
import frontmatter

def generate_index(directory):
    index = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)
                    tags = post.get('tags', '')
                    index.append({
                        'file': os.path.relpath(filepath, directory),
                        'tags': ', '.join(tags) if isinstance(tags, list) else tags
                    })
    with open(os.path.join(directory, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=4)

if __name__ == "__main__":
    generate_index('./markdowns')
