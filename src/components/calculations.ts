export function calculateCell(team: string, length: number, length_reference: number) {
    let allometricWeight = 0;
    let referenceWeight = 0;
    let squareCubeLawWeight = 0;
    let allometricEffectAbsolute = 0;
    let allometricEffectRelative = 0;

    switch (team) {
        case "MacClain et al.":
            allometricWeight = 9.7723722 * Math.pow(length, 3);
            referenceWeight = 9.7723722 * Math.pow(length_reference, 3);
            break;
        case "Gottfried et al.":
            allometricWeight = 7.331551641 * Math.pow(length, 3.174);
            referenceWeight = 7.331551641 * Math.pow(length_reference, 3.174);
            break;
        case "Kohler et al.":
            allometricWeight =
                11.19585237 * Math.pow(0.9442 * length - 0.057441, 3.0848);
            referenceWeight =
                11.19585237 * Math.pow(0.9442 * length_reference - 0.057441, 3.0848);
            break;
        case "Tricas & McCosker":
            allometricWeight = 7.581996797 * Math.pow(length, 3.15);
            referenceWeight = 7.581996797 * Math.pow(length_reference, 3.15);
            break;
        case "Mollet & Cailliet":
            allometricWeight = 7.914 * Math.pow(length, 3.096);
            referenceWeight = 7.914 * Math.pow(length_reference, 3.096);
            break;
        case "Casey & Pratt":
            allometricWeight = 7.43911549848 * Math.pow(length, 3.09497);
            referenceWeight = 7.43911549848 * Math.pow(length_reference, 3.09497);
            break;
    }

    squareCubeLawWeight = referenceWeight * Math.pow(length / length_reference, 3);
    allometricEffectAbsolute = allometricWeight - squareCubeLawWeight;
    if(squareCubeLawWeight) {
        allometricEffectRelative = (allometricEffectAbsolute / squareCubeLawWeight) * 100;
    }

    return [
        allometricWeight,
        squareCubeLawWeight,
        allometricEffectAbsolute,
        allometricEffectRelative,
    ];
}