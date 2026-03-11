const ALL = '__ALL__';
const NONE = '__NONE__';

export const MATERIAL_RULES = {
    /*
    subgradeByGrade: {
        PE: ['LDPE', 'LLDPE', 'MDPE', 'HDPE', 'HMW', 'UHMW'],
        PP: ['BOPP', 'Homopolymer', 'Copolymer'],
        ALL
    },
    */
    subgradeRules: [
        {
            grades: 'PE',
            allowedSubgrades: ['LDPE', 'LLDPE', 'MDPE', 'HDPE', 'HMW', 'UHMW'],
        },
        {
            grades: 'PP',
            allowedSubgrades: ['BOPP', 'Homopolymer', 'Copolymer']
        },
        {
            grades: ['PET', 'PC', 'ABS', 'PC/ABS', 'POM', 'Acrylic', 'Misc. Resin', 'TPE', 'TPO', 'TPU', 'PETG'],
            allowedSubgrades: NONE
        },
        {
            grades: 'PS',
            allowedSubgrades: ['HIPS', 'GPPS', 'CPS', 'EPS', 'MIPS', 'OPS']
        },
        {
            grades: 'PA',
            allowedSubgrades: ['PA6', 'PA66', 'PA666', 'PA12']
        },
        {
            grades: 'PVC',
            allowedSubgrades: ['Flex', 'Rigid', 'Blister', 'CPVC']
        },
        {
            grades: 'Paper',
            allowedSubgrades: ['Cardboard', 'Cores', 'Gaylord', 'Mixed Paper']
        },
        {
            grades: 'Laminate',
            allowedSubgrades: ['Foil', 'PE/PET', 'PP/PET', 'Other']
        },
    ],

    formRules: [
        {
            grades: 'PE',
            subgrades: ['LDPE', 'LLDPE', 'MDPE', 'HDPE', 'HMW'],
            allowedForms: ['Film', 'Fines', 'Part', 'Pellet', 'Powder', 'Purge', 'Regrind', 'Sheet']
        },
        {
            grades: 'PE',
            subgrades: ['UHMW'],
            allowedForms: ['Fines', 'Part', 'Pellet', 'Powder', 'Purge', 'Regrind', 'Sheet']
        },
        {
            grades: 'PP',
            subgrades: ['BOPP'],
            allowedForms: ['Film', 'Fines', 'Pellet', 'Purge', 'Sheet']
        },
        {
            grades: 'PP',
            subgrades: ['Homopolymer', 'Copolymer'],
            allowedForms: ALL
        },
        {
            grades: ['PET', 'Misc. Resin', 'PA'],
            subgrades: ALL,
            allowedForms: ALL
        },
        {
            grades: ['PS', 'PVC'],
            subgrades: ['HIPS', 'GPPS', 'CPS', 'EPS', 'MIPS', 'OPS', 'Flex', 'Rigid', 'Blister', 'CPVC'],
            allowedForms: ['Pellet', 'Regrind', 'Part', 'Purge', 'Film', 'Sheet', 'Fines', 'Powder']
        },
        {
            grades: ['TPE', 'TPO', 'TPU', 'PETG'],
            subgrades: NONE,
            allowedForms: ['Pellet', 'Regrind', 'Part', 'Purge', 'Film', 'Sheet', 'Fines', 'Powder']
        },
        {
            grades: ['PC', 'ABS', 'PC/ABS', 'POM', 'Acrylic'],
            subgrades: NONE,
            allowedForms: ['Pellet', 'Regrind', 'Part', 'Purge', 'Sheet', 'Fines', 'Powder']
        },
        {
            grades: 'Paper',
            subgrades: 'Cardboard',
            allowedForms: 'Sheet'
        },
        {
            grades: 'Paper',
            subgrades: 'Cores',
            allowedForms: 'Part'
        },
        {
            grades: 'Paper',
            subgrades: 'Gaylord',
            allowedForms: 'Fines'
        },
        {
            grades: 'Paper',
            subgrades: 'Mixed Paper',
            allowedForms: []
        },
        {
            grades: 'Laminate',
            subgrades: 'Foil',
            allowedForms: 'Film'
        },
        {
            grades: 'Laminate',
            subgrades: 'PE/PET',
            allowedForms: 'Sheet'
        },
        {
            grades: 'Laminate',
            subgrades: 'PP/PET',
            allowedForms: 'Part'
        },
        {
            grades: 'Laminate',
            subgrades: 'Other',
            allowedForms:[]
        },
    ],

    subformRules: [
        {
            forms: ['Part'],
            allowedSubforms: ['Bottle', 'Injection', 'Profile', 'Roto']
        },
        {
            formsExclude: ['Part'],
            allowedSubforms: NONE
        }
    ],

    colorRules: [
        {
            grades: ['PE', 'PP', 'TPE', 'TPO', 'TPU'],
            allowedColors: ['Natural', 'Mixed', 'Metalized']
        },
        {
            grades: ['PS'],
            allowedColors: ['Natural', 'Mixed', 'Metalized', 'Clear']
        },
        {
            grades: ['PA'],
            allowedColors: ['Natural', 'Mixed','Clear']
        },
        {
            grades: ['PVC', 'PC', 'ABS','PC/ABS', 'POM', 'Acrylic', 'Misc. Resin', 'PETG'],
            allowedColors: ['Mixed','Clear']
        },
        {
            grades: ['Laminate', 'PET'],
            allowedColors: ['Mixed', 'Metalized', 'Clear']
        },
        {
            grades: ['Paper'],
            allowedColors: []
        }
    ],

    subcolorRules: [
        {
            grades: ['PE', 'PP', 'PET', 'PS', 'TPE', 'TPO', 'TPU', 'Laminate', 'PETG'], 
            colors: ['Mixed'],
            allowedSubcolors: ['Printed', 'Black', 'White']
        },
        {
            grades: ['PA', 'PVC', 'PC', 'ABS', 'PC/ABS', 'POM', 'Acrylic', 'Misc. Resin'], 
            colors: ['Mixed'],
            allowedSubcolors: ['Black', 'White']
        },
        {
            grades: ['PVC'], 
            colors: ['Clear'],
            allowedSubcolors: ['Blue Tint']
        },
        /*
        {
            formsExclude: ['Mixed'],
            allowedSubcolors: NONE
        }
        */
    ],

    packageRules: [
        {
            forms: ['Pellet', 'Regrind', 'Fines', 'Powder'],
            allowedPackages: ['Gaylord', 'Supersack', 'Boxed', 'Pallet', 'Returnable']
        },
        {
            forms: ['Part'],
            allowedPackages: ['Gaylord', 'Bale', 'Loose', 'Pallet', 'Returnable']
        },
        {
            forms: ['Film', 'Sheet'],
            allowedPackages: ['Gaylord', 'Bale', 'Loose', 'Pallet', 'Roll', 'Boxed', 'Returnable']
        },
        {
            forms: ['Purge'],
            allowedPackages: ['Gaylord', 'Loose', 'Pallet', 'Returnable']
        },
        {
            forms: ['Non-woven', 'Fiber'],
            allowedPackages: ['Gaylord', 'Pallet', 'Roll', 'Bale', 'Loose', 'Returnable']
        }
    ],

    meltRangeRules: [
        {
            grade: 'PE',
            meltRange: 'Frac',
            allowedSubgrades: ALL,
            allowedForms: ALL
        },
        {
            grade: 'PE',
            meltRange: '1 - 2',
            subgradesExclude: ['UHMW'],
            allowedForms: ALL
        },
        {
            grade: 'PE',
            meltRange: '3 - 8',
            subgradesExclude: ['UHMW', 'HMW'],
            allowedForms: ALL
        },
        {
            grade: 'PE',
            meltRange: '8 - 20',
            subgradesExclude: ['UHMW', 'HMW'],
            formsExclude: ['Film']
        },
        {
            grade: 'PE',
            meltRange: '20 - 100',
            subgradesExclude: ['UHMW', 'HMW'],
            formsExclude: ['Film', 'Sheet']
        },
        {
            grade: 'PE',
            meltRange: '100+',
            subgradesExclude: ['UHMW', 'HMW'],
            formsExclude: ['Film', 'Sheet']
        }
    ],

    additiveRules: [
        {
            grades: ['PE'],
            allowedAdditives: ALL
        },
    ],

    izodRules: [
        {
            grades: ['PE'],
            allowedIzod: NONE
        }
    ],

    impactRules: [
        {
            grades: ['PE'],
            allowedImpact: NONE
        },
        {
            gradesExclude: ['PE'],
            allowedImpact: ALL
        }
    ],

    meltIndexRules: [
        {
            meltRanges: ['1 - 2', '3 - 8', '8 - 20', '20 - 100', '100+'],
            allowedMeltIndex: ALL
        }
    ],

    fillRules: [
        {
            grades: ['PE'],
            allowedFills: ['Calcium', 'Talc']
        }
    ],

};

