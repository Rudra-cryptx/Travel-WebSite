import os
import glob

workspace_dir = r"c:\Users\Rudra\OneDrive\Desktop\Travel  websit\Travel-WebSite"

html_files = glob.glob(os.path.join(workspace_dir, "*.html"))

original_div = '<div class="currancy_login flex align-center ">'
modified_div = '''<div class="currancy_login flex align-center ">
                <button id="dark-mode-toggle" class="dark-mode-toggle" style="margin-right: 15px;" aria-label="Toggle Dark Mode">🌙</button>'''
modified_div_sun = '''<div class="currancy_login flex align-center ">
                <button id="dark-mode-toggle" class="dark-mode-toggle" style="margin-right: 15px;" aria-label="Toggle Dark Mode">☀️</button>'''

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    changed = False

    if modified_div in content:
        content = content.replace(modified_div, original_div)
        changed = True

    if modified_div_sun in content:
        content = content.replace(modified_div_sun, original_div)
        changed = True
        
    # Also clean up the inserted <script src="script.js"></script>\n</body> if patch.py added it
    # No, patch.py added '    <script src="script.js"></script>\n</body>'
    old_script_tag = '    <script src="script.js"></script>\n</body>'
    if old_script_tag in content:
        content = content.replace(old_script_tag, '</body>')
        changed = True

    if changed:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Reverted {os.path.basename(file_path)}")

print("Done reverting HTML files.")
