import { RichTextField } from '@prismicio/types';

/**
 * Converts Prismic Rich Text fields to HTML string
 * Handles common rich text elements like paragraphs, lists, and formatting
 * 
 * @param richTextField - The Prismic Rich Text field to convert
 * @returns HTML string representation of the rich text content
 */
export function richTextToHtml(richTextField: RichTextField): string {
  if (!richTextField || !Array.isArray(richTextField) || richTextField.length === 0) {
    return '';
  }

  // Track if we're in a list so we can properly wrap list items
  let inOrderedList = false;
  let inUnorderedList = false;
  let html = '';

  richTextField.forEach((block, index) => {
    // Check if we need to close a list before starting a new block type
    if ((inOrderedList || inUnorderedList) && 
        (block.type !== 'list-item' && block.type !== 'o-list-item')) {
      html += inOrderedList ? '</ol>' : '</ul>';
      inOrderedList = false;
      inUnorderedList = false;
    }

    // Handle different block types
    switch (block.type) {
      case 'paragraph':
        html += `<p>${processSpans(block.text, block.spans)}</p>`;
        break;

      case 'heading1':
        html += `<h1>${processSpans(block.text, block.spans)}</h1>`;
        break;

      case 'heading2':
        html += `<h2>${processSpans(block.text, block.spans)}</h2>`;
        break;

      case 'heading3':
        html += `<h3>${processSpans(block.text, block.spans)}</h3>`;
        break;

      case 'heading4':
        html += `<h4>${processSpans(block.text, block.spans)}</h4>`;
        break;

      case 'heading5':
        html += `<h5>${processSpans(block.text, block.spans)}</h5>`;
        break;

      case 'heading6':
        html += `<h6>${processSpans(block.text, block.spans)}</h6>`;
        break;

      case 'list-item':
        // Start a new unordered list if needed
        if (!inUnorderedList) {
          inUnorderedList = true;
          html += '<ul>';
        }
        html += `<li>${processSpans(block.text, block.spans)}</li>`;
        break;

      case 'o-list-item':
        // Start a new ordered list if needed
        if (!inOrderedList) {
          inOrderedList = true;
          html += '<ol>';
        }
        html += `<li>${processSpans(block.text, block.spans)}</li>`;
        break;

      case 'image':
        if (block.url) {
          html += `<img src="${block.url}" alt="${block.alt || ''}" />`;
        }
        break;

      case 'embed':
        if (block.oembed?.html) {
          html += block.oembed.html;
        }
        break;

      default:
        // For any unhandled types, just add the text
        if (block.text) {
          html += block.text;
        }
        break;
    }

    // Close lists at the end if needed
    if (index === richTextField.length - 1) {
      if (inOrderedList) {
        html += '</ol>';
      } else if (inUnorderedList) {
        html += '</ul>';
      }
    }
  });

  return html;
}

/**
 * Process spans within a text block (bold, italic, links, etc)
 * 
 * @param text - The text content
 * @param spans - Array of span objects that describe formatting
 * @returns Text with HTML formatting applied
 */
function processSpans(text: string, spans: any[] = []): string {
  if (!spans || spans.length === 0) {
    return escapeHtml(text);
  }

  // Sort spans by start position (ascending) and then by length (descending)
  // This ensures proper nesting of overlapping spans
  const sortedSpans = [...spans].sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return b.end - a.end; // Longer spans come first
  });

  // Process the text with the sorted spans
  let result = '';
  let position = 0;

  // Add text before spans
  sortedSpans.forEach(span => {
    if (span.start > position) {
      result += escapeHtml(text.substring(position, span.start));
    }

    const spanContent = escapeHtml(text.substring(span.start, span.end));

    // Apply the appropriate formatting based on span type
    switch (span.type) {
      case 'strong':
        result += `<strong>${spanContent}</strong>`;
        break;
      case 'em':
        result += `<em>${spanContent}</em>`;
        break;
      case 'hyperlink':
        let url = span.data?.url || '#';
        let target = span.data?.target || '_blank';
        result += `<a href="${url}" target="${target}" rel="noopener noreferrer">${spanContent}</a>`;
        break;
      default:
        result += spanContent;
        break;
    }

    position = span.end;
  });

  // Add any remaining text after the last span
  if (position < text.length) {
    result += escapeHtml(text.substring(position));
  }

  return result;
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default richTextToHtml;