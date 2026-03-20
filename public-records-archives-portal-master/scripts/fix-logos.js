const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/dashboard/**/page.tsx');
let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Add import if missing
    if (!content.includes('AnimatedLogo')) {
        content = content.replace(/(import .*?\n)/, '$1import { AnimatedLogo } from "@/components/layout/AnimatedLogo"\n');
    }

    const linkRegex = /<Link href=\"\/\" className=\"flex items-center gap-3 hover:opacity-80 transition-opacity group\">\s*(?:<div className=\"h-10 w-10.*?<\/div>\s*)?(<div(?: className=\"hidden sm:block\")?>\s*<h1)/s;
    
    content = content.replace(linkRegex, (match, p1) => {
        return `<Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                            <div className="h-10 w-10 flex items-center justify-center">
                                <AnimatedLogo className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                            </div>
                            ` + p1;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
        console.log('Updated ' + file);
    }
});
console.log('Total updated files: ' + updatedCount);
