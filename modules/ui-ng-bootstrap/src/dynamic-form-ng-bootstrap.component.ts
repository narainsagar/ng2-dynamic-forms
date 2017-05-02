import { Component, Input, Output, EventEmitter, QueryList, ContentChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicDatePickerModel
} from "@ng2-dynamic-forms/core";

export const enum NGBootstrapFormControlType {

    Array = 1,
    Calendar = 2,
    Checkbox = 3,
    DatePicker = 4,
    Group = 5,
    Input = 6,
    RadioGroup = 7,
    Select = 8,
    TextArea = 9,
    TimePicker = 10
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-ng-bootstrap-control",
    templateUrl: "./dynamic-form-ng-bootstrap.component.html"
})

export class DynamicFormNGBootstrapComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;

    @Input()set controlGroup(group: FormGroup) {
        this.group = group;
        console.warn("[controlGroup] is deprecated. Use [group] instead.");
    }

    @Input() asBootstrapFormGroup: boolean = true;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    protected getFormControlType(): NGBootstrapFormControlType | null {

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return NGBootstrapFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return NGBootstrapFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return NGBootstrapFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                let model = this.model as DynamicDatePickerModel;

                return model.inline ? NGBootstrapFormControlType.Calendar : NGBootstrapFormControlType.DatePicker;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return NGBootstrapFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return NGBootstrapFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return NGBootstrapFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return NGBootstrapFormControlType.TextArea;

            case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                return NGBootstrapFormControlType.TimePicker;

            default:
                return null;
        }
    }
}