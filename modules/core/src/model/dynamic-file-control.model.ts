import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { isBoolean } from "../utils";

export interface DynamicFileControlModelConfig extends DynamicFormValueControlModelConfig<File | File[]> {

    multiple?: boolean;
}

export abstract class DynamicFileControlModel extends DynamicFormValueControlModel<File | File[]> {

    @serializable() multiple: boolean;

    constructor(config: DynamicFileControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.multiple = isBoolean(config.multiple) ? config.multiple : false;
    }
}