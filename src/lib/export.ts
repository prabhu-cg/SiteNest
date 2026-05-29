import html2canvas from 'html2canvas';
import type { SitemapNode, Edge, ExportOptions } from '@/types';

export async function exportToPNG(
  canvasElement: HTMLElement,
  fileName: string = 'sitemap.png'
) {
  try {
    const canvas = await html2canvas(canvasElement, {
      allowTaint: true,
      useCORS: true,
      backgroundColor: '#FFFFFF',
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = fileName;
    link.click();
  } catch (error) {
    console.error('PNG export failed:', error);
    throw new Error('Failed to export PNG');
  }
}

export function exportToJSON(
  nodes: SitemapNode[],
  edges: Edge[],
  projectTitle: string = 'Sitemap',
  fileName: string = 'sitemap.json'
) {
  try {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      project: projectTitle,
      nodes: nodes.map((node) => ({
        id: node.id,
        title: node.title,
        slug: node.url_slug,
        description: node.description,
        status: node.status,
        icon: node.icon,
        color: node.color,
        children: edges
          .filter((edge) => edge.source_node_id === node.id)
          .map((edge) => edge.target_node_id),
      })),
      edges: edges.map((edge) => ({
        from: edge.source_node_id,
        to: edge.target_node_id,
      })),
    };

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('JSON export failed:', error);
    throw new Error('Failed to export JSON');
  }
}

export function generateSitemapHTML(
  nodes: SitemapNode[],
  edges: Edge[],
  projectTitle: string = 'Sitemap'
): string {
  const buildTree = (parentId: string | null = null, depth = 0): string => {
    const children = nodes.filter((n) => n.parent_id === parentId);
    if (!children.length) return '';

    const listItems = children
      .map((node) => {
        const nodeEdges = edges.filter((e) => e.source_node_id === node.id);
        const hasChildren = nodeEdges.length > 0;

        return `
          <li>
            <span class="page" style="color: ${node.color}">
              ${node.icon ? `<span class="icon">${node.icon}</span>` : ''}
              ${node.title}
            </span>
            ${node.url_slug ? `<code>${node.url_slug}</code>` : ''}
            ${node.description ? `<p>${node.description}</p>` : ''}
            ${buildTree(node.id, depth + 1)}
          </li>
        `;
      })
      .join('');

    return `<ul style="margin-left: ${depth * 20}px">${listItems}</ul>`;
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${projectTitle}</title>
      <style>
        body { font-family: system-ui, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #EE661D; }
        ul { list-style: none; padding: 0; }
        li { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
        .page { font-weight: bold; font-size: 16px; }
        .icon { margin-right: 8px; }
        code { background: #eee; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
        p { margin: 5px 0 0 0; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <h1>${projectTitle}</h1>
      <p>Generated on ${new Date().toLocaleDateString()}</p>
      ${buildTree()}
    </body>
    </html>
  `;
}
