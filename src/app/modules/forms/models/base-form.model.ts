import { dateBuilder } from 'src/app/core/functions/dates.function';
import { humanizePipe } from 'src/app/core/functions/humanize.function';

export class BaseForm {
  static requiredErrorMessage(key: string) {
    return { message: `${humanizePipe(key)} is required` };
  }

  static get minPwLength() {
    return 5;
  }
  static get maxPwLength() {
    return 5;
  }

  static get tomorrow() {
    return new Date(dateBuilder()[0], dateBuilder[1], dateBuilder[2] + 1);
  }
}
