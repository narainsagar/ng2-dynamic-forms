import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule, FormGroup } from "@angular/forms";
import { DynamicFormRelationService } from "./dynamic-form-relation.service";
import { DynamicFormService } from "./dynamic-form.service";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";

describe("DynamicFormRelationService test suite", () => {

    let service: DynamicFormRelationService,
        controlGroup: FormGroup,
        model: DynamicTextAreaModel = new DynamicTextAreaModel({id: "testTextArea"}),
        rel1 = {
            action: "DISABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-2"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        },
        rel2 = {
            action: "ENABLE",
            connective: "AND",
            when: [
                {
                    id: "testSelect",
                    value: "option-3"
                },
                {
                    id: "testRadioGroup",
                    value: "option-2",
                }
            ]
        },
        rel3 = {
            action: "DISABLE",
            connective: "AND",
            when: [
                {
                    id: "testSelect",
                    value: "option-2"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        },
        rel4 = {
            action: "ENABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-1"
                },
                {
                    id: "testRadioGroup",
                    value: "option-2",
                }
            ]
        },
        rel5 = {
            action: "DISABLE",
            connective: "OR",
            when: [
                {
                    id: "testSelect",
                    value: "option-1"
                },
                {
                    id: "testRadioGroup",
                    value: "option-3"
                }
            ]
        };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormRelationService, DynamicFormService]
        });
    });

    beforeEach(inject([DynamicFormRelationService, DynamicFormService],
        (relationService: DynamicFormRelationService, formService: DynamicFormService) => {

            service = relationService;
            controlGroup = formService.createFormGroup([

                new DynamicSelectModel({

                    id: "testSelect",
                    options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
                    value: "option-1"
                }),

                new DynamicRadioGroupModel({

                    id: "testRadioGroup",
                    options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
                    value: "option-1"
                }),

                model
            ]);
        }));

    it("should find an activation relation correctly", () => {

        model.relation = [rel1];
        expect(service.findActivationRelation(model.relation)).toBe(rel1);

        model.relation = [rel2];
        expect(service.findActivationRelation(model.relation)).toBe(rel2);
    });

    it("should get all related form controls correctly", () => {

        model.relation = [rel2];

        expect(service.getRelatedFormControls(model, controlGroup).length).toBe(2);
    });

    it("should throw when model depends on itself", () => {

        model.relation = [{
            action: "DISABLE",
            when: [
                {
                    id: "testTextArea",
                    value: "test"
                }
            ]
        }];

        expect(() => service.getRelatedFormControls(model, controlGroup))
            .toThrow(new Error(`FormControl ${model.id} cannot depend on itself`));
    });

    it("should check if form control is to be disabled correctly", () => {

        model.relation = [rel1];
        expect(service.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel2];
        expect(service.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(true);

        model.relation = [rel3];
        expect(service.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel4];
        expect(service.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);

        model.relation = [rel5];
        expect(service.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(true);

        model.relation = [{action: "TEST", when: [{id: "testTextArea", value: "test"}]}];
        expect(service.isFormControlToBeDisabled(model.relation[0], controlGroup)).toBe(false);
    });
});