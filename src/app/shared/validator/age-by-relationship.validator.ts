import { SchemaPathTree, validateTree } from '@angular/forms/signals';
import { Dependent } from '../../feature/family-shield/model/dependent.model';

export function ageByRelationshipToInsured(path: SchemaPathTree<Dependent>) {
  return validateTree(path, (ctx) => {
    const relationship = ctx.valueOf(path.relationship);

    const year = ctx.valueOf(path.birthDate.year);
    const month = ctx.valueOf(path.birthDate.month);
    const day = ctx.valueOf(path.birthDate.day);

    if (!relationship || !year || !month || !day) return null;

    const birth = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    // CHILD OR SIBLING → age 1–22
    if (relationship === 'CHILD' || relationship === 'SIBLING') {
      if (age < 1 || age > 22) {
        return {
          kind: 'invalidAge',
          message: 'Children and siblings must be between 1 and 22 years old.' + ' Age is: ' + age,
          fieldTree: ctx.fieldTree.birthDate.year,
        };
      }
    }

    // SPOUSE OR PARENT → max 64
    if (relationship === 'SPOUSE' || relationship === 'PARENT') {
      if (age > 64) {
        return {
          kind: 'invalidAge',
          message: 'Spouse or parent must be 64 years old or younger.' + ' Age is: ' + age,
          fieldTree: ctx.fieldTree.birthDate.year,
        };
      }
    }

    return null;
  });
}
