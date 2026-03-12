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
            grades: ['PE'],
            forms: ['Part'],
            allowedSubforms: ['Bottle', 'Injection', 'Profile', 'Roto']
        },
        {
            grades: ['PP'],
            forms: ['Part'],
            allowedSubforms: ['Bottle']
        },
        {
            grades: ['PP'],
            forms: ['Non-woven'],
            allowedSubforms: ['Spunbond', 'Melt Blown', 'Needle Punch']
        },
        {
            grades: ['PET'],
            forms: ['Regrind'],
            allowedSubforms: ['Bottle', 'Preform', 'Sheet']
        },
        {
            grades: ['PET'],
            forms: ['Part'],
            allowedSubforms: ['Bottle', 'Preform', 'Injection']
        },
        {
            grades: ['PVC'],
            forms: ['Part'],
            allowedSubforms: ['Profile', 'Injection']
        },


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
            grades: 'PE',
            meltRanges: 'Frac',
            allowedSubgrades: ALL,
            allowedForms: ALL
        },
        {
            grades: 'PE',
            meltRanges: '1 - 2',
            subgradesExclude: ['UHMW'],
            allowedForms: ALL
        },
        {
            grades: 'PE',
            meltRanges: '3 - 8',
            subgradesExclude: ['UHMW', 'HMW'],
            allowedForms: ALL
        },
        {
            grades: 'PE',
            meltRanges: '8 - 20',
            subgradesExclude: ['UHMW', 'HMW'],
            formsExclude: ['Film']
        },
        {
            grades: 'PE',
            meltRanges: '20 - 100',
            subgradesExclude: ['UHMW', 'HMW'],
            formsExclude: ['Film', 'Sheet']
        },
        {
            grades: 'PE',
            meltRanges: '100+',
            subgradesExclude: ['UHMW', 'HMW'],
            formsExclude: ['Film', 'Sheet']
        },
        {
            grades: 'PP',
            meltRanges: ['Frac', '1 - 2', '3 - 8'],
            allowedSubgrades: ALL,
            formsExclude: ['Fiber', 'Non-woven']
        },
        {
            grades: 'PP',
            meltRanges: '8 - 20',
            allowedSubgrades: ALL,
            formsExclude: ['Film', 'Non-woven', 'Sheet']
        },
        {
            grades: 'PP',
            meltRanges: ['20 - 100', '100+'],
            allowedSubgrades: ALL,
            formsExclude: ['Film', 'Sheet']
        },
        {
            grades: ['TPE', 'TPO', 'TPU'],
            meltRanges: ['Frac', '1 - 2', '3 - 8'],
            allowedSubgrades: ALL,
            formsExclude: ['Fiber', 'Non-woven']
        },
        {
            grades: ['TPE', 'TPO', 'TPU'],
            meltRanges: '8 - 20',
            allowedSubgrades: ALL,
            formsExclude: ['Fiber', 'Non-woven', 'Film', 'Sheet']
        },
        {
            grades: ['TPE', 'TPO', 'TPU'],
            meltRanges: ['20 - 100', '100+'],
            allowedSubgrades: ALL,
            formsExclude: ['Film', 'Sheet']
        },
    ],

    additiveRules: [
        {
            grades: ['PE', 'Misc. Resin'],
            allowedAdditives: ALL
        },
        {
            grades: ['PP', 'TPE', 'TPO', 'TPU'],
            allowedAdditives: ['EVOH', 'PE/PP']
        },
        {
            grades: ['PET'],
            allowedAdditives: ['EVOH', 'Nylon']
        },
        {
            grades: ['PS'],
            allowedAdditives: ['EVOH']
        },
        {
            grades: ['PA', 'PC/ABS', 'POM', 'Acrylic'],
            allowedAdditives: ['FR']
        },
        {
            grades: ['PC', 'ABS', 'PETG'],
            allowedAdditives: ['FR']
        },
        {
            grades: ['Laminate'],
            allowedAdditives: ['Nylon', 'EVOH', 'EVA', 'PE/PP']
        },
        {
            grades: ['PVC', 'Paper'],
            allowedAdditives: NONE
        },
    ],

    izodRules: [
        {
            grades: ['PE', 'PET', 'PS', 'PA', 'PVC', 'PC', 'ABS', 'PC/ABS', 'POM', 'Acrylic', 'Paper', 'Misc. Resin', 'Laminate', 'PETG'],
            subgrades: ALL,
            allowedIzod: NONE
        },
        {
            grades: ['PP'],
            subgrades: ['Copolymer'],
            allowedIzod: ALL
        },
        {
            grades: ['PP'],
            subgrades: ['Homopolymer', 'BOPP'],
            allowedIzod: ['0 - 2']
        },
        {
            grades: ['TPE', 'TPO', 'TPU'],
            subgrades: ALL,
            allowedIzod: ALL
        }
    ],

    impactRules: [
        {
            grades: ['PE', 'PP', 'PET', 'PA', 'PVC', 'TPE', 'TPO', 'TPU', 'Laminate'],
            allowedImpact: NONE
        },
        {
            gradesExclude:  ['PE', 'PP', 'PET', 'PA', 'PVC', 'TPE', 'TPO', 'TPU', 'Laminate'],
            allowedImpact: ALL
        }
    ],

    ivRules: [
        {
            grades: ['PET'],
            allowedIv: ALL
        },
        {
            gradesExclude:  ['PET'],
            allowedIv: NONE
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
            forms: ALL,
            allowedFills: ['Calcium', 'Talc']
        },
        {
            grades: ['PP'],
            forms: ['Non-woven', 'Fiber'],
            allowedFills: ALL
        },
        {
            grades: ['PET', 'Paper'],
            forms: ALL,
            allowedFills: NONE
        },
        {
            grades: ['PS', 'PC', 'ABS', 'PC/ABS', 'POM', 'Acrylic', 'PETG'],
            forms: ALL,
            allowedFills: ['Glass']
        },
        {
            grades: ['Laminate'],
            forms: ALL,
            allowedFills: ['Calcium']
        },
        {
            grades: ['PA', 'PVC', 'Misc. Resin', 'TPE', 'TPO', 'TPU'],
            forms: ALL,
            allowedFills: ALL
        },
    ],

    durometerRules: [
        {
            grades: ['PVC'],
            subgrades: ['Flex'],
            allowedDurometer: ALL
        },
        {
            grades: ['TPE', 'TPO', 'TPU'],
            subgrades: ALL,
            allowedDurometer: ALL
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

export function getAllowedSubforms(grade, form, allSubformValues) {

    for (const rule of MATERIAL_RULES.subformRules) {

        const includeMatch = grade && form && rule.grades.includes(grade) && rule.forms.includes(form);

        //const excludeMatch = grade && form && (!rule.grades.includes(grade) || !rule.forms.includes(form));

        if (includeMatch) { // && excludeMatch
            return allSubformValues.filter((value) => rule.allowedSubforms.includes(value));
        }
    }

    return [];
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
    
    const allowed = [];

    for (const rule of MATERIAL_RULES.meltRangeRules) {

        /* match grade */
        if (!grade || !rule.grades.includes(grade)) {
            continue;
        }
        //console.log("0");
        const subgradeIncludeMatch = rule.allowedSubgrades && (rule.allowedSubgrades === ALL || (subgrade && rule.allowedSubgrades.includes(subgrade)));
        //console.log("1");
        const subgradeExcludeMatch = !subgrade || (rule.subgradesExclude && (rule.subgradesExclude === ALL || !rule.subgradesExclude.includes(subgrade)));
        //console.log("2");
        const formIncludeMatch = form && rule.allowedForms && (rule.allowedForms === ALL || rule.allowedForms.includes(form));
        //console.log("3");
        const formExcludeMatch = !form || (rule.formsExclude && (rule.formsExclude === ALL || !rule.formsExclude.includes(form)));
        //console.log("4");
        if ((subgradeIncludeMatch || subgradeExcludeMatch) && (formIncludeMatch || formExcludeMatch)) {
            if (Array.isArray(rule.meltRanges)) {
                allowed.push(...rule.meltRanges);
            } else {
                allowed.push(rule.meltRanges);
            }
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

export function getAllowedIzod(grade, subgrade, allIzodValues) {

    for (const rule of MATERIAL_RULES.izodRules) {

        /* Filter on the grade */
        if (!grade || !rule.grades.includes(grade)) {
            continue;
        }
        //console.log("passed grade");
        /* Filter on the subgrade */
        if (rule.subgrades !== ALL && (!subgrade || !rule.subgrades.includes(subgrade))) {
            continue;
        }
        //console.log("passed subgrade");
        if (rule.allowedIzod === ALL) {
            return allIzodValues;
        }
        else if (rule.allowedIzod === NONE) {
            return [];
        }
        //console.log("made to final return");
        return allIzodValues.filter((value) => rule.allowedIzod.includes(value));
    }

    return [];
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

export function getAllowedIv(grade) {

    for (const rule of MATERIAL_RULES.ivRules) {

        const includeMatch = !rule.grades || (grade && rule.grades.includes(grade));

        const excludeMatch = !rule.impactExclude || (grade && !rule.gradesExclude.includes(grade));

        if (includeMatch && excludeMatch) {
            if (rule.allowedIv === ALL) {
                return true;
            }
            else if (rule.allowedIv === NONE) {
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

export function getAllowedFill(grade, form, allFillValues) {

    for (const rule of MATERIAL_RULES.fillRules) {

        /* Filter on the grade */
        if (!grade || !rule.grades.includes(grade)) {
            continue;
        }

        /* Filter on the subgrade */
        if (rule.forms !== ALL && (!form || !rule.forms.includes(form))) {
            continue;
        }
  
        if (rule.allowedFills === ALL) {
            return allFillValues;
        }
        else if (rule.allowedFills === NONE) {
            return [];
        }
   
        return allFillValues.filter((value) => rule.allowedFills.includes(value));
    }

    return [];
}

export function getAllowedDurometer(grade, subgrade) {

    for (const rule of MATERIAL_RULES.durometerRules) {

        /* Filter on the grade */
        if (!grade || !rule.grades.includes(grade)) {
            continue;
        }

        /* Filter on the subgrade */
        if (rule.subgrades !== ALL && (!subgrade || !rule.subgrades.includes(subgrade))) {
            continue;
        }
  
        if (rule.allowedDurometer === ALL) {
            return true;
        }
        return false;
    }

    return false;
}