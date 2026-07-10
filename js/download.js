export function downloadFile(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = Object.assign(document.createElement("a"), {
        href: url,
        download: name,
    });
    a.click();
    URL.revokeObjectURL(url);
}
