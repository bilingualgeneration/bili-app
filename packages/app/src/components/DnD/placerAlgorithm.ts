export interface Dimensions {
  width: number;
  height: number;
}

export interface PositionedItem extends Dimensions {
  x: number;
  y: number;
}

export interface PlacementResult {
  fixedTextPlacements: PositionedItem[][];
  fixedImagePlacement?: PositionedItem;
  piecePlacements: PositionedItem[];
}

// Constants
const WORD_SPACING = 15;
const LETTER_SPACING = 0;
const LINE_SPACING = 20;
const IMAGE_TEXT_MARGIN = 20; // Space between image and text

function isWithinCanvas(canvas: Dimensions, item: PositionedItem): boolean {
  return (
    item.x >= 0 &&
    item.y >= 0 &&
    item.x + item.width <= canvas.width &&
    item.y + item.height <= canvas.height
  );
}

function hasOverlap(
  existingItems: PositionedItem[],
  newItem: PositionedItem,
): boolean {
  return existingItems.some(
    (existing) =>
      newItem.x < existing.x + existing.width &&
      newItem.x + newItem.width > existing.x &&
      newItem.y < existing.y + existing.height &&
      newItem.y + newItem.height > existing.y,
  );
}

export function placeItemsOnCanvas(
  canvas: Dimensions,
  pieces: Dimensions[],
  fixedText: Dimensions[][],
  fixedImage?: Dimensions,
  maxAttempts = 1000,
): PlacementResult | null {
  const fixedItems: PositionedItem[] = [];
  const fixedTextPlacements: PositionedItem[][] = [];

  // Place image first (perfectly centered horizontally at top)
  let fixedImagePlacement: PositionedItem | undefined;
  if (fixedImage) {
    fixedImagePlacement = {
      x: Math.max(0, Math.floor((canvas.width - fixedImage.width) / 2)), // Ensure positive position
      y: 0, // Fixed to top
      ...fixedImage,
    };
    fixedItems.push(fixedImagePlacement);
  }

  // Calculate starting Y position for text
  const startY = fixedImage
    ? fixedImage.height + IMAGE_TEXT_MARGIN // Fixed margin below image
    : 0;
  // Group words into lines
  const lines: Dimensions[][][] = [];
  let currentLine: Dimensions[][] = [];
  let currentLineWidth = 0;

  for (const word of fixedText) {
    const wordWidth = word.reduce((sum, letter) => sum + letter.width, 0);
    const wordWidthWithSpacing =
      currentLine.length > 0 ? wordWidth + WORD_SPACING : wordWidth;

    if (
      currentLineWidth + wordWidthWithSpacing > canvas.width &&
      currentLine.length > 0
    ) {
      lines.push(currentLine);
      currentLine = [];
      currentLineWidth = 0;
    }

    currentLine.push(word);
    currentLineWidth += wordWidthWithSpacing;
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  // Place each line centered
  let currentY = startY;
  let maxLineHeight = 0;

  for (const line of lines) {
    const lineWidth =
      line.reduce(
        (sum, word) =>
          sum + word.reduce((wSum, letter) => wSum + letter.width, 0),
        0,
      ) +
      (line.length - 1) * WORD_SPACING;

    const startX = Math.max(0, Math.floor((canvas.width - lineWidth) / 2));

    const linePlacements: PositionedItem[] = [];
    let currentX = startX;

    for (const word of line) {
      for (const letter of word) {
        const letterPlacement: PositionedItem = {
          x: currentX,
          y: currentY,
          ...letter,
        };
        linePlacements.push(letterPlacement);
        fixedItems.push(letterPlacement);
        currentX += letter.width + LETTER_SPACING;

        if (letter.height > maxLineHeight) {
          maxLineHeight = letter.height;
        }
      }

      if (word !== line[line.length - 1]) {
        currentX += WORD_SPACING;
      }
    }

    fixedTextPlacements.push(linePlacements);
    currentY += maxLineHeight + LINE_SPACING;
    maxLineHeight = 0;
  }

  // Place other pieces randomly
  const piecePlacements: PositionedItem[] = [];
  const allItems = [...fixedItems];

  for (const piece of pieces) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < maxAttempts) {
      attempts++;
      const x = Math.floor(Math.random() * (canvas.width - piece.width));
      const y = Math.floor(Math.random() * (canvas.height - piece.height));

      const newItem: PositionedItem = { x, y, ...piece };

      if (isWithinCanvas(canvas, newItem) && !hasOverlap(allItems, newItem)) {
        allItems.push(newItem);
        piecePlacements.push(newItem);
        placed = true;
      }
    }

    if (!placed) return null;
  }

  return {
    fixedTextPlacements,
    fixedImagePlacement,
    piecePlacements,
  };
}
