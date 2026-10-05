const inputText = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const htmlPreview = document.getElementById("preview");
const themeButton = document.getElementById("theme-toggle");
const root = document.documentElement;

// PARSER
// converts text into html tags, handling markdown that takes up whole lines.
function convertMarkdown() {
  const lineSeparation = inputText.value.split("\n");
  let convertedLines = [];
  // state variable to track if <ul> has initiated.
  let inList = false;
  // state variable to track if ``` has initiated.
  let inCodeBlock = false;
  // state variable to track if <ol> has initiated.
  let inOrderedList = false;

  for (const elem of lineSeparation) {
    const listCheck = /^[-*] /.test(elem);
    const codeBlockCheck = /^```/.test(elem);
    const orderedListCheck = /^\d+\. /.test(elem);

    // parses codeBlock elements
    if (codeBlockCheck) {
      const html = elem.replace(/^```/, "<pre><code>");
      if (inList) {
        // closes lists if they were open before starting the code block
        convertedLines.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        // closes an ordered list left open before a code block
        convertedLines.push("</ol>");
        inOrderedList = false;
      }
      if (!inCodeBlock) {
        inCodeBlock = true;
        convertedLines.push(convertInline(html));
        continue;
      } else {
        convertedLines.push("</code></pre>");
        inCodeBlock = false;
        continue;
      }
    }
    if (inCodeBlock) {
      // pushes the input text inside the codeblock as raw text without parsing it.
      convertedLines.push(elem);
      continue;
    }

    // parses unordered list elements
    if (listCheck) {
      if (inOrderedList) {
        // closes an ordered list left open before a bullet list
        convertedLines.push("</ol>");
        inOrderedList = false;
      }
      const html = elem.replace(/^[-*] (.+)/, "<li>$1</li>");
      if (!inList) {
        convertedLines.push("<ul>");
        inList = true;
      }
      convertedLines.push(convertInline(html));
    } else if (orderedListCheck) {
      // parses ordered list elements
      if (inList) {
        // closes a bullet list left open before an ordered list
        convertedLines.push("</ul>");
        inList = false;
      }
      const html = elem.replace(/^\d+\. (.+)/, "<li>$1</li>");
      if (!inOrderedList) {
        convertedLines.push("<ol>");
        inOrderedList = true;
      }
      convertedLines.push(convertInline(html));
    } else {
      // the else closer only fires when another line follows
      if (inList) {
        convertedLines.push("</ul>");
        inList = false;
      }
      if (inOrderedList) {
        // closes an ordered list left open before a non-list line
        convertedLines.push("</ol>");
        inOrderedList = false;
      }
      const html = elem
        .replace(/^# (.+)/, "<h1>$1</h1>")
        .replace(/^## (.+)/, "<h2>$1</h2>")
        .replace(/^### (.+)/, "<h3>$1</h3>")
        .replace(/^#### (.+)/, "<h4>$1</h4>")
        .replace(/^##### (.+)/, "<h5>$1</h5>")
        .replace(/^###### (.+)/, "<h6>$1</h6>")
        .replace(/^> (.+)/, "<blockquote>$1</blockquote>")
        .replace(/^---$/, "<hr>");

      convertedLines.push(convertInline(html));
    }
  }
  // closes the unordered list after the loop ends when nothing follow the last list item.
  if (inList) {
    convertedLines.push("</ul>");
    inList = false;
  }
  // closes a code block left open when theres no element coming next.
  if (inCodeBlock) {
    convertedLines.push("</code></pre>");
    inCodeBlock = false;
  }
  // closes the ordered list after the loop ends when nothing follow the last list item.
  if (inOrderedList) {
    convertedLines.push("</ol>");
    inOrderedList = false;
  }

  return convertedLines.join("\n");
}

// PARSES INLINE ELEMENTS
function convertInline(text) {
  return text
    .split("`")
    .map((piece, index) => {
      if (index % 2 === 1) {
        return `<code>${piece}</code>`;
      }
      return piece
        .replace(/\*\*(.+?)\*\*|__(.+?)__/g, "<strong>$1$2</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/!\[(.+?)\]\((.+?)\)/g, '<img alt="$1" src="$2">')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    })
    .join("");
}

// INPUT MANIPULATION
inputText.addEventListener("input", () => {
  const conversion = convertMarkdown();

  htmlOutput.innerText = conversion;
  htmlPreview.innerHTML = conversion;
});

// THEME SWITCHER
themeButton.addEventListener("click", () => {
  if (root.hasAttribute("data-theme")) {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", "light");
  }
});
