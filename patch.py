import os
import glob

workspace_dir = r"c:\Users\Rudra\OneDrive\Desktop\Travel  websit\Travel-WebSite"

html_files = glob.glob(os.path.join(workspace_dir, "*.html"))

target_div = '<div class="currancy_login flex align-center ">'
replacement_div = '''<div class="currancy_login flex align-center ">
                <button id="dark-mode-toggle" class="dark-mode-toggle" style="margin-right: 15px;" aria-label="Toggle Dark Mode">🌙</button>'''

script_tag = '<script src="script.js"></script>'

for file_path in html_files:
    if os.path.basename(file_path) == "index.html":
        # we already did this one manually
        continue
    
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    modified = False

    if target_div in content and '<button id="dark-mode-toggle"' not in content:
        content = content.replace(target_div, replacement_div)
        modified = True

    if script_tag not in content:
        content = content.replace('</body>', f'    {script_tag}\n</body>')
        modified = True

    if modified:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")

print("Done patching HTML files.")
