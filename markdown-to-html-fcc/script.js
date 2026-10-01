const inputText = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const htmlPreview = document.getElementById("preview");
const themeButton = document.getElementById("theme-toggle");
const root = document.documentElement;

// PARSER
function convertMarkdown() {  // elements that occupy a full line
    const lineSeparation = inputText.value.split("\n");
    let convertedLines = [];

    let inList = false;

    for (const elem of lineSeparation) {

        const listCheck = /^[-*] /.test(elem);

        if (listCheck) { // this parses list elements
            const html = elem
                .replace(/^[-*] (.+)/, "<li>$1</li>");
                if (!inList) {
                    convertedLines.push("<ul>");
                    inList = true;
                }
                convertedLines.push(convertInline(html));                
        } else {
            if (inList) {
                convertedLines.push("</ul>");
                inList = false;
            }
            const html = elem
                .replace(/^# (.+)/gm, "<h1>$1</h1>")
                .replace(/^## (.+)/gm, "<h2>$1</h2>")
                .replace(/^### (.+)/gm, "<h3>$1</h3>")
                .replace(/^#### (.+)/gm, "<h4>$1</h4>")
                .replace(/^##### (.+)/gm, "<h5>$1</h5>")
                .replace(/^###### (.+)/gm, "<h6>$1</h6>")
                .replace(/^> (.+)/gm, '<blockquote>$1</blockquote>');

            convertedLines.push(convertInline(html));
        }
    }
    if (inList) {
        convertedLines.push("</ul>");
        inList = false;
    }
    return convertedLines.join("\n");
}

function convertInline(text) { // inline elements 
    return text
        .replace(/\*\*(.+?)\*\*|__(.+?)__/g, "<strong>$1$2</strong>")
        .replace(/\*(.+?)\*|_(.+?)_/g, "<em>$1$2</em>")
        .replace(/!\[(.+?)\]\((.+?)\)/g, '<img alt="$1" src="$2">')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
}

// INPUT MANIPULATION
inputText.addEventListener("input", () => {
    const conversion = convertMarkdown();

    htmlOutput.innerText = conversion;
    htmlPreview.innerHTML = conversion;
})

// THEME SWITCHER
themeButton.addEventListener("click", () => {
    if (root.hasAttribute("data-theme")) {
        root.removeAttribute("data-theme");
    } else {
        root.setAttribute("data-theme", "light");
    }
})