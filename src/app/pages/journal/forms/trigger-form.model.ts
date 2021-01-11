import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFormGroup, maxLength, minLength, prop, required, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Feeling } from 'src/app/core/models/feeling.model';
import { Seeing } from 'src/app/core/models/seeing.model';
import { Touching } from 'src/app/core/models/touching.model';
import { TriggerInfo } from 'src/app/core/models/trigger-info.model';

type Constructor<T = {}> = new (...args: any[]) => T;

class FormDefaults {
  minLength: number;
  maxLength: number;
  maxLengthShort: number;
  fb: RxFormBuilder;
  constructor(fb: RxFormBuilder = null) {
    this.minLength = 5;
    this.maxLength = 100;
    this.maxLengthShort = 100;
    this.fb = fb;
  }
}

class Hearing {
  audible: string;
  noiseLevel: number;
  eyesClosed: string;
}

function HearingFormMixin<T extends Constructor<FormDefaults>>(Base: T) {
  const fd = new FormDefaults(Base.prototype);

  class HearingFormMixin extends Base {
    @prop()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    audible: string;

    @required()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    noiseLevel: number;

    @prop()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    eyesClosed: string;
    fg: IFormGroup<Hearing>;
    constructor(...any) {
      super(...any);
      this.fg = this.fb.formGroup(this) as IFormGroup<Hearing>;
    }
  }
  class FeelingFormMixin extends Base implements Feeling {
    fg: IFormGroup<Feeling>;
    @prop()
    @minLength({
      value: 1,
    })
    @maxLength({
      value: 5,
    })
    emotionsList: string[];
    @required()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    mood: number;
    @prop()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    body: string;
    constructor(...any) {
      super(...any);
      this.fg = this.fb.formGroup(this) as IFormGroup<Feeling>;
    }
  }

  class SeeingFormMixin extends Base implements Seeing {
    fg: IFormGroup<Seeing>;
    @required()
    colors: string;
    @required()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    movement: string;
    @prop()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    window: string;
    constructor(...any) {
      super(...any);
      this.fg = this.fb.formGroup(this) as IFormGroup<Seeing>;
    }
  }

  class TriggerInfoFormMixin extends Base implements TriggerInfo {
    fg: IFormGroup<TriggerInfo>;
    @required()
    @minLength({
      value: fd.maxLength,
    })
    title: string;
    @required()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    description: string;
    @prop()
    @minLength({
      value: fd.minLength,
    })
    @maxLength({
      value: fd.maxLength,
    })
    geoloc: [number, number];
    constructor(...any) {
      super(...any);
      this.fg = this.fb.formGroup(this) as IFormGroup<TriggerInfo>;
    }
  }

  class TouchingFormMixin extends Base implements Touching {
    fg: IFormGroup<Touching>;
    @required()
    @minLength({
      value: fd.maxLengthShort,
    })
    connectedTo: string;
    @required()
    @minLength({
      value: fd.maxLength,
    })
    @maxLength({
      value: fd.maxLengthShort,
    })
    immediateArea: string;

    constructor(...any) {
      super(...any);
      this.fg = this.fb.formGroup(this) as IFormGroup<Touching>;
    }
  }

  return class TriggerForms extends Base {
    getForms() {
      const { fg: touchingForm } = new TouchingFormMixin(this.fb);
      const { fg: hearingForm } = new HearingFormMixin(this.fb);
      const { fg: seeingForm } = new SeeingFormMixin(this.fb);
      const { fg: triggerInfoForm } = new TriggerInfoFormMixin(this.fb);
      const { fg: feelingForm } = new FeelingFormMixin(this.fb);

      return {
        touchingForm,
        hearingForm,
        seeingForm,
        triggerInfoForm,
        feelingForm,
      };
    }
    constructor(...any) {
      super(any);
    }
  };
}

export class forms extends HearingFormMixin(FormDefaults) {
  constructor(fb: RxFormBuilder) {
    super(fb);
  }
}
