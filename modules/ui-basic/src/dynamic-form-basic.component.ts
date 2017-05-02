import { Component, Input, Output, EventEmitter, QueryList, ContentChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlModel,
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective
} from "@ng2-dynamic-forms/core";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic.component.html"
})

export class DynamicFormBasicComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;

    @Input()set controlGroup(group: FormGroup) {
        this.group = group;
        console.warn("[controlGroup] is deprecated. Use [group] instead.");
    }

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
}