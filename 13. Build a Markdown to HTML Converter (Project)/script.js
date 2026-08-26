function convertMarkdown() {
    const markdownText = document.getElementById("markdown-input").value;

    const html = markdownText
        .replace(/^# (.+)/gm, "<h1>$1</h1>")
        .replace(/^## (.+)/gm, "<h2>$1</h2>")
        .replace(/^### (.+)/gm, "<h3>$1</h3>")
        .replace(/^#### (.+)/gm, "<h4>$1</h4>")
        .replace(/^##### (.+)/gm, "<h5>$1</h5>")
        .replace(/^###### (.+)/gm, "<h6>$1</h6>")
        .replace(/\*\*(.+?)\*\*|__(.+?)__/g, "<strong>$1$2</strong>")
        .replace(/\*(.+?)\*|_(.+?)_/g, "<em>$1$2</em>")
        .replace(/!\[(.+?)\]\((.+?)\)/g, '<img alt="$1" src="$2">')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        .replace(/^> (.+)/gm, '<blockquote>$1</blockquote>')

    return html;
}

const inputText = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const htmlPreview = document.getElementById("preview");

inputText.addEventListener("input", () => {
    const conversion = convertMarkdown();

    htmlOutput.innerText = conversion;
    htmlPreview.innerHTML = conversion;
})