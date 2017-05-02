import {
    DynamicCheckboxModel,
    DynamicCheckboxGroupModel,
    DynamicInputModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
    DynamicSliderModel,
    DynamicSwitchModel,
    DynamicTextAreaModel
} from "@ng2-dynamic-forms/core";

export const MATERIAL_EXAMPLE_MODEL = [

    new DynamicSelectModel<string>(
        {
            id: "materialSelect",
            //label: "Example Select",
            multiple: true,
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                },
                {
                    label: "Option 4",
                    value: "option-4"
                }
            ],
            placeholder: "Select an option"
        }
    ),

    new DynamicInputModel(
        {
            hint: "Just a hint",
            id: "materialInput",
            list: ["Football", "Basketball", "Baseball", "Hockey"],
            maxLength: 51,
            placeholder: "example input",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        }
    ),

    new DynamicCheckboxGroupModel(
        {
            id: "materialCheckboxGroup",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "materialCheckbox1",
                        label: "Checkbox 1"
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "materialCheckbox2",
                        label: "Checkbox 2"
                    }
                )
            ]
        }
    ),

    new DynamicSwitchModel(
        {
            id: "materialSwitch",
            offLabel: "Off",
            onLabel: "On",
            value: false
        }
    ),

    new DynamicRadioGroupModel<string>(
        {
            id: "materialRadioGroup",
            //label: "Example Option",
            options: [
                {
                    label: "Option 1",
                    value: "option-1",
                },
                {
                    disabled: true,
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                },
                {
                    label: "Option 4",
                    value: "option-4"
                }
            ],
            relation: [
                {
                    action: "DISABLE",
                    when: [
                        {
                            id: "materialSwitch",
                            value: true
                        }
                    ]
                }
            ],
            value: "option-3"
        }
    ),

    new DynamicSliderModel(
        {
            id: "materialSlider",
            min: 0,
            max: 10,
            step: 1,
            value: 3,
            vertical: false
        }
    ),

    new DynamicTextAreaModel(
        {
            id: "materialTextArea",
            //label: "Example Textarea",
            rows: 1,
            placeholder: "example Textarea",
            validators: {
                required: null
            },
            errorMessages: {
                required: "Field is required"
            }
        }
    ),

    new DynamicCheckboxModel(
        {
            id: "materialCheckbox",
            label: "I do agree"
        }
    )
];
