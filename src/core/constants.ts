export const COLORS = [
    '#FF0000', // 1: Red
    '#FF7F00', // 2: Orange
    '#FFFF00', // 3: Yellow
    '#00FF00', // 4: Lime/Light Green
    '#008000', // 5: Green/Dark Green
    '#00FFFF', // 6: Cyan/Light Blue
    '#0000FF', // 7: Blue
    '#800080', // 8: Purple
    '#FFC0CB', // 9: Pink
];

export const NUMBER_TO_COLOR: Record<number, string> = {
    1: '#dc2626', // Red (matched to image)
    2: '#ea580c', // Orange (matched to image)
    3: '#facc15', // Yellow (matched to image)
    4: '#4ade80', // Light Green (matched to image)
    5: '#166534', // Dark Green (matched to image)
    6: '#38bdf8', // Light Blue (matched to image)
    7: '#1e40af', // Dark Blue (matched to image)
    8: '#9333ea', // Purple (matched to image)
    9: '#ec4899', // Pink (Defaulting to Pink as 9th color)
};
