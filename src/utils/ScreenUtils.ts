export function DynamicSize(value: number, customWidth: number, standardScreenHeight = 375) {
    const dynamicSize = (value * customWidth) / standardScreenHeight;
    return Math.round(dynamicSize);
}
