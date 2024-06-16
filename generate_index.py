import os
import json
import re

def generate_index(directory):
    index = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                with open(path, 'r') as f:
                    content = f.read()
                    tags_match = re.search(r'tags:\s*(.*)', content)
                    tags = tags_match.group(1) if tags_match else ''
                    relative_path = os.path.relpath(path, directory)
                    index.append({
                        'file': relative_path.replace('\\', '/'),  # Convert Windows paths to Unix-style
                        'tags': tags
                    })
    with open(os.path.join(directory, 'index.json'), 'w') as f:
        json.dump(index, f, indent=4)

# Specify the directory containing your markdown files
generate_index('markdowns')
