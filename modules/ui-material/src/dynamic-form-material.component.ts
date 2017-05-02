import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    MdAutocomplete,
    MdCheckbox,
    MdInputContainer,
    MdRadioGroup,
    MdSelect,
    MdSlider,
    MdSlideToggle
} from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng2-dynamic-forms/core";

export const enum MdFormControlType {

    Array = 1,
    Checkbox = 2,
    Group = 3,
    Input = 4,
    RadioGroup = 5,
    Select = 6,
    Slider = 7,
    SlideToggle = 8,
    TextArea = 9
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material.component.html"
})

export class DynamicFormMaterialComponent extends DynamicFormControlComponent {

    private _showCharacterCount: boolean = false;

    @Input() bindId: boolean = true;

    @Input()set controlGroup(group: FormGroup) {
        this.group = group;
        console.warn("[controlGroup] is deprecated. Use [group] instead.");
    }

    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as DynamicInputModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChild(MdAutocomplete) mdAutocomplete: MdAutocomplete | null;
    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox | null;
    @ViewChild(MdInputContainer) mdInputContainer: MdInputContainer | null;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup | null;
    @ViewChild(MdSelect) mdSelect: MdSelect | null;
    @ViewChild(MdSlider) mdSlider: MdSlider | null;
    @ViewChild(MdSlideToggle) mdSlideToggle: MdSlideToggle | null;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    get characterCount(): number | null {
        return this.mdInputContainer ? this.mdInputContainer._mdInputChild.value.length : null;
    }

    protected getFormControlType(): MdFormControlType | null {

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return MdFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return MdFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return MdFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return MdFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return MdFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return MdFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return MdFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return MdFormControlType.SlideToggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return MdFormControlType.TextArea;

            default:
                return null;
        }
    }
}