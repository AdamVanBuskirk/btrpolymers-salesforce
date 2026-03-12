import { LightningElement, api, track, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord, createRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import { NavigationMixin } from 'lightning/navigation';

import MATERIAL_OBJECT from '@salesforce/schema/Material__c';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ID_FIELD from '@salesforce/schema/Material__c.Id';
import ACCOUNT_LOOKUP_FIELD from '@salesforce/schema/Material__c.Account__c';
import GRADE_FIELD from '@salesforce/schema/Material__c.Grade__c';
import SUBGRADE_FIELD from '@salesforce/schema/Material__c.Subgrade__c';
import FORM_FIELD from '@salesforce/schema/Material__c.Form__c';
import ACCOUNTS_MATERIAL_NAME_FIELD from '@salesforce/schema/Material__c.Account_Material_Name__c';
import COLOR_FIELD from '@salesforce/schema/Material__c.Color__c';
import SUBFORM_FIELD from '@salesforce/schema/Material__c.Subform__c';
import PRICE_FIELD from '@salesforce/schema/Material__c.Price__c';
import VOLUME_FIELD from '@salesforce/schema/Material__c.Volume__c';
import GAYLORD_FIELD from '@salesforce/schema/Material__c.Gaylord__c';
import PALLET_FIELD from '@salesforce/schema/Material__c.Pallet__c';
import ROLL_FIELD from '@salesforce/schema/Material__c.Roll__c';
import BALE_FIELD from '@salesforce/schema/Material__c.Bale__c';
import BOXED_FIELD from '@salesforce/schema/Material__c.Boxed__c';
import SUPERSACK_FIELD from '@salesforce/schema/Material__c.Supersack__c';
import LOOSE_FIELD from '@salesforce/schema/Material__c.Loose__c';
import RETURNABLE_FIELD from '@salesforce/schema/Material__c.Returnable__c';
import SUBCOLOR_FIELD from '@salesforce/schema/Material__c.Subcolor__c';
import MELTRANGE_FIELD from '@salesforce/schema/Material__c.Melt_Range__c';
import EVA_FIELD from '@salesforce/schema/Material__c.EVA__c';
import EVOH_FIELD from '@salesforce/schema/Material__c.EVOH__c';
import FR_FIELD from '@salesforce/schema/Material__c.FR__c';
import NYLON_FIELD from '@salesforce/schema/Material__c.Nylon__c';
import PE_PP_FIELD from '@salesforce/schema/Material__c.PE_PP__c';
import IZOD_FIELD from '@salesforce/schema/Material__c.Izod__c';
import IMPACT_FIELD from '@salesforce/schema/Material__c.Impact__c';
import MELTINDEX_FIELD from '@salesforce/schema/Material__c.Melt_Index__c';
import FILL_FIELD from '@salesforce/schema/Material__c.Fills__c';
import IV_FIELD from '@salesforce/schema/Material__c.IV__c';
import DUROMETER_FIELD from '@salesforce/schema/Material__c.Durometer__c';

import { getAllowedSubgrades, getAllowedForms, getAllowedSubforms, getAllowedColors, getAllowedPackages, 
    getAllowedSubcolors, getAllowedMeltRanges, getAllowedAdditives, getAllowedIzod, getAllowedImpact, 
    getAllowedMeltIndex, getAllowedFill, getAllowedIv, getAllowedDurometer } from './materialConfiguratorRules';

const MATERIAL_FIELDS = [
    ID_FIELD,
    ACCOUNT_LOOKUP_FIELD,
    GRADE_FIELD,
    SUBGRADE_FIELD,
    FORM_FIELD,
    ACCOUNTS_MATERIAL_NAME_FIELD,
    COLOR_FIELD,
    SUBFORM_FIELD,
    PRICE_FIELD,
    VOLUME_FIELD,
    GAYLORD_FIELD,
    PALLET_FIELD,
    ROLL_FIELD,
    BALE_FIELD,
    BOXED_FIELD,
    SUPERSACK_FIELD,
    LOOSE_FIELD,
    RETURNABLE_FIELD,
    SUBCOLOR_FIELD,
    MELTRANGE_FIELD,
    EVA_FIELD,
    EVOH_FIELD,
    FR_FIELD,
    NYLON_FIELD,
    PE_PP_FIELD,
    IZOD_FIELD,
    IMPACT_FIELD,
    MELTINDEX_FIELD,
    FILL_FIELD,
    IV_FIELD,
    DUROMETER_FIELD
];

const ACCOUNT_FIELDS = [ACCOUNT_NAME_FIELD];

export default class MaterialConfigurator extends NavigationMixin(LightningElement) {
    @api recordId;
    @api objectApiName;

    @track grade = '';
    @track subgrade = '';
    @track form = '';
    @track subform = '';
    @track accountsMaterialName = '';
    @track accountId = '';
    @track accountName = '';
    @track color = '';
    @track price = '';
    @track volume = '';
    @track subcolor = '';
    @track meltRange = '';
    @track izod = '';
    @track impact = '';
    @track iv = '';
    @track durometer = '';
    @track meltIndex = '';
    @track fill = '';
    
    // checkboxes
    @track gaylord = false;
    @track pallet = false;
    @track roll = false;
    @track bale = false;
    @track boxed = false;
    @track supersack = false;
    @track loose = false;
    @track returnable = false;
    @track eva = false;
    @track evoh = false;
    @track fr = false;
    @track nylon = false;
    @track pepp = false;

    // ui
    //@track errorMessage = '';
    @track isLoading = true;

    recordTypeId;

    gradeOptions = [];
    allSubgradeOptions = [];
    allFormOptions = [];
    allSubformOptions = [];
    allColorOptions = [];
    allSubcolorOptions = [];
    allMeltRangeOptions = [];
    allIzodOptions = [];
    allFillOptions = [];

    objectInfoLoaded = false;
    gradeLoaded = false;
    subgradeLoaded = false;
    formLoaded = false;
    subformLoaded = false;
    recordLoaded = false;
    accountLoaded = false;
    colorLoaded = false;
    subcolorLoaded = false;
    priceLoaded = false;
    volumeLoaded = false;
    meltRangeLoaded = false;
    izodLoaded = false;
    fillLoaded = false;

    get isMaterialContext() {
        return this.objectApiName === 'Material__c';
    }

    get isAccountContext() {
        return this.objectApiName === 'Account';
    }

    get isEditMode() {
        return this.isMaterialContext && !!this.recordId;
    }

    get isCreateFromAccountMode() {
        return this.isAccountContext && !!this.recordId;
    }

    get cardTitle() {
        if (this.isEditMode) {
            return 'Edit Material';
        }
        return 'New Material';
    }

    get saveButtonLabel() {
        return this.isEditMode ? 'Update' : 'Save';
    }

    get isSaveDisabled() {
        return this.isLoading || !this.grade || !this.accountId;
    }

    get showAccountField() {
        return !!this.accountName;
    }

    get allowedPackageValues() {
        return getAllowedPackages(this.form, [
            'Gaylord',
            'Pallet',
            'Roll',
            'Bale',
            'Boxed',
            'Supersack',
            'Loose',
            'Returnable'
        ]);
    }

    get visiblePackages() {
        const allowedPackages = this.allowedPackageValues;
    
        const allPackages = [
            { name: 'gaylord', label: 'Gaylord', checked: this.gaylord },
            { name: 'pallet', label: 'Pallet', checked: this.pallet },
            { name: 'roll', label: 'Roll', checked: this.roll },
            { name: 'bale', label: 'Bale', checked: this.bale },
            { name: 'boxed', label: 'Boxed', checked: this.boxed },
            { name: 'supersack', label: 'Supersack', checked: this.supersack },
            { name: 'loose', label: 'Loose', checked: this.loose },
            { name: 'returnable', label: 'Returnable', checked: this.returnable }
        ];
    
        return allPackages.filter(pkg =>
            allowedPackages.includes(pkg.label)
        );
    }

    get allowedAdditiveValues() {
        return getAllowedAdditives(this.grade, [
            'EVA',
            'EVOH',
            'FR',
            'Nylon',
            'PE/PP'
        ]);
    }

    get visibleAdditives() {
        const allowedAdditives = this.allowedAdditiveValues;
    
        const allAdditives = [
            { name: 'eva', label: 'EVA', checked: this.eva },
            { name: 'evoh', label: 'EVOH', checked: this.evoh },
            { name: 'fr', label: 'FR', checked: this.fr },
            { name: 'nylon', label: 'Nylon', checked: this.nylon },
            { name: 'pepp', label: 'PE/PP', checked: this.pepp },
        ];
    
        return allAdditives.filter(additive =>
            allowedAdditives.includes(additive.label)
        );
    }

    get filteredSubgradeOptions() {
        const allowedValues = getAllowedSubgrades(
            this.grade,
            this.allSubgradeOptions.map((o) => o.value)
        );

        return this.allSubgradeOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasSubgradeOptions() {
        return this.filteredSubgradeOptions && this.filteredSubgradeOptions.length > 0;
    }

    get filteredFormOptions() {
        const allowedValues = getAllowedForms(
            this.grade,
            this.subgrade,
            this.allFormOptions.map((o) => o.value)
        );

        return this.allFormOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasFormOptions() {
        return this.filteredFormOptions && this.filteredFormOptions.length > 0;
    }

    get filteredSubformOptions() {
        const allowedValues = getAllowedSubforms(
            this.grade,
            this.form,
            this.allSubformOptions.map((o) => o.value)
        );

        return this.allSubformOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasSubformOptions() {
        return this.filteredSubformOptions && this.filteredSubformOptions.length > 0;
    }

    get filteredFillOptions() {
        const allowedValues = getAllowedFill(
            this.grade,
            this.form,
            this.allFillOptions.map((o) => o.value)
        );

        return this.allFillOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasFillOptions() {
        return this.filteredFillOptions && this.filteredFillOptions.length > 0;
    }

    get filteredIzodOptions() {
        const allowedValues = getAllowedIzod(
            this.grade,
            this.subgrade,
            this.allIzodOptions.map((o) => o.value)
        );

        return this.allIzodOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasIzodOptions() {
        return this.filteredIzodOptions && this.filteredIzodOptions.length > 0;
    }

    get filteredColorOptions() {
        const allowedValues = getAllowedColors(
            this.grade,
            this.allColorOptions.map((o) => o.value)
        );

        return this.allColorOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasColorOptions() {
        return this.filteredColorOptions && this.filteredColorOptions.length > 0;
    }

    get hasSelectedPackage() {
        return this.visiblePackages.some((pkg) => pkg.checked);
    }

    get filteredSubcolorOptions() {
        const allowedValues = getAllowedSubcolors(
            this.grade,
            this.color,
            this.allSubcolorOptions.map((o) => o.value)
        );

        return this.allSubcolorOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasSubcolorOptions() {
        return this.filteredSubcolorOptions && this.filteredSubcolorOptions.length > 0;
    }

    get filteredMeltRangeOptions() {
        const allowedValues = getAllowedMeltRanges(
            this.grade,
            this.subgrade,
            this.form,
            this.allMeltRangeOptions.map((o) => o.value)
        );

        return this.allMeltRangeOptions.filter((option) =>
            allowedValues.includes(option.value)
        );
    }

    get hasMeltRangeOptions() {
        return this.filteredMeltRangeOptions && this.filteredMeltRangeOptions.length > 0;
    }

    get showImpact() {
        return getAllowedImpact(this.grade);
    }

    get showIv() {
        return getAllowedIv(this.grade);
    }

    get showDurometer() {
        return getAllowedDurometer(this.grade, this.subgrade);
    }

    get showMeltIndex() {
        return getAllowedMeltIndex(this.meltRange);
    }

    @wire(getObjectInfo, { objectApiName: MATERIAL_OBJECT })
    wiredObjectInfo({ data, error }) {
        if (data) {
            this.recordTypeId = data.defaultRecordTypeId;
            this.objectInfoLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Material metadata');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: GRADE_FIELD
    })
    wiredGradeValues({ data, error }) {
        if (data) {
            this.gradeOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.gradeLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Grade values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: SUBGRADE_FIELD
    })
    wiredSubgradeValues({ data, error }) {
        if (data) {
            this.allSubgradeOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.subgradeLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Subgrade values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: FORM_FIELD
    })
    wiredFormValues({ data, error }) {
        if (data) {
            this.allFormOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.formLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Form values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: SUBFORM_FIELD
    })
    wiredSubformValues({ data, error }) {
        if (data) {
            this.allSubformOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.subformLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Subform values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: FILL_FIELD
    })
    wiredFillValues({ data, error }) {
        if (data) {
            this.allFillOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.fillLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Fill values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: IZOD_FIELD
    })
    wiredIzodValues({ data, error }) {
        if (data) {
            this.allIzodOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.izodLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Izod values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: COLOR_FIELD
    })
    wiredColorValues({ data, error }) {
        if (data) {
            this.allColorOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.colorLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Color values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: SUBCOLOR_FIELD
    })
    wiredSubcolorValues({ data, error }) {
        if (data) {
            this.allSubcolorOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.subcolorLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Subcolor values');
        }
    }

    @wire(getPicklistValues, {
        recordTypeId: '$recordTypeId',
        fieldApiName: MELTRANGE_FIELD
    })
    wiredMeltRangeValues({ data, error }) {
        if (data) {
            this.allMeltRangeOptions = data.values.map((v) => ({
                label: v.label,
                value: v.value
            }));
            this.meltRangeLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Melt Ranges');
        }
    }

    @wire(getRecord, { recordId: '$materialRecordId', fields: MATERIAL_FIELDS })
    wiredMaterialRecord({ data, error }) {
        if (!this.materialRecordId) {
            this.recordLoaded = true;
            this.checkIfReady();
            return;
        }

        if (data) {
            this.accountId = data.fields.Account__c?.value || '';
            this.grade = data.fields.Grade__c?.value || '';
            this.subgrade = data.fields.Subgrade__c?.value || '';
            this.form = data.fields.Form__c?.value || '';
            this.subform = data.fields.Subform__c?.value || '';
            this.fill = data.fields.Fills__c?.value || '';
            this.izod = data.fields.Izod__c?.value || '';
            this.color = data.fields.Color__c?.value || '';
            this.subcolor = data.fields.Subcolor__c?.value || '';
            this.meltRange = data.fields.Melt_Range__c?.value || '';
            this.price = data.fields.Price__c?.value || '';
            this.volume = data.fields.Volume__c?.value || '';
            this.impact = data.fields.Impact__c?.value || '';
            this.iv = data.fields.IV__c?.value || '';
            this.durometer = data.fields.Durometer__c?.value || '';
            this.meltIndex = data.fields.Melt_Index__c?.value || '';
            this.accountsMaterialName = data.fields.Account_Material_Name__c?.value || '';
            this.gaylord = data.fields.Gaylord__c?.value || false;
            this.pallet = data.fields.Pallet__c?.value || false;
            this.roll = data.fields.Roll__c?.value || false;
            this.bale = data.fields.Bale__c?.value || false;
            this.boxed = data.fields.Boxed__c?.value || false;
            this.supersack = data.fields.Supersack__c?.value || false;
            this.loose = data.fields.Loose__c?.value || false;
            this.returnable = data.fields.Returnable__c?.value || false;
            this.eva = data.fields.EVA__c?.value || false;
            this.evoh = data.fields.EVOH__c?.value || false;
            this.fr = data.fields.FR__c?.value || false;
            this.nylon = data.fields.Nylon__c?.value || false;
            this.pepp = data.fields.PE_PP__c?.value || false;

            this.recordLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Material record');
        }
    }

    @wire(getRecord, { recordId: '$accountRecordId', fields: ACCOUNT_FIELDS })
    wiredAccountRecord({ data, error }) {
        if (!this.accountRecordId) {
            this.accountLoaded = true;
            this.checkIfReady();
            return;
        }

        if (data) {
            this.accountId = this.accountRecordId;
            this.accountName = data.fields.Name?.value || '';
            this.accountLoaded = true;
            this.checkIfReady();
        } else if (error) {
            this.handleError(error, 'Error loading Account');
        }
    }

    get materialRecordId() {
        return this.isMaterialContext ? this.recordId : null;
    }

    get accountRecordId() {
        if (this.isCreateFromAccountMode) {
            return this.recordId;
        }
        if (this.accountId && !this.isCreateFromAccountMode) {
            return this.accountId;
        }
        return null;
    }

    checkIfReady() {
        const baseReady =
            this.objectInfoLoaded &&
            this.gradeLoaded &&
            this.subgradeLoaded &&
            this.formLoaded &&
            this.subformLoaded &&
            this.fillLoaded &&
            this.colorLoaded &&
            this.subcolorLoaded &&
            this.meltRangeLoaded &&
            this.izodLoaded &&
            this.recordLoaded &&
            this.accountLoaded;

        if (baseReady) {
            this.normalizeSelections();
            this.isLoading = false;
        }
    }

    normalizeSelections() {
        const validSubgradeValues = this.filteredSubgradeOptions.map((o) => o.value);

        if (this.subgrade && !validSubgradeValues.includes(this.subgrade)) {
            this.subgrade = '';
        }

        const validFormValues = getAllowedForms(
            this.grade,
            this.subgrade,
            this.allFormOptions.map((o) => o.value)
        );

        if (this.form && !validFormValues.includes(this.form)) {
            this.form = '';
        }

        const validSubformValues = getAllowedSubforms(
            this.grade,
            this.form,
            this.allSubformOptions.map((o) => o.value)
        );

        if (this.subform && !validSubformValues.includes(this.subform)) {
            this.subform = '';
        }

        const validColorValues = getAllowedColors(
            this.grade,
            this.allColorOptions.map((o) => o.value)
        );

        if (this.color && !validColorValues.includes(this.color)) {
            this.color = '';
        }

        const validSubcolorValues = getAllowedSubcolors(
            this.grade,
            this.color,
            this.allSubcolorOptions.map((o) => o.value)
        );

        if (this.subcolor && !validSubcolorValues.includes(this.subcolor)) {
            this.subcolor = '';
        }

        const validMeltRangeValues = getAllowedMeltRanges(
            this.grade,
            this.subgrade,
            this.form,
            this.allMeltRangeOptions.map((o) => o.value)
        );

        if (this.meltRange && !validMeltRangeValues.includes(this.meltRange)) {
            this.meltRange = '';
        }

        const validIzodValues = getAllowedIzod(
            this.grade,
            this.subgrade,
            this.allIzodOptions.map((o) => o.value)
        );

        if (this.izod && !validIzodValues.includes(this.izod)) {
            this.izod = '';
        }

        const validFillValues = getAllowedFill(
            this.fill,
            this.form,
            this.allFillOptions.map((o) => o.value)
        );

        if (this.fill && !validFillValues.includes(this.fill)) {
            this.fill = '';
        }

        const allowedPackages = this.allowedPackageValues;

        if (!allowedPackages.includes('Gaylord')) this.gaylord = false;
        if (!allowedPackages.includes('Pallet')) this.pallet = false;
        if (!allowedPackages.includes('Roll')) this.roll = false;
        if (!allowedPackages.includes('Bale')) this.bale = false;
        if (!allowedPackages.includes('Boxed')) this.boxed = false;
        if (!allowedPackages.includes('Supersack')) this.supersack = false;
        if (!allowedPackages.includes('Loose')) this.loose = false;
        if (!allowedPackages.includes('Returnable')) this.returnable = false;

        const allowedAdditives = this.allowedAdditiveValues;

        if (!allowedAdditives.includes('EVA')) this.eva = false;
        if (!allowedAdditives.includes('EVOH')) this.evoh = false;
        if (!allowedAdditives.includes('FR')) this.fr = false;
        if (!allowedAdditives.includes('Nylon')) this.nylon = false;
        if (!allowedAdditives.includes('PE_PP')) this.pepp = false;

    }

    handleGradeChange(event) {
        this.grade = event.detail.value;
        this.normalizeSelections();
    }

    handleSubgradeChange(event) {
        this.subgrade = event.detail.value;
        this.normalizeSelections();
    }

    handleFormChange(event) {
        this.form = event.detail.value;
        this.normalizeSelections();
    }

    handleSubformChange(event) {
        this.subform = event.detail.value;
        this.normalizeSelections();
    }

    handleFillChange(event) {
        this.fill = event.detail.value;
        this.normalizeSelections();
    }

    handleIzodChange(event) {
        this.izod = event.detail.value;
        this.normalizeSelections();
    }

    handleColorChange(event) {
        this.color = event.detail.value;
        this.normalizeSelections();
    }

    handleSubcolorChange(event) {
        this.subcolor = event.detail.value;
        this.normalizeSelections();
    }

    handleMeltRangeChange(event) {
        this.meltRange = event.detail.value;
        this.normalizeSelections();
    }

    handleAccountsMaterialNameChange(event) {
        this.accountsMaterialName = event.target.value;
    }

    handlePriceChange(event) {
        this.price = event.target.value;
    }

    handleVolumeChange(event) {
        this.volume = event.target.value;
    }

    handleImpactChange(event) {
        this.impact = event.target.value;
    }

    handleIvChange(event) {
        this.iv = event.target.value;
    }

    handleDurometerChange(event) {
        this.durometer = event.target.value;
    }

    handleMeltIndexChange(event) {
        this.meltIndex = event.target.value;
    }

    // checkboxes
    handlePackageChange(event) {
        const name = event.target.dataset.name;
        const checked = event.target.checked;
    
        this[name] = checked;
    }

    handleAdditiveChange(event) {
        const name = event.target.dataset.name;
        const checked = event.target.checked;
        this[name] = checked;
    }
    /*
    handleGaylordChange(event){ this.gaylord = event.target.checked; }
    handlePalletChange(event){ this.pallet = event.target.checked; }
    handleRollChange(event){ this.roll = event.target.checked; }
    handleBaleChange(event){ this.bale = event.target.checked; }
    handleBoxedChange(event){ this.boxed = event.target.checked; }
    handleSupersackChange(event){ this.supersack = event.target.checked; }
    handleLooseChange(event){ this.loose = event.target.checked; }
    handleReturnableChange(event){ this.returnable = event.target.checked; }
    */
    async handleSave() {
        //this.errorMessage = '';

        const allInputsValid = [
            ...this.template.querySelectorAll('lightning-combobox'),
            ...this.template.querySelectorAll('lightning-input')
        ].reduce((isValid, inputCmp) => {
            if (typeof inputCmp.reportValidity === 'function') {
                inputCmp.reportValidity();
            }
            if (typeof inputCmp.checkValidity === 'function') {
                return isValid && inputCmp.checkValidity();
            }
            return isValid;
        }, true);

        if (!allInputsValid) {
            return;
        }

        if (!this.hasSelectedPackage) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Missing Required Information',
                    message: 'At least one package must be selected.',
                    variant: 'error'
                })
            );
            return;
        }

        const parsedPrice =
            this.price === '' || this.price === null || this.price === undefined
                ? null
                : parseFloat(this.price);
        
        const parsedVolume =
            this.volume === '' || this.volume === null || this.volume === undefined
                ? null
                : parseInt(this.volume, 10);
        
        const parsedImpact =
            this.impact === '' || this.impact === null || this.impact === undefined
                ? null
                : parseInt(this.impact, 10);

        const parsedIv =
            this.iv === '' || this.iv === null || this.iv === undefined
                ? null
                : parseInt(this.iv, 10);

        const parsedDurometer =
            this.durometer === '' || this.durometer === null || this.durometer === undefined
                ? null
                : parseInt(this.durometer, 10);

        const parsedMeltIndex =
            this.meltIndex === '' || this.meltIndex === null || this.meltIndex === undefined
                ? null
                : parseInt(this.meltIndex, 10);

        if (parsedPrice !== null && Number.isNaN(parsedPrice)) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Invalid Price',
                    message: 'Price must be a valid decimal number.',
                    variant: 'error'
                })
            );
            return;
        }
        
        if (parsedVolume !== null && Number.isNaN(parsedVolume)) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Invalid Volume',
                    message: 'Volume must be a valid whole number.',
                    variant: 'error'
                })
            );
            return;
        }

        if (parsedImpact !== null && Number.isNaN(parsedImpact)) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Invalid Impact',
                    message: 'Impact must be a valid whole number.',
                    variant: 'error'
                })
            );
            return;
        }

        if (parsedIv !== null && Number.isNaN(parsedIv)) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Invalid IV',
                    message: 'IV must be a valid whole number.',
                    variant: 'error'
                })
            );
            return;
        }

        if (parsedDurometer !== null && Number.isNaN(parsedDurometer)) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Invalid Durometer',
                    message: 'Durometer must be a valid whole number.',
                    variant: 'error'
                })
            );
            return;
        }

        if (parsedMeltIndex !== null && Number.isNaN(parsedMeltIndex)) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Invalid Melt Index',
                    message: 'Melt Index must be a valid whole number.',
                    variant: 'error'
                })
            );
            return;
        }
        /*
        if (parsedPrice !== null && Number.isNaN(parsedPrice)) {
            this.errorMessage = 'Price must be a valid decimal number.';
            return;
        }
        
        if (parsedVolume !== null && Number.isNaN(parsedVolume)) {
            this.errorMessage = 'Volume must be a valid whole number.';
            return;
        }
        */
        try {
            const fields = {
                //[ACCOUNT_LOOKUP_FIELD.fieldApiName]: this.accountId,
                [GRADE_FIELD.fieldApiName]: this.grade || null,
                [SUBGRADE_FIELD.fieldApiName]: this.subgrade || null,
                [FORM_FIELD.fieldApiName]: this.form || null,
                [SUBFORM_FIELD.fieldApiName]: this.subform || null,
                [IZOD_FIELD.fieldApiName]: this.izod || null,
                [COLOR_FIELD.fieldApiName]: this.color || null,
                [SUBCOLOR_FIELD.fieldApiName]: this.subcolor || null,
                [FILL_FIELD.fieldApiName]: this.fill || null,
                [MELTRANGE_FIELD.fieldApiName]: this.meltRange || null,
                [ACCOUNTS_MATERIAL_NAME_FIELD.fieldApiName]: this.accountsMaterialName || null,
                [PRICE_FIELD.fieldApiName]: parsedPrice,
                [VOLUME_FIELD.fieldApiName]: parsedVolume,
                [IMPACT_FIELD.fieldApiName]: parsedImpact,
                [IV_FIELD.fieldApiName]: parsedIv,
                [DUROMETER_FIELD.fieldApiName]: parsedDurometer,
                [MELTINDEX_FIELD.fieldApiName]: parsedMeltIndex,
                [GAYLORD_FIELD.fieldApiName]: this.gaylord || false,
                [PALLET_FIELD.fieldApiName]: this.pallet || false,
                [ROLL_FIELD.fieldApiName]: this.roll || false,
                [BALE_FIELD.fieldApiName]: this.bale || false,
                [BOXED_FIELD.fieldApiName]: this.boxed || false,
                [SUPERSACK_FIELD.fieldApiName]: this.supersack || false,
                [LOOSE_FIELD.fieldApiName]: this.loose || false,
                [RETURNABLE_FIELD.fieldApiName]: this.returnable || false,
                [EVA_FIELD.fieldApiName]: this.eva || false,
                [EVOH_FIELD.fieldApiName]: this.evoh || false, 
                [FR_FIELD.fieldApiName]: this.fr || false,
                [NYLON_FIELD.fieldApiName]: this.nylon || false, 
                [PE_PP_FIELD.fieldApiName]: this.pepp || false 
            };

            if (!this.isEditMode) {
                fields[ACCOUNT_LOOKUP_FIELD.fieldApiName] = this.accountId;
            }

            let savedRecordId;

            if (this.isEditMode) {
                fields[ID_FIELD.fieldApiName] = this.recordId;
                await updateRecord({ fields });
                savedRecordId = this.recordId;
            } else {
                const result = await createRecord({
                    apiName: MATERIAL_OBJECT.objectApiName,
                    fields
                });
                savedRecordId = result.id;
            }

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: this.isEditMode
                        ? 'Material updated successfully.'
                        : 'Material created successfully.',
                    variant: 'success'
                })
            );

            this.dispatchEvent(new CloseActionScreenEvent());
            /* do not open the material's detail because we never want people 
            to add or edit via it, they need to use this component
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: savedRecordId,
                    objectApiName: 'Material__c',
                    actionName: 'view'
                }
            });
            */
        } catch (error) {
            //console.error('update/create error', JSON.parse(JSON.stringify(error)));
            //this.handleError(error, 'Error saving Material');
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error saving Material',
                    message: 'There was a problem saving this material.',
                    variant: 'error'
                })
            );
        }
    }

    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    
    /*
    handleError(error, fallbackMessage) {
        let message = fallbackMessage;

        if (error?.body?.message) {
            message = error.body.message;
        } else if (error?.body?.output?.errors?.length) {
            message = error.body.output.errors.map((e) => e.message).join(', ');
        } else if (error?.body?.output?.fieldErrors) {
            const fieldErrors = Object.values(error.body.output.fieldErrors)
                .flat()
                .map((e) => e.message);

            if (fieldErrors.length) {
                message = fieldErrors.join(', ');
            }
        }

        this.errorMessage = message;
        this.isLoading = false;
    }
    */
    handleError(error, fallbackMessage) {
        let message = fallbackMessage;
    
        if (error?.body?.message) {
            message = error.body.message;
        } else if (error?.body?.output?.errors?.length) {
            message = error.body.output.errors.map((e) => e.message).join(', ');
        } else if (error?.body?.output?.fieldErrors) {
            const fieldErrors = Object.values(error.body.output.fieldErrors)
                .flat()
                .map((e) => e.message);
    
            if (fieldErrors.length) {
                message = fieldErrors.join(', ');
            }
        }
    
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error',
                message,
                variant: 'error'
            })
        );
    
        this.isLoading = false;
    }
}
