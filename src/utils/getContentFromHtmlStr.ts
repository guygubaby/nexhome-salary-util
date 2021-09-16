export const parseHtmlStr = (htmlStr: string): Document => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlStr, 'text/html')
  return doc
}

export const getContentFromHtmlStr = (htmlStr: string, selector: string): string | null => {
  const doc = parseHtmlStr(htmlStr)
  return doc.querySelector(selector)?.textContent || null
}