export { ALL };

export function getAllowedSubgrades(grade, allSubgradeValues) {
    /*
    if (!grade) {
        return allSubgradeValues;
    }

    const configured = MATERIAL_RULES.subgradeByGrade[grade];

    if (!configured || configured === ALL) {
        return allSubgradeValues;
    }

    return allSubgradeValues.filter((value) => configured.includes(value));
    */
    for (const rule of MATERIAL_RULES.subgradeRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        const excludeMatch = !rule.subgradesExclude || (grade && !rule.gradesExclude.includes(grade));

        if (includeMatch && excludeMatch) {
            if (rule.allowedSubgrades === ALL) {
                return allSubgradeValues;
            }

            else if (rule.allowedSubgrades === NONE) {
                return [];
            }

            return allSubgradeValues.filter((value) => rule.allowedSubgrades.includes(value));
        }
    }

    return allSubgradeValues;
}

export function getAllowedForms(grade, subgrade, allFormValues) {
    
    /* Grade not found, return all values */
    if (!grade) {
        return allFormValues;
    }

    for (const rule of MATERIAL_RULES.formRules) {

        /* Ensure grade match */
        if (!rule.grades.includes(grade)) {
            continue;
        }

        const includeMatch = (subgrade && rule.subgrades.includes(subgrade)) || rule.subgrades === NONE;

        //const includeMatch = !rule.subgrades || (subgrade && rule.subgrades.includes(subgrade));

        //const excludeMatch = !rule.subgradesExclude || (subgrade && !rule.subgradesExclude.includes(subgrade));
        // && excludeMatch
        if (includeMatch) {
            if (rule.allowedForms === ALL) {
                return allFormValues;
            }
            return allFormValues.filter((value) => rule.allowedForms.includes(value));
        }
    }

    return allFormValues;
}

