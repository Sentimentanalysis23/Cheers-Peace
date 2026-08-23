import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Revert light backgrounds to dark
    content = content.replace('bg-[#FAFAFA]', 'bg-[#000000]')
    content = content.replace('from-[#FAFAFA]', 'from-[#000000]')
    content = content.replace('via-[#FAFAFA]', 'via-[#000000]')
    content = content.replace('to-[#FAFAFA]', 'to-[#000000]')
    
    # Revert text colors
    content = content.replace('text-[#333333]', 'text-[#FFFFFF]')
    content = content.replace('text-black', 'text-white')
    content = content.replace('text-black/20', 'text-white/20')
    
    # The tricky one: bg-white. 
    # Originally, sections used bg-[#060a17] which became #0A0A0A. 
    # Then my bad script changed bg-[#0A0A0A] to bg-white.
    # But original code also had `hover:bg-white` and `bg-white/20`.
    # So we should change `bg-white` to `bg-[#0A0A0A]` ONLY IF it is NOT preceded by `hover:` 
    # and NOT followed by `/` (like `/20`).
    import re
    # Negative lookbehind for `hover:` and negative lookahead for `/`
    content = re.sub(r'(?<!hover:)bg-white(?!/)', 'bg-[#0A0A0A]', content)
    
    # Wait, what about `bg-black`? My bad script might have created some `bg-black`.
    # If there are any `bg-black`, they were likely originally `bg-white` that got mangled.
    content = content.replace('bg-black', 'bg-white')
    
    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            process_file(os.path.join(root, file))

