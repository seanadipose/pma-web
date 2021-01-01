import { humanizePipe } from 'src/app/core/functions/humanize.function';

export class BaseForm {
  static requiredErrorMessage(key: string) {
    return { message: `${humanizePipe(key)} is required` };
  }
}