export function getAllowedSubforms(form, allSubformValues) {

    for (const rule of MATERIAL_RULES.subformRules) {

        const includeMatch = !rule.forms || (form && rule.forms.includes(form));

        const excludeMatch = !rule.formsExclude || (form && !rule.formsExclude.includes(form));

        if (includeMatch && excludeMatch) {
            if (rule.allowedSubforms === ALL) {
                return allSubformValues;
            }

            else if (rule.allowedSubforms === NONE) {
                return [];
            }

            return allSubformValues.filter((value) => rule.allowedSubforms.includes(value));
        }
    }

    return allSubformValues;
}

export function getAllowedColors(grade, allColorValues) {

    for (const rule of MATERIAL_RULES.colorRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        const excludeMatch = !rule.gradesExclude || (grade && !rule.gradesExclude.includes(grade));

        if (includeMatch && excludeMatch) {
            if (rule.allowedColors === ALL) {
                return allColorValues;
            }

            return allColorValues.filter((value) => rule.allowedColors.includes(value));
        }
    }

    return allColorValues;
}

export function getAllowedSubcolors(grade, color, allSubcolorValues) {

    for (const rule of MATERIAL_RULES.subcolorRules) {

        const includeMatch = grade && color && rule.grades.includes(grade) && rule.colors.includes(color);
        //const excludeMatch = grade && color && (!rule.grades.includes(grade) || !rule.subcolorsExclude.includes(color));

        if (includeMatch) { //&& excludeMatch
            return allSubcolorValues.filter((value) => rule.allowedSubcolors.includes(value));
        }
    }
    return [];
    //return allSubcolorValues;
}

