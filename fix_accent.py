import os

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Change yellow gold to copper/rose gold
    content = content.replace('#D4AF37', '#C1836A')
    # Change any bg-amber-500 to our custom hex for consistency if it exists
    content = content.replace('bg-amber-500', 'bg-[#C1836A]')
    content = content.replace('text-amber-500', 'text-[#C1836A]')
    content = content.replace('border-amber-500', 'border-[#C1836A]')
    content = content.replace('shadow-amber-500', 'shadow-[#C1836A]')
    
    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            process_file(os.path.join(root, file))

