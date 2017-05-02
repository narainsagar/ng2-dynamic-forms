import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { isBoolean } from "../utils";

export interface DynamicFormOptionConfig<T> {

    disabled?: boolean;
    label?: string;
    value: T;
}

export class DynamicFormOption<T> {

    @serializable() disabled: boolean;
    @serializable() label: string | null;
    @serializable() value: T;

    constructor(config: DynamicFormOptionConfig<T>) {

        this.disabled = isBoolean(config.disabled) ? config.disabled : false;
        this.label = config.label || null;
        this.value = config.value;
    }

    get text() {
        return this.label;
    }

    set text(text: string) {
        this.label = text;
    }

    toJSON() {
        return serialize(this);
    }
}

export interface DynamicOptionControlModelConfig<T> extends DynamicFormValueControlModelConfig<T | T[]> {

    options?: DynamicFormOptionConfig<T>[];
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormValueControlModel<T | T[]> {

    @serializable() options: DynamicFormOption<T>[];

    constructor(config: DynamicOptionControlModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.options = config.options ? config.options.map(optionConfig => new DynamicFormOption<T>(optionConfig)) : [];
    }

    add(optionConfig: DynamicFormOptionConfig<T>): DynamicFormOption<T> {
        return this.insert(this.options.length, optionConfig);
    }

    get(index: number): DynamicFormOption<T> {
        return this.options[index];
    }

    insert(index: number, optionConfig: DynamicFormOptionConfig<T>): DynamicFormOption<T> {

        let option = new DynamicFormOption(optionConfig);

        this.options.splice(index, 0, option);

        return option;
    }

    remove(...indices: number[]): void {
        indices.forEach(index => this.options.splice(index, 1));
    }

    abstract select(...indices: number[]): void;
}