export function getAllowedPackages(form, allPackageValues) {

    for (const rule of MATERIAL_RULES.packageRules) {

        const includeMatch = !rule.forms || (form && rule.forms.includes(form));

        if (includeMatch) {
            if (rule.allowedPackages === ALL) {
                return allPackageValues;
            }

            return allPackageValues.filter((value) => rule.allowedPackages.includes(value));
        }
    }

    return allPackageValues;
}

export function getAllowedMeltRanges(grade, subgrade, form, allMeltRangeValues) {
    if (!grade) {
        return allMeltRangeValues;
    }

    const allowed = [];

    for (const rule of MATERIAL_RULES.meltRangeRules) {
        if (rule.grade !== grade) {
            continue;
        }

        const subgradeIncludeMatch =
            !rule.allowedSubgrades ||
            rule.allowedSubgrades === ALL ||
            (subgrade && rule.allowedSubgrades.includes(subgrade));

        const subgradeExcludeMatch =
            !rule.subgradesExclude ||
            !subgrade ||
            !rule.subgradesExclude.includes(subgrade);

        const formIncludeMatch =
            !rule.allowedForms ||
            rule.allowedForms === ALL ||
            (form && rule.allowedForms.includes(form));

        const formExcludeMatch =
            !rule.formsExclude ||
            !form ||
            !rule.formsExclude.includes(form);

        if (
            subgradeIncludeMatch &&
            subgradeExcludeMatch &&
            formIncludeMatch &&
            formExcludeMatch
        ) {
            allowed.push(rule.meltRange);
        }
    }

    return allMeltRangeValues.filter((value) => allowed.includes(value));
}

export function getAllowedAdditives(grade, allAdditiveValues) {

    for (const rule of MATERIAL_RULES.additiveRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        if (includeMatch) {
            if (rule.allowedAdditives === ALL) {
                return allAdditiveValues;
            }
            else if (rule.allowedAdditives === NONE) {
                return [];
            }
            return allAdditiveValues.filter((value) => rule.allowedAdditives.includes(value));
        }
    }

    return allAdditiveValues;
}

export function getAllowedIzod(grade, allIzodValues) {

    for (const rule of MATERIAL_RULES.izodRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        const excludeMatch = !rule.izodExclude || (grade && !rule.gradesExclude.includes(form));

        if (includeMatch && excludeMatch) {
            if (rule.allowedIzod === ALL) {
                return allIzodValues;
            }
            else if (rule.allowedIzod === NONE) {
                return [];
            }
            return allIzodValues.filter((value) => rule.allowedIzod.includes(value));
        }
    }

    return allIzodValues;
}

export function getAllowedImpact(grade) {

    for (const rule of MATERIAL_RULES.impactRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        const excludeMatch = !rule.impactExclude || (grade && !rule.gradesExclude.includes(grade));

        if (includeMatch && excludeMatch) {
            if (rule.allowedImpact === ALL) {
                return true;
            }
            else if (rule.allowedImpact === NONE) {
                return false;
            }
        }
    }

    return false;
}

export function getAllowedMeltIndex(meltRange) {

    for (const rule of MATERIAL_RULES.meltIndexRules) {

        const includeMatch = !rule.meltRanges || (meltRange && rule.meltRanges.includes(meltRange));

        const excludeMatch = !rule.meltRangeExclude || (meltRange && !rule.meltRangeExclude.includes(meltRange));

        if (includeMatch && excludeMatch) {
            if (rule.allowedMeltIndex === ALL) {
                return true;
            }
            else if (rule.allowedMeltIndex === NONE) {
                return false;
            }
        }
    }

    return false;
}

export function getAllowedFill(grade, allFillValues) {

    for (const rule of MATERIAL_RULES.fillRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        if (includeMatch) {
            if (rule.allowedFills === ALL) {
                return allFillValues;
            }
            else if (rule.allowedFills === NONE) {
                return [];
            }
            return allFillValues.filter((value) => rule.allowedFills.includes(value));
        }
    }

    return allFillValues;
